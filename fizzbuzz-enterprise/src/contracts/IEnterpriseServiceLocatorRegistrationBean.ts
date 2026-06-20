import type { IModuloEvaluationStrategyFactoryBeanRegistry } from "./IModuloEvaluationStrategyFactoryBeanRegistry.js";

export interface IEnterpriseServiceLocatorRegistrationBean {
  registerFactoryBeans(registry: IModuloEvaluationStrategyFactoryBeanRegistry): void;
  getRegistrationBeanName(): string;
  getRegistrationBeanVersion(): string;
  getBeanDefinitionSource(): string;
}
