import { AbstractBaseRemainderOperatorDelegationService } from "../../abstracts/AbstractBaseRemainderOperatorDelegationService.js";

export class StandardRemainderOperatorDelegationServiceImpl extends AbstractBaseRemainderOperatorDelegationService {
  private static readonly DELEGATION_SERVICE_NAME = "StandardRemainderOperatorDelegationService";
  private static readonly DELEGATION_SERVICE_VERSION = "1.0.0-RELEASE";

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

  protected override doComputeRemainder(
    truncatedDividend: number,
    truncatedDivisor: number,
  ): number {
    const quotient = Math.trunc(truncatedDividend / truncatedDivisor);
    return truncatedDividend - quotient * truncatedDivisor;
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
