import type { IEnterpriseDeploymentPlan } from "../../../contracts/IEnterpriseDeploymentPlan.js";
import type { IEjbDeploymentDescriptor } from "../../../contracts/IEjbDeploymentDescriptor.js";

export class DeploymentDescriptorJndiContextBootstrapperImpl {
  private static readonly BOOTSTRAPPER_NAME = "DeploymentDescriptorJndiContextBootstrapper";
  private static readonly BOOTSTRAPPER_VERSION = "1.0.0-JNDI-BOOTSTRAPPER";

  private readonly ejbDeploymentDescriptor: IEjbDeploymentDescriptor;
  private readonly jndiBindings: Map<string, string> = new Map();
  private bootstrapped: boolean = false;

  constructor(ejbDeploymentDescriptor: IEjbDeploymentDescriptor) {
    this.ejbDeploymentDescriptor = ejbDeploymentDescriptor;
  }

  getBootstrapperName(): string {
    return DeploymentDescriptorJndiContextBootstrapperImpl.BOOTSTRAPPER_NAME;
  }

  getBootstrapperVersion(): string {
    return DeploymentDescriptorJndiContextBootstrapperImpl.BOOTSTRAPPER_VERSION;
  }

  bootstrapFromDeploymentPlan(plan: IEnterpriseDeploymentPlan): boolean {
    if (this.bootstrapped) return true;

    const appDescriptor = plan.getApplicationDescriptor();
    if (appDescriptor) {
      this.registerSecurityRoles(appDescriptor);
    }

    const ejbJarDescriptor = plan.getEjbJarDescriptor();
    if (ejbJarDescriptor) {
      this.registerEjbJndiBindings(ejbJarDescriptor);
    }

    const persistenceDescriptor = plan.getPersistenceDescriptor();
    if (persistenceDescriptor) {
      this.registerPersistenceBindings(persistenceDescriptor);
    }

    this.bootstrapped = true;
    console.debug(
      `[${DeploymentDescriptorJndiContextBootstrapperImpl.BOOTSTRAPPER_NAME}] JNDI context bootstrapped with ${this.jndiBindings.size} binding(s)`,
    );
    return true;
  }

  getJndiBinding(jndiName: string): string | null {
    return this.jndiBindings.get(jndiName) ?? null;
  }

  getRegisteredJndiBindingCount(): number {
    return this.jndiBindings.size;
  }

  getJndiBindingNames(): readonly string[] {
    return Array.from(this.jndiBindings.keys());
  }

  private registerSecurityRoles(appDescriptor: import("../../../contracts/IXmlParsedElement.js").IXmlParsedElement): void {
    const securityRoles = appDescriptor.findChildren("security-role");
    for (const role of securityRoles) {
      const roleName = role.findChild("role-name")?.textContent ?? "";
      if (roleName) {
        const jndiKey = `java:comp/env/fizzbuzz/security/${roleName}`;
        this.jndiBindings.set(jndiKey, `SecurityRole:${roleName}`);
        console.debug(`[${DeploymentDescriptorJndiContextBootstrapperImpl.BOOTSTRAPPER_NAME}] Registered security role JNDI binding: ${jndiKey}`);
      }
    }
  }

  private registerEjbJndiBindings(ejbJarDescriptor: import("../../../contracts/IXmlParsedElement.js").IXmlParsedElement): void {
    const ejbJar = ejbJarDescriptor.tagName === "ejb-jar" ? ejbJarDescriptor : ejbJarDescriptor.findChild("ejb-jar");
    if (!ejbJar) return;

    const enterpriseBeans = ejbJar.findChild("enterprise-beans");
    if (!enterpriseBeans) return;

    for (const beanType of ["entity", "session", "message-driven"]) {
      const beans = enterpriseBeans.findChildren(beanType);
      for (const bean of beans) {
        const ejbName = bean.findChild("ejb-name")?.textContent ?? "";
        const homeInterface = bean.findChild("home")?.textContent ?? "";
        const remoteInterface = bean.findChild("remote")?.textContent ?? "";

        if (ejbName) {
          const homeJndi = `java:comp/env/fizzbuzz/${ejbName}Home`;
          const remoteJndi = `java:comp/env/fizzbuzz/${ejbName}Remote`;
          const localJndi = `java:comp/env/fizzbuzz/${ejbName}Local`;

          if (homeInterface) {
            this.jndiBindings.set(homeJndi, homeInterface);
          }
          if (remoteInterface) {
            this.jndiBindings.set(remoteJndi, remoteInterface);
          }
          this.jndiBindings.set(localJndi, `${ejbName}EJBLocalObject`);

          console.debug(
            `[${DeploymentDescriptorJndiContextBootstrapperImpl.BOOTSTRAPPER_NAME}] Registered EJB JNDI bindings for: ${ejbName}`,
          );
        }
      }
    }
  }

  private registerPersistenceBindings(persistenceDescriptor: import("../../../contracts/IXmlParsedElement.js").IXmlParsedElement): void {
    const persistence = persistenceDescriptor.tagName === "persistence"
      ? persistenceDescriptor
      : persistenceDescriptor.findChild("persistence");

    if (!persistence) return;

    const units = persistence.findChildren("persistence-unit");
    for (const unit of units) {
      const unitName = unit.getAttribute("name") ?? "";
      const jtaDataSource = unit.findChild("jta-data-source")?.textContent ?? "";

      if (unitName) {
        const puJndi = `java:comp/env/fizzbuzz/persistence/${unitName}`;
        this.jndiBindings.set(puJndi, `PersistenceUnit:${unitName}`);
      }
      if (jtaDataSource) {
        this.jndiBindings.set(jtaDataSource, `DataSource:${unitName}`);
      }
    }
  }
}
