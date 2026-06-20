export interface IModuloEvaluationStrategyFactoryBeanRegistry {
  registerFactoryBean(divisor: number, factoryBeanName: string): void;
  resolveFactoryBeanName(divisor: number): string | null;
  getRegisteredDivisors(): readonly number[];
  isDivisorRegistered(divisor: number): boolean;
  getRegistryName(): string;
  getRegistryVersion(): string;
}
