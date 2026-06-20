import type { IEnterpriseDivisibilityEvaluationInterceptorAdapter } from "./IEnterpriseDivisibilityEvaluationInterceptorAdapter.js";

export interface IEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer {
  configureAdapter(
    adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
    configurationProfile: string,
  ): void;
  validateAdapterConfiguration(
    adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
  ): boolean;
  getConfigurerName(): string;
  getConfigurerVersion(): string;
  getConfigurationProfile(): string;
  getConfigurationDescriptor(): string;
}
