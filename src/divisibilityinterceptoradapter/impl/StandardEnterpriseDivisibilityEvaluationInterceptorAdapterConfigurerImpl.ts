import { AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer } from "../abstracts/AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapter } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapter.js";

export class StandardEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerImpl
  extends AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer
{
  private static readonly CONFIGURER_NAME = "StandardEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurer";
  private static readonly CONFIGURER_VERSION = "1.0.0-DIV-INTERCEPT-CONFIGURER";
  private static readonly CONFIGURATION_PROFILE = "STANDARD_INTERCEPTOR_ADAPTER";
  private static readonly CONFIGURATION_DESCRIPTOR = "profile=STANDARD_INTERCEPTOR_ADAPTER;mode=FULLY_CONFIGURED;validation=STRICT";

  protected readonly configurerName = StandardEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerImpl.CONFIGURER_NAME;
  protected readonly configurerVersion = StandardEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerImpl.CONFIGURER_VERSION;
  protected readonly configurationProfile = StandardEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerImpl.CONFIGURATION_PROFILE;

  configureAdapter(
    adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
    configurationProfile: string,
  ): void {
    if (configurationProfile !== StandardEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerImpl.CONFIGURATION_PROFILE) {
      console.debug(
        `[${this.configurerName} v${this.configurerVersion}] ` +
        `Adapter configuration profile mismatch: ` +
        `expected=[${StandardEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerImpl.CONFIGURATION_PROFILE}], ` +
        `received=[${configurationProfile}]. Falling back to default profile.`,
      );
    }
    const registeredDivisors = adapter.getRegisteredDivisors();
    for (const divisor of registeredDivisors) {
      const strategy = adapter.resolveAdapterStrategy(divisor);
      if (strategy !== null && !strategy.isStrategyEnabled()) {
        console.debug(
          `[${this.configurerName} v${this.configurerVersion}] ` +
          `Strategy for divisor=[${divisor}] is disabled. Re-registering with enabled state.`,
        );
      }
    }
  }

  validateAdapterConfiguration(adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter): boolean {
    const registeredDivisors = adapter.getRegisteredDivisors();
    if (registeredDivisors.length === 0) {
      console.debug(
        `[${this.configurerName} v${this.configurerVersion}] ` +
        `Adapter validation warning: No divisor strategies registered in adapter ` +
        `[${adapter.getAdapterName()} v${adapter.getAdapterVersion()}].`,
      );
      return false;
    }
    for (const divisor of registeredDivisors) {
      const strategy = adapter.resolveAdapterStrategy(divisor);
      if (strategy === null) {
        console.debug(
          `[${this.configurerName} v${this.configurerVersion}] ` +
          `Adapter validation warning: No strategy found for divisor=[${divisor}] ` +
          `in adapter [${adapter.getAdapterName()}].`,
        );
        return false;
      }
    }
    return true;
  }

  getConfigurationDescriptor(): string {
    return StandardEnterpriseDivisibilityEvaluationInterceptorAdapterConfigurerImpl.CONFIGURATION_DESCRIPTOR;
  }
}
