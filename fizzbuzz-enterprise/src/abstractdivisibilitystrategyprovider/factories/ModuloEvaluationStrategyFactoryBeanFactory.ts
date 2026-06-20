import type { IModuloEvaluationStrategyFactoryBean } from "../contracts/IModuloEvaluationStrategyFactoryBean.js";
import { ModuloEvaluationStrategyFactoryBeanImpl } from "../impl/ModuloEvaluationStrategyFactoryBeanImpl.js";

export class ModuloEvaluationStrategyFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "ModuloEvaluationStrategyFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MESFB-FBF";

  private static factoryBeanRegistry: Map<number, IModuloEvaluationStrategyFactoryBean> = new Map();
  private static factoryInitialized = false;

  static createFactoryBeanForDivisor(
    divisor: number,
    cacheEnabled: boolean = true,
  ): IModuloEvaluationStrategyFactoryBean {
    const existing = ModuloEvaluationStrategyFactoryBeanFactory.factoryBeanRegistry.get(divisor);
    if (existing !== undefined) {
      return existing;
    }
    const factoryBean = new ModuloEvaluationStrategyFactoryBeanImpl(divisor, cacheEnabled);
    ModuloEvaluationStrategyFactoryBeanFactory.factoryBeanRegistry.set(divisor, factoryBean);
    ModuloEvaluationStrategyFactoryBeanFactory.factoryInitialized = true;
    return factoryBean;
  }

  static getFactoryBeanForDivisor(
    divisor: number,
  ): IModuloEvaluationStrategyFactoryBean | undefined {
    return ModuloEvaluationStrategyFactoryBeanFactory.factoryBeanRegistry.get(divisor);
  }

  static getRegisteredDivisors(): readonly number[] {
    return Array.from(ModuloEvaluationStrategyFactoryBeanFactory.factoryBeanRegistry.keys());
  }

  static getFactoryBeanCount(): number {
    return ModuloEvaluationStrategyFactoryBeanFactory.factoryBeanRegistry.size;
  }

  static isFactoryInitialized(): boolean {
    return ModuloEvaluationStrategyFactoryBeanFactory.factoryInitialized;
  }

  static resetFactory(): void {
    ModuloEvaluationStrategyFactoryBeanFactory.factoryBeanRegistry.clear();
    ModuloEvaluationStrategyFactoryBeanFactory.factoryInitialized = false;
  }

  static getFactoryBeanName(): string {
    return ModuloEvaluationStrategyFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ModuloEvaluationStrategyFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
