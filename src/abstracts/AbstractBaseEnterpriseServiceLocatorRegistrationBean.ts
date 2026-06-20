import type { IEnterpriseServiceLocatorRegistrationBean } from "../contracts/IEnterpriseServiceLocatorRegistrationBean.js";
import type { IModuloEvaluationStrategyFactoryBeanRegistry } from "../contracts/IModuloEvaluationStrategyFactoryBeanRegistry.js";

export abstract class AbstractBaseEnterpriseServiceLocatorRegistrationBean
  implements IEnterpriseServiceLocatorRegistrationBean
{
  abstract registerFactoryBeans(registry: IModuloEvaluationStrategyFactoryBeanRegistry): void;
  abstract getRegistrationBeanName(): string;
  abstract getRegistrationBeanVersion(): string;
  abstract getBeanDefinitionSource(): string;

  protected validateDivisor(divisor: number): void {
    if (!Number.isInteger(divisor) || divisor <= 0) {
      throw new Error(
        `[${this.getRegistrationBeanName()}] Invalid divisor: ${divisor}. Must be a positive integer.`,
      );
    }
  }
}
