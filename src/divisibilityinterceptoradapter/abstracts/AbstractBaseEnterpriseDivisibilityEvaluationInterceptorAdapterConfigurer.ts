import type { IEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapter } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapter.js";

export abstract class AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer
  implements IEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer
{
  protected abstract readonly configurerName: string;
  protected abstract readonly configurerVersion: string;
  protected abstract readonly configurationProfile: string;

  abstract configureAdapter(
    adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
    configurationProfile: string,
  ): void;

  abstract validateAdapterConfiguration(
    adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
  ): boolean;

  getConfigurerName(): string {
    return this.configurerName;
  }

  getConfigurerVersion(): string {
    return this.configurerVersion;
  }

  getConfigurationProfile(): string {
    return this.configurationProfile;
  }

  abstract getConfigurationDescriptor(): string;
}
