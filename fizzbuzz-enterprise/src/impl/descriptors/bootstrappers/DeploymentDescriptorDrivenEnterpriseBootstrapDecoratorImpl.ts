import { AbstractBaseEnterpriseDeploymentAwareBootstrapDecorator } from "../../../abstracts/AbstractBaseEnterpriseDeploymentAwareBootstrapDecorator.js";
import type { IEnterpriseApplicationBootstrapInitializer } from "../../../contracts/IEnterpriseApplicationBootstrapInitializer.js";
import type { IEnterpriseDeploymentDescriptorXmlParser } from "../../../contracts/IEnterpriseDeploymentDescriptorXmlParser.js";
import type { IEjbJarDescriptorXmlConfigurer } from "../../../contracts/IEjbJarDescriptorXmlConfigurer.js";
import type { IStrategyDefinitionDescriptorXmlConfigurer } from "../../../contracts/IStrategyDefinitionDescriptorXmlConfigurer.js";
import type { IEnterpriseDeploymentPlan } from "../../../contracts/IEnterpriseDeploymentPlan.js";
import { DeploymentDescriptorXmlDomParserImpl } from "../parsers/DeploymentDescriptorXmlDomParserImpl.js";
import { EjbJarDeploymentDescriptorImpl } from "../../entities/EjbJarDeploymentDescriptorImpl.js";
import { EjbJarDescriptorXmlConfigurerImpl } from "../configurers/EjbJarDescriptorXmlConfigurerImpl.js";
import { StrategyDefinitionDescriptorXmlConfigurerImpl } from "../configurers/StrategyDefinitionDescriptorXmlConfigurerImpl.js";
import { DeploymentDescriptorJndiContextBootstrapperImpl } from "./DeploymentDescriptorJndiContextBootstrapperImpl.js";

export class DeploymentDescriptorDrivenEnterpriseBootstrapDecoratorImpl
  extends AbstractBaseEnterpriseDeploymentAwareBootstrapDecorator
{
  private static readonly DECORATOR_NAME = "DeploymentDescriptorDrivenEnterpriseBootstrapDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-DESCRIPTOR-DRIVEN-BOOTSTRAP-DECORATOR";

  private readonly xmlParser: IEnterpriseDeploymentDescriptorXmlParser;
  private readonly ejbJarConfigurer: IEjbJarDescriptorXmlConfigurer;
  private readonly strategyConfigurer: IStrategyDefinitionDescriptorXmlConfigurer;
  private readonly jndiBootstrapper: DeploymentDescriptorJndiContextBootstrapperImpl;
  private entityBeanRegistrationCount: number = 0;
  private jndiBindingCount: number = 0;

  constructor(
    decoratedInitializer: IEnterpriseApplicationBootstrapInitializer,
    xmlParser?: IEnterpriseDeploymentDescriptorXmlParser,
    ejbJarConfigurer?: IEjbJarDescriptorXmlConfigurer,
    strategyConfigurer?: IStrategyDefinitionDescriptorXmlConfigurer,
    jndiBootstrapper?: DeploymentDescriptorJndiContextBootstrapperImpl,
  ) {
    super(
      DeploymentDescriptorDrivenEnterpriseBootstrapDecoratorImpl.DECORATOR_NAME,
      DeploymentDescriptorDrivenEnterpriseBootstrapDecoratorImpl.DECORATOR_VERSION,
      decoratedInitializer,
    );

    this.xmlParser = xmlParser ?? new DeploymentDescriptorXmlDomParserImpl();
    const ejbDeploymentDescriptor = new EjbJarDeploymentDescriptorImpl();
    this.ejbJarConfigurer = ejbJarConfigurer ?? new EjbJarDescriptorXmlConfigurerImpl(ejbDeploymentDescriptor);
    this.strategyConfigurer = strategyConfigurer ?? new StrategyDefinitionDescriptorXmlConfigurerImpl();
    this.jndiBootstrapper = jndiBootstrapper ?? new DeploymentDescriptorJndiContextBootstrapperImpl(ejbDeploymentDescriptor);
  }

  applyDeploymentConfiguration(): boolean {
    const parseStartTime = performance.now();
    console.debug(
      `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] Commencing deployment descriptor-driven enterprise configuration...`,
    );

    const descriptorPaths = [
      "META-INF/ejb-jar.xml",
      "META-INF/application.xml",
      "META-INF/persistence.xml",
      "META-INF/beans.xml",
      "META-INF/fizzbuzz-modulo-strategy-definitions.xml",
      "META-INF/fizzbuzz-output-normalization-definitions.xml",
    ];

    let parsedCount = 0;
    for (const descriptorPath of descriptorPaths) {
      const parsed = this.xmlParser.parseDescriptorFile(descriptorPath);
      if (parsed !== null) {
        parsedCount++;
      }
    }

    this.deploymentPlan = this.xmlParser.produceDeploymentPlan();

    const planDescriptor = this.deploymentPlan.getEjbJarDescriptor();
    if (planDescriptor !== null) {
      this.ejbJarConfigurer.configureFromParsedDescriptor(planDescriptor);
      this.entityBeanRegistrationCount = this.ejbJarConfigurer.getConfiguredEntityBeanNames().length;
    }

    const strategyDescriptor = this.deploymentPlan.getStrategyDefinitionDescriptor();
    if (strategyDescriptor !== null) {
      this.strategyConfigurer.configureFromParsedDescriptor(strategyDescriptor);
    }

    this.jndiBootstrapper.bootstrapFromDeploymentPlan(this.deploymentPlan);
    this.jndiBindingCount = this.jndiBootstrapper.getRegisteredJndiBindingCount();

    const elapsedMs = performance.now() - parseStartTime;
    console.debug(
      `[${this.getDecoratorName()}] Deployment descriptor configuration complete. ` +
      `Parsed ${parsedCount} descriptor(s). ` +
      `${this.entityBeanRegistrationCount} entity bean(s) configured. ` +
      `${this.jndiBindingCount} JNDI binding(s) registered. ` +
      `Elapsed: ${elapsedMs.toFixed(2)}ms.`,
    );

    return true;
  }

  getEntityBeanRegistrationCount(): number {
    return this.entityBeanRegistrationCount;
  }

  getRegisteredJndiBindingCount(): number {
    return this.jndiBindingCount;
  }

  getXmlParser(): IEnterpriseDeploymentDescriptorXmlParser {
    return this.xmlParser;
  }

  getEjbJarConfigurer(): IEjbJarDescriptorXmlConfigurer {
    return this.ejbJarConfigurer;
  }

  getStrategyConfigurer(): IStrategyDefinitionDescriptorXmlConfigurer {
    return this.strategyConfigurer;
  }

  getJndiBootstrapper(): DeploymentDescriptorJndiContextBootstrapperImpl {
    return this.jndiBootstrapper;
  }
}
