import type { IComputationRequestInterceptionFilter } from "../../contracts/IComputationRequestInterceptionFilter.js";
import { RequestAuditingInterceptionFilterImpl } from "../filters/RequestAuditingInterceptionFilterImpl.js";
import { RequestMetricsInterceptionFilterImpl } from "../filters/RequestMetricsInterceptionFilterImpl.js";
import { RequestValidationInterceptionFilterImpl } from "../filters/RequestValidationInterceptionFilterImpl.js";
import { RequestThreadLocalContextInterceptionFilterImpl } from "../filters/RequestThreadLocalContextInterceptionFilterImpl.js";

export const InterceptionFilterChainConfigurationProfile = {
  STANDARD: "STANDARD",
  OBSERVABILITY_HEAVY: "OBSERVABILITY_HEAVY",
  MINIMAL: "MINIMAL",
  STRICT_VALIDATION: "STRICT_VALIDATION",
} as const;

export type InterceptionFilterChainConfigurationProfile =
  (typeof InterceptionFilterChainConfigurationProfile)[keyof typeof InterceptionFilterChainConfigurationProfile];

export class InterceptionFilterChainFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "InterceptionFilterChainFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-INTERCEPTION-FILTER-CHAIN-FACTORY";

  private static currentProfile: InterceptionFilterChainConfigurationProfile = "STANDARD";

  static createFilters(
    profile: InterceptionFilterChainConfigurationProfile = "STANDARD",
  ): IComputationRequestInterceptionFilter[] {
    InterceptionFilterChainFactoryBeanFactory.currentProfile = profile;
    console.debug(
      `[${InterceptionFilterChainFactoryBeanFactory.FACTORY_BEAN_NAME} v${InterceptionFilterChainFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Creating interception filters for profile: ${profile}`,
    );
    switch (profile) {
      case "OBSERVABILITY_HEAVY":
        return [
          new RequestValidationInterceptionFilterImpl(true),
          new RequestMetricsInterceptionFilterImpl(true),
          new RequestAuditingInterceptionFilterImpl(true),
          new RequestThreadLocalContextInterceptionFilterImpl(true),
        ];
      case "MINIMAL":
        return [
          new RequestValidationInterceptionFilterImpl(true),
        ];
      case "STRICT_VALIDATION":
        return [
          new RequestValidationInterceptionFilterImpl(true),
          new RequestThreadLocalContextInterceptionFilterImpl(true),
        ];
      case "STANDARD":
      default:
        return [
          new RequestValidationInterceptionFilterImpl(true),
          new RequestMetricsInterceptionFilterImpl(true),
          new RequestAuditingInterceptionFilterImpl(true),
        ];
    }
  }

  static getCurrentProfile(): InterceptionFilterChainConfigurationProfile {
    return InterceptionFilterChainFactoryBeanFactory.currentProfile;
  }

  static getFactoryBeanName(): string {
    return InterceptionFilterChainFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return InterceptionFilterChainFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
