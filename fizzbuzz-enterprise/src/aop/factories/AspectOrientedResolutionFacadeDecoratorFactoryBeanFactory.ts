import type { IAspectOrientedResolutionFacadeDecorator } from "../contracts/IAspectOrientedResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IAopProxyFactory } from "../contracts/IAopProxyFactory.js";
import type { IAspectWeaver } from "../contracts/IAspectWeaver.js";
import { AspectOrientedResolutionFacadeDecoratorImpl } from "../decorators/AspectOrientedResolutionFacadeDecoratorImpl.js";
import { AopInfrastructureFactoryBeanFactory } from "./AopInfrastructureFactoryBeanFactory.js";

export class AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-AOP-DECORATOR-FACTORY-BEAN";

  private static decoratorInitialized: boolean = false;
  private static decoratorInstances: Map<string, IAspectOrientedResolutionFacadeDecorator> = new Map();

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    profile: string = "STANDARD_AOP_ENABLED",
  ): IAspectOrientedResolutionFacadeDecorator {
    const cacheKey = `${wrappedFacade.getFacadeName()}::${profile}`;
    const cached = AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.decoratorInstances.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }

    if (!AopInfrastructureFactoryBeanFactory.isInfrastructureInitialized()) {
      AopInfrastructureFactoryBeanFactory.initializeInfrastructure();
    }

    const proxyFactory = AopInfrastructureFactoryBeanFactory.getProxyFactory();
    const weaver = AopInfrastructureFactoryBeanFactory.getWeaver();
    if (proxyFactory === null || weaver === null) {
      throw new Error(
        `[${AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME}] ` +
        `AOP infrastructure not available — proxyFactory=[${proxyFactory !== null}], weaver=[${weaver !== null}]`,
      );
    }

    if (!AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.decoratorInitialized) {
      AopInfrastructureFactoryBeanFactory.registerDefaultComputationAspects(weaver);
      AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.decoratorInitialized = true;
    }

    const decorator = new AspectOrientedResolutionFacadeDecoratorImpl(wrappedFacade, proxyFactory, weaver);
    AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.decoratorInstances.set(cacheKey, decorator);
    return decorator;
  }

  static getDecoratorCount(): number {
    return AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.decoratorInstances.size;
  }

  static getFactoryBeanName(): string {
    return AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactory(): void {
    AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.decoratorInitialized = false;
    AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory.decoratorInstances.clear();
  }
}
