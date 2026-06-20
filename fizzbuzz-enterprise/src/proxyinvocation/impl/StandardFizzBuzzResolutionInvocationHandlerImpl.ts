import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import { AbstractBaseFizzBuzzResolutionInvocationHandler } from "../abstracts/AbstractBaseFizzBuzzResolutionInvocationHandler.js";

export class StandardFizzBuzzResolutionInvocationHandlerImpl
  extends AbstractBaseFizzBuzzResolutionInvocationHandler
{
  private static readonly HANDLER_IMPL_NAME = "StandardFizzBuzzResolutionInvocationHandlerImpl";
  private static readonly HANDLER_IMPL_VERSION = "1.0.0-PROXY-INVOCATION-HANDLER";

  private totalResolveValueInvocations: number = 0;
  private totalResolveRangeInvocations: number = 0;

  override invokeResolveValue(
    proxy: IFizzBuzzSingleValueResolutionFacade,
    value: number,
    delegate: IFizzBuzzSingleValueResolutionFacade,
  ): string {
    this.incrementInterceptionCount();
    this.totalResolveValueInvocations++;

    const invocationContext = this.buildInvocationContext(value);
    console.debug(
      `[${StandardFizzBuzzResolutionInvocationHandlerImpl.HANDLER_IMPL_NAME} v${StandardFizzBuzzResolutionInvocationHandlerImpl.HANDLER_IMPL_VERSION}] ` +
      `Intercepted resolveValue invocation [context=${invocationContext}]: ` +
      `value=[${value}], ` +
      `proxy=[${proxy.getFacadeName()}], ` +
      `delegate=[${delegate.getFacadeName()}], ` +
      `interceptionCount=[${this.interceptionCount}], ` +
      `totalInvocations=[${this.totalResolveValueInvocations}]`,
    );

    const result = delegate.resolveValue(value);

    console.debug(
      `[${StandardFizzBuzzResolutionInvocationHandlerImpl.HANDLER_IMPL_NAME}] ` +
      `Invocation completed [context=${invocationContext}]: ` +
      `result=[${result}]`,
    );

    return result;
  }

  override invokeResolveRange(
    proxy: IFizzBuzzSingleValueResolutionFacade,
    start: number,
    end: number,
    delegate: IFizzBuzzSingleValueResolutionFacade,
  ): readonly string[] {
    this.incrementInterceptionCount();
    this.totalResolveRangeInvocations++;

    const invocationContext = this.buildInvocationContext(start);
    console.debug(
      `[${StandardFizzBuzzResolutionInvocationHandlerImpl.HANDLER_IMPL_NAME} v${StandardFizzBuzzResolutionInvocationHandlerImpl.HANDLER_IMPL_VERSION}] ` +
      `Intercepted resolveRange invocation [context=${invocationContext}]: ` +
      `range=[${start}..${end}], ` +
      `proxy=[${proxy.getFacadeName()}], ` +
      `delegate=[${delegate.getFacadeName()}], ` +
      `interceptionCount=[${this.interceptionCount}], ` +
      `rangeInvocations=[${this.totalResolveRangeInvocations}]`,
    );

    const results = delegate.resolveRange(start, end);

    console.debug(
      `[${StandardFizzBuzzResolutionInvocationHandlerImpl.HANDLER_IMPL_NAME}] ` +
      `Invocation completed [context=${invocationContext}]: ` +
      `resultCount=[${results.length}]`,
    );

    return results;
  }

  override getHandlerName(): string {
    return StandardFizzBuzzResolutionInvocationHandlerImpl.HANDLER_IMPL_NAME;
  }

  override getHandlerVersion(): string {
    return StandardFizzBuzzResolutionInvocationHandlerImpl.HANDLER_IMPL_VERSION;
  }

  getTotalResolveValueInvocations(): number {
    return this.totalResolveValueInvocations;
  }

  getTotalResolveRangeInvocations(): number {
    return this.totalResolveRangeInvocations;
  }
}
