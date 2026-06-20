import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IAspectWeaver } from "../contracts/IAspectWeaver.js";
import type { IAopProxyFactory } from "../contracts/IAopProxyFactory.js";
import type { IAspectOrientedResolutionFacadeDecorator } from "../contracts/IAspectOrientedResolutionFacadeDecorator.js";
import { AbstractBaseAspectOrientedResolutionFacadeDecorator } from "../abstracts/AbstractBaseAspectOrientedResolutionFacadeDecorator.js";

export class AspectOrientedResolutionFacadeDecoratorImpl extends AbstractBaseAspectOrientedResolutionFacadeDecorator {
  private static readonly DECORATOR_NAME = "AspectOrientedResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-AOP-DECORATOR";

  private resolutionCount: number = 0;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    aopProxyFactory: IAopProxyFactory,
    aopWeaver: IAspectWeaver,
  ) {
    super(wrappedFacade, aopProxyFactory, aopWeaver);
  }

  override resolveValue(value: number): string {
    this.assertValueInRange(value);
    this.resolutionCount++;
    const proxiedFacade = this.createAopProxy(this.wrappedFacade);
    console.debug(
      `[${AspectOrientedResolutionFacadeDecoratorImpl.DECORATOR_NAME} v${AspectOrientedResolutionFacadeDecoratorImpl.DECORATOR_VERSION}] ` +
      `Resolving value [${value}] through AOP proxy: ` +
      `proxyFactory=[${this.aopProxyFactory.getProxyFactoryName()} v${this.aopProxyFactory.getProxyFactoryVersion()}], ` +
      `weaver=[${this.aopWeaver.getWeaverName()} v${this.aopWeaver.getWeaverVersion()}], ` +
      `wovenAspects=[${this.aopWeaver.getRegisteredAspectCount()}], ` +
      `context=[${this.buildAopContext(value)}]`,
    );
    return proxiedFacade.resolveValue(value);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    this.assertValueInRange(start);
    this.assertValueInRange(end);
    if (end < start) {
      throw new Error(
        `[${AspectOrientedResolutionFacadeDecoratorImpl.DECORATOR_NAME}] ` +
        `Range end [${end}] must be >= start [${start}]`,
      );
    }
    this.resolutionCount += (end - start + 1);
    const proxiedFacade = this.createAopProxy(this.wrappedFacade);
    console.debug(
      `[${AspectOrientedResolutionFacadeDecoratorImpl.DECORATOR_NAME} v${AspectOrientedResolutionFacadeDecoratorImpl.DECORATOR_VERSION}] ` +
      `Resolving range [${start}..${end}] through AOP proxy: wovenAspects=[${this.aopWeaver.getRegisteredAspectCount()}]`,
    );
    return proxiedFacade.resolveRange(start, end);
  }

  override getFacadeName(): string {
    return `${AspectOrientedResolutionFacadeDecoratorImpl.DECORATOR_NAME}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return AspectOrientedResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorName(): string {
    return AspectOrientedResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return AspectOrientedResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }
}
