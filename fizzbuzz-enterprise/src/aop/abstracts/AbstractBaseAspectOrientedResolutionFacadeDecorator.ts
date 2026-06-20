import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IAopProxyFactory } from "../contracts/IAopProxyFactory.js";
import type { IAspectWeaver } from "../contracts/IAspectWeaver.js";
import type { IAspectOrientedResolutionFacadeDecorator } from "../contracts/IAspectOrientedResolutionFacadeDecorator.js";

export abstract class AbstractBaseAspectOrientedResolutionFacadeDecorator
  implements IAspectOrientedResolutionFacadeDecorator
{
  protected static readonly AOP_CONTEXT_PREFIX = "aop:dec";

  protected readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly aopProxyFactory: IAopProxyFactory;
  protected readonly aopWeaver: IAspectWeaver;
  private readonly proxyCache: Map<string, IFizzBuzzSingleValueResolutionFacade> = new Map();

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    aopProxyFactory: IAopProxyFactory,
    aopWeaver: IAspectWeaver,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.aopProxyFactory = aopProxyFactory;
    this.aopWeaver = aopWeaver;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getAopProxyFactory(): IAopProxyFactory {
    return this.aopProxyFactory;
  }

  getAopWeaver(): IAspectWeaver {
    return this.aopWeaver;
  }

  protected createAopProxy(facade: IFizzBuzzSingleValueResolutionFacade): IFizzBuzzSingleValueResolutionFacade {
    const cacheKey = `${facade.getFacadeName()}::${facade.getFacadeVersion()}`;
    const cached = this.proxyCache.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }
    const proxy = this.aopProxyFactory.createProxy(facade, this.aopWeaver);
    this.proxyCache.set(cacheKey, proxy);
    return proxy;
  }

  protected buildAopContext(value: number): string {
    return `${AbstractBaseAspectOrientedResolutionFacadeDecorator.AOP_CONTEXT_PREFIX}:${value}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }

  protected assertValueInRange(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] ` +
        `Resolution value must be finite, received: ${value}`,
      );
    }
  }
}
