import type { IDivisibilityModuloEvaluationFactoryBean } from "../contracts/IDivisibilityModuloEvaluationFactoryBean.js";

export interface IDivisibilityModuloEvaluationFactoryBeanRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  registerFactoryBean(divisor: number, factoryBean: IDivisibilityModuloEvaluationFactoryBean): void;
  resolveFactoryBeanName(divisor: number): string | null;
  getFactoryBeanInstance(factoryBeanName: string): IDivisibilityModuloEvaluationFactoryBean | null;
  getRegisteredDivisors(): readonly number[];
  isDivisorRegistered(divisor: number): boolean;
  getFactoryBeanCount(): number;
}
