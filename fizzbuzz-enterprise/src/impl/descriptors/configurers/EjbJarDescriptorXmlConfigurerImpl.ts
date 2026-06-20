import type { IEjbJarDescriptorXmlConfigurer } from "../../../contracts/IEjbJarDescriptorXmlConfigurer.js";
import type { IXmlParsedElement } from "../../../contracts/IXmlParsedElement.js";
import type { IEjbDeploymentDescriptor } from "../../../contracts/IEjbDeploymentDescriptor.js";
import type { IEjbEntityBeanDescriptor, IEjbFinderMethodDescriptor } from "../../../contracts/IEjbDeploymentDescriptor.js";
import { EjbJarDeploymentDescriptorImpl } from "../../entities/EjbJarDeploymentDescriptorImpl.js";

export class EjbJarDescriptorXmlConfigurerImpl implements IEjbJarDescriptorXmlConfigurer {
  private static readonly CONFIGURER_NAME = "EjbJarDescriptorXmlConfigurer";
  private static readonly CONFIGURER_VERSION = "1.0.0-EJB-JAR-CONFIGURER";

  private readonly deploymentDescriptor: IEjbDeploymentDescriptor;
  private configured: boolean = false;
  private configuredEntityBeans: string[] = [];

  constructor(deploymentDescriptor: IEjbDeploymentDescriptor) {
    this.deploymentDescriptor = deploymentDescriptor;
  }

  getConfigurerName(): string {
    return EjbJarDescriptorXmlConfigurerImpl.CONFIGURER_NAME;
  }

  getConfigurerVersion(): string {
    return EjbJarDescriptorXmlConfigurerImpl.CONFIGURER_VERSION;
  }

  configureFromParsedDescriptor(descriptor: IXmlParsedElement): boolean {
    if (this.configured) return true;

    const ejbJar = descriptor.tagName === "ejb-jar" ? descriptor : descriptor.findChild("ejb-jar");
    if (!ejbJar) return false;

    const enterpriseBeans = ejbJar.findChild("enterprise-beans");
    if (!enterpriseBeans) return false;

    const entityBeans = enterpriseBeans.findChildren("entity");
    for (const entityBean of entityBeans) {
      const beanName = entityBean.findChild("ejb-name")?.textContent ?? "";
      if (!beanName) continue;

      const beanDescriptor: IEjbEntityBeanDescriptor = {
        beanName,
        beanClass: entityBean.findChild("ejb-class")?.textContent ?? "",
        homeInterface: entityBean.findChild("home")?.textContent ?? "",
        remoteInterface: entityBean.findChild("remote")?.textContent ?? "",
        localHomeInterface: entityBean.findChild("local-home")?.textContent ?? "",
        localInterface: entityBean.findChild("local")?.textContent ?? "",
        persistenceType: entityBean.findChild("persistence-type")?.textContent ?? "Container",
        primaryKeyClass: entityBean.findChild("prim-key-class")?.textContent ?? "",
        reentrant: (entityBean.findChild("reentrant")?.textContent ?? "False") === "True",
        abstractSchemaName: entityBean.findChild("abstract-schema-name")?.textContent ?? "",
        cmpFields: entityBean.findChildren("cmp-field").map((f) => f.findChild("field-name")?.textContent ?? "").filter(Boolean),
      };

      if (this.deploymentDescriptor instanceof EjbJarDeploymentDescriptorImpl) {
        this.deploymentDescriptor.registerEntityBeanDescriptor(beanDescriptor);
      }

      const queries = entityBean.findChildren("query");
      for (const query of queries) {
        const queryMethod = query.findChild("query-method");
        if (!queryMethod) continue;
        const methodName = queryMethod.findChild("method-name")?.textContent ?? "";
        const ejbql = query.findChild("ejb-ql")?.textContent ?? "";
        if (methodName && ejbql && this.deploymentDescriptor instanceof EjbJarDeploymentDescriptorImpl) {
          const paramElements = queryMethod.findChildren("method-params").flatMap((p) => p.findChildren("method-param"));
          const finderDesc: IEjbFinderMethodDescriptor = {
            methodName,
            query: ejbql,
            returnType: "java.util.Collection",
            params: paramElements.map((p) => p.textContent),
          };
          this.deploymentDescriptor.registerFinderMethodDescriptor(beanName, finderDesc);
        }
      }

      this.configuredEntityBeans.push(beanName);
    }

    const assemblyDescriptor = ejbJar.findChild("assembly-descriptor");
    if (assemblyDescriptor) {
      const containerTransactions = assemblyDescriptor.findChildren("container-transaction");
      for (const ct of containerTransactions) {
        const method = ct.findChild("method");
        const transAttribute = ct.findChild("trans-attribute");
        if (method && transAttribute && this.deploymentDescriptor instanceof EjbJarDeploymentDescriptorImpl) {
          const ejbName = method.findChild("ejb-name")?.textContent ?? "";
          const methodName = method.findChild("method-name")?.textContent ?? "*";
          this.deploymentDescriptor.setTransactionAttribute(ejbName, methodName, transAttribute.textContent);
        }
      }
    }

    this.configured = true;
    console.debug(
      `[${EjbJarDescriptorXmlConfigurerImpl.CONFIGURER_NAME}] Configured ${this.configuredEntityBeans.length} entity bean(s) from ejb-jar.xml: ${this.configuredEntityBeans.join(", ")}`,
    );
    return true;
  }

  getConfiguredEntityBeanNames(): readonly string[] {
    return [...this.configuredEntityBeans];
  }

  getConfiguredFinderMethods(beanName: string): readonly string[] {
    return this.deploymentDescriptor.getFinderMethods(beanName).map((f) => f.methodName);
  }

  getConfiguredCmpFields(beanName: string): readonly string[] {
    return [...this.deploymentDescriptor.getContainerManagedFields(beanName)];
  }
}
