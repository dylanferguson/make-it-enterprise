import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationRequestInterceptionFilter } from "../../contracts/IComputationRequestInterceptionFilter.js";
import type { IComputationRequestInterceptionFilterChain } from "../../contracts/IComputationRequestInterceptionFilter.js";
import type { IInterceptionFilterChainResolutionFacadeDecorator } from "../../contracts/IInterceptionFilterChainResolutionFacadeDecorator.js";
import { ComputationRequestInterceptionFilterChainImpl } from "../filters/ComputationRequestInterceptionFilterChainImpl.js";
import { InterceptionFilterChainResolutionFacadeDecoratorImpl } from "../filters/InterceptionFilterChainResolutionFacadeDecoratorImpl.js";
import { InterceptionFilterChainFactoryBeanFactory, InterceptionFilterChainConfigurationProfile } from "./InterceptionFilterChainFactoryBeanFactory.js";

export const InterceptionFilterChainDecoratorConfigurationProfile = {
  ENABLED_STANDARD: "ENABLED_STANDARD",
  ENABLED_OBSERVABILITY_HEAVY: "ENABLED_OBSERVABILITY_HEAVY",
  DISABLED: "DISABLED",
} as const;

export type InterceptionFilterChainDecoratorConfigurationProfile =
  (typeof InterceptionFilterChainDecoratorConfigurationProfile)[keyof typeof InterceptionFilterChainDecoratorConfigurationProfile];

export class InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_NAME = "InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_VERSION = "1.0.0-INTERCEPTION-DECORATOR-FACTORY";

  private static instance: IInterceptionFilterChainResolutionFacadeDecorator | null = null;
  private static currentProfile: InterceptionFilterChainDecoratorConfigurationProfile = "ENABLED_STANDARD";

  static createDecorator(
    decoratedFacade: IFizzBuzzSingleValueResolutionFacade,
    profile: InterceptionFilterChainDecoratorConfigurationProfile = "ENABLED_STANDARD",
  ): IInterceptionFilterChainResolutionFacadeDecorator {
    if (
      InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.instance === null ||
      InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.currentProfile !== profile
    ) {
      InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.currentProfile = profile;

      let filterProfile: InterceptionFilterChainConfigurationProfile;
      let filterChainEnabled: boolean;

      switch (profile) {
        case "ENABLED_OBSERVABILITY_HEAVY":
          filterProfile = "OBSERVABILITY_HEAVY";
          filterChainEnabled = true;
          break;
        case "DISABLED":
          filterProfile = "MINIMAL";
          filterChainEnabled = false;
          break;
        case "ENABLED_STANDARD":
        default:
          filterProfile = "STANDARD";
          filterChainEnabled = true;
          break;
      }

      const filters: IComputationRequestInterceptionFilter[] =
        InterceptionFilterChainFactoryBeanFactory.createFilters(filterProfile);
      const filterChain: IComputationRequestInterceptionFilterChain =
        new ComputationRequestInterceptionFilterChainImpl(decoratedFacade, filters);

      InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.instance =
        new InterceptionFilterChainResolutionFacadeDecoratorImpl(
          decoratedFacade,
          filterChain,
          undefined,
          filterChainEnabled,
        );

      console.debug(
        `[${InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_NAME} v${InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_VERSION}] ` +
        `Interception filter chain decorator created: profile=${profile}, ` +
        `filterChainEnabled=${filterChainEnabled}, ` +
        `filterCount=${filterChain.getRegisteredFilterCount()}, ` +
        `filterNames=[${filterChain.getRegisteredFilterNames().join(", ")}]`,
      );
    }
    return InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.instance!;
  }

  static getDecorator(): IInterceptionFilterChainResolutionFacadeDecorator | null {
    return InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.instance;
  }

  static getCurrentProfile(): InterceptionFilterChainDecoratorConfigurationProfile {
    return InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.currentProfile;
  }

  static resetDecorator(): void {
    InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.instance = null;
    InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.currentProfile = "ENABLED_STANDARD";
  }

  static isDecoratorInitialized(): boolean {
    return InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.instance !== null;
  }

  static getFactoryName(): string {
    return InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return InterceptionFilterChainResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_VERSION;
  }
}
