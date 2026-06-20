import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzResolutionInvocationHandler } from "../contracts/IFizzBuzzResolutionInvocationHandler.js";
import type { IFizzBuzzResolutionProxyFactory } from "../contracts/IFizzBuzzResolutionProxyFactory.js";
import type { IInvocationAwareResolutionFacadeDecorator } from "../contracts/IInvocationAwareResolutionFacadeDecorator.js";

export class StandardInvocationAwareResolutionFacadeDecoratorImpl
  implements IInvocationAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "StandardInvocationAwareResolutionFacadeDecoratorImpl";
  private static readonly DECORATOR_VERSION = "1.0.0-INVOCATION-AWARE-DECORATOR";

  private readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly invocationHandler: IFizzBuzzResolutionInvocationHandler;
  private readonly proxyFactory: IFizzBuzzResolutionProxyFactory;
  private readonly proxyFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly proxyInvocationEnabled: boolean;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    invocationHandler: IFizzBuzzResolutionInvocationHandler,
    proxyFactory: IFizzBuzzResolutionProxyFactory,
    proxyInvocationEnabled: boolean = true,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.invocationHandler = invocationHandler;
    this.proxyFactory = proxyFactory;
    this.proxyInvocationEnabled = proxyInvocationEnabled;
    this.proxyFacade = this.proxyFactory.createProxy(
      this.wrappedFacade,
      this.invocationHandler,
    );
  }

  resolveValue(value: number): string {
    console.debug(
      `[${StandardInvocationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME} v${StandardInvocationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION}] ` +
      `ResolveValue delegation: value=[${value}], ` +
      `proxyInvocationEnabled=[${this.proxyInvocationEnabled}], ` +
      `handler=[${this.invocationHandler.getHandlerName()}], ` +
      `proxy=[${this.proxyFacade.getFacadeName()}]`,
    );
    if (this.proxyInvocationEnabled) {
      return this.proxyFacade.resolveValue(value);
    }
    return this.wrappedFacade.resolveValue(value);
  }

  resolveRange(start: number, end: number): readonly string[] {
    console.debug(
      `[${StandardInvocationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME} v${StandardInvocationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION}] ` +
      `ResolveRange delegation: range=[${start}..${end}], ` +
      `proxyInvocationEnabled=[${this.proxyInvocationEnabled}], ` +
      `handler=[${this.invocationHandler.getHandlerName()}], ` +
      `proxy=[${this.proxyFacade.getFacadeName()}]`,
    );
    if (this.proxyInvocationEnabled) {
      return this.proxyFacade.resolveRange(start, end);
    }
    return this.wrappedFacade.resolveRange(start, end);
  }

  getFacadeName(): string {
    return `${StandardInvocationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}::${this.wrappedFacade.getFacadeName()}`;
  }

  getFacadeVersion(): string {
    return StandardInvocationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getInvocationHandler(): IFizzBuzzResolutionInvocationHandler {
    return this.invocationHandler;
  }

  getProxyFactory(): IFizzBuzzResolutionProxyFactory {
    return this.proxyFactory;
  }

  getDecoratorName(): string {
    return StandardInvocationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  getDecoratorVersion(): string {
    return StandardInvocationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  isProxyInvocationEnabled(): boolean {
    return this.proxyInvocationEnabled;
  }
}
