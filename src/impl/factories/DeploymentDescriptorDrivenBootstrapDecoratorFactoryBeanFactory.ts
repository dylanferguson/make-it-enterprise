import type { IEnterpriseDeploymentDescriptorXmlParser } from "../../contracts/IEnterpriseDeploymentDescriptorXmlParser.js";
import type { IEnterpriseDeploymentAwareBootstrapDecorator } from "../../contracts/IEnterpriseDeploymentAwareBootstrapDecorator.js";
import type { IEjbJarDescriptorXmlConfigurer } from "../../contracts/IEjbJarDescriptorXmlConfigurer.js";
import type { IStrategyDefinitionDescriptorXmlConfigurer } from "../../contracts/IStrategyDefinitionDescriptorXmlConfigurer.js";
import type { IEnterpriseApplicationBootstrapInitializer } from "../../contracts/IEnterpriseApplicationBootstrapInitializer.js";
import { DeploymentDescriptorDrivenEnterpriseBootstrapDecoratorImpl } from "../descriptors/bootstrappers/DeploymentDescriptorDrivenEnterpriseBootstrapDecoratorImpl.js";
import { DeploymentDescriptorXmlDomParserImpl } from "../descriptors/parsers/DeploymentDescriptorXmlDomParserImpl.js";
import { EjbJarDeploymentDescriptorImpl } from "../entities/EjbJarDeploymentDescriptorImpl.js";
import { EjbJarDescriptorXmlConfigurerImpl } from "../descriptors/configurers/EjbJarDescriptorXmlConfigurerImpl.js";
import { StrategyDefinitionDescriptorXmlConfigurerImpl } from "../descriptors/configurers/StrategyDefinitionDescriptorXmlConfigurerImpl.js";
import { DeploymentDescriptorJndiContextBootstrapperImpl } from "../descriptors/bootstrappers/DeploymentDescriptorJndiContextBootstrapperImpl.js";

export class DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DEPLOYMENT-DESCRIPTOR-FACTORY-BEAN-FACTORY";

  private static decoratorInstance: IEnterpriseDeploymentAwareBootstrapDecorator | null = null;
  private static xmlParserInstance: IEnterpriseDeploymentDescriptorXmlParser | null = null;

  static createDecorator(
    bootstrapInitializer: IEnterpriseApplicationBootstrapInitializer,
  ): IEnterpriseDeploymentAwareBootstrapDecorator {
    if (DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.decoratorInstance === null) {
      const xmlParser = new DeploymentDescriptorXmlDomParserImpl();
      DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.xmlParserInstance = xmlParser;

      const ejbDeploymentDescriptor = new EjbJarDeploymentDescriptorImpl();
      const ejbJarConfigurer = new EjbJarDescriptorXmlConfigurerImpl(ejbDeploymentDescriptor);
      const strategyConfigurer = new StrategyDefinitionDescriptorXmlConfigurerImpl();
      const jndiBootstrapper = new DeploymentDescriptorJndiContextBootstrapperImpl(ejbDeploymentDescriptor);

      const decorator = new DeploymentDescriptorDrivenEnterpriseBootstrapDecoratorImpl(
        bootstrapInitializer,
        xmlParser,
        ejbJarConfigurer,
        strategyConfigurer,
        jndiBootstrapper,
      );

      DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.decoratorInstance = decorator;
    }
    return DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.decoratorInstance;
  }

  static getDecorator(): IEnterpriseDeploymentAwareBootstrapDecorator | null {
    return DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.decoratorInstance;
  }

  static getXmlParser(): IEnterpriseDeploymentDescriptorXmlParser | null {
    return DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.xmlParserInstance;
  }

  static resetDecorator(): void {
    DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.decoratorInstance = null;
    DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.xmlParserInstance = null;
  }

  static getFactoryBeanName(): string {
    return DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
