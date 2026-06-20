import type { IModuloEvaluationStrategyFactoryBeanRegistry } from "../contracts/IModuloEvaluationStrategyFactoryBeanRegistry.js";

export abstract class AbstractBaseModuloEvaluationStrategyFactoryBeanRegistry
  implements IModuloEvaluationStrategyFactoryBeanRegistry
{
  protected readonly beanRegistry: Map<number, string> = new Map();

  abstract registerFactoryBean(divisor: number, factoryBeanName: string): void;
  abstract getRegistryName(): string;
  abstract getRegistryVersion(): string;

  resolveFactoryBeanName(divisor: number): string | null {
    return this.beanRegistry.get(divisor) ?? null;
  }

  getRegisteredDivisors(): readonly number[] {
    return Array.from(this.beanRegistry.keys());
  }

  isDivisorRegistered(divisor: number): boolean {
    return this.beanRegistry.has(divisor);
  }

  protected assertDivisorNotRegistered(divisor: number): void {
    if (this.beanRegistry.has(divisor)) {
      console.warn(
        `[${this.getRegistryName()}] Overwriting existing factory bean registration for divisor=${divisor}`,
      );
    }
  }
}
