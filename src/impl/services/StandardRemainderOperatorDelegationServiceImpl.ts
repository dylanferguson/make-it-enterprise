import { AbstractBaseRemainderOperatorDelegationService } from "../../abstracts/AbstractBaseRemainderOperatorDelegationService.js";
import type { IModuloOperationChainHandler } from "../../contracts/IModuloOperationChainHandler.js";
import { FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory } from "../factories/FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.js";

export class StandardRemainderOperatorDelegationServiceImpl extends AbstractBaseRemainderOperatorDelegationService {
  private static readonly DELEGATION_SERVICE_NAME = "StandardRemainderOperatorDelegationService";
  private static readonly DELEGATION_SERVICE_VERSION = "2.0.0-ENTERPRISE";

  private chainHandler: IModuloOperationChainHandler | null = null;
  private volatileChainHandler: IModuloOperationChainHandler | null = null;

  override computeRemainder(dividend: number, divisor: number): number {
    return this.templateMethodComputeRemainder(dividend, divisor);
  }

  override getDelegationServiceName(): string {
    return StandardRemainderOperatorDelegationServiceImpl.DELEGATION_SERVICE_NAME;
  }

  override getDelegationServiceVersion(): string {
    return StandardRemainderOperatorDelegationServiceImpl.DELEGATION_SERVICE_VERSION;
  }

  override supportsOperands(dividend: number, divisor: number): boolean {
    return Number.isFinite(dividend) && Number.isFinite(divisor) && divisor !== 0;
  }

  setModuloOperatorChainHandler(handler: IModuloOperationChainHandler | null): void {
    this.chainHandler = handler;
  }

  setVolatileChainHandler(handler: IModuloOperationChainHandler | null): void {
    this.volatileChainHandler = handler;
  }

  getModuloOperatorChainHandler(): IModuloOperationChainHandler | null {
    return this.chainHandler;
  }

  getVolatileChainHandler(): IModuloOperationChainHandler | null {
    return this.volatileChainHandler;
  }

  protected override doComputeRemainder(
    truncatedDividend: number,
    truncatedDivisor: number,
  ): number {
    const resolver = FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.createResolver();
    return resolver.resolveModuloResult(
      truncatedDividend,
      truncatedDivisor,
      "StandardRemainderOperatorDelegationService",
    );
  }

  protected override postProcessRemainderResult(
    result: number,
    _originalDividend: number,
    _originalDivisor: number,
  ): number {
    if (Object.is(result, -0)) {
      return 0;
    }
    if (result < 0) {
      return Math.abs(result);
    }
    return result;
  }
}
