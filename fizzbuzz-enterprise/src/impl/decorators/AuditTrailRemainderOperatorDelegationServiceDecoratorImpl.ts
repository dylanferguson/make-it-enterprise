import { AbstractBaseRemainderOperatorDelegationServiceDecorator } from "../../abstracts/AbstractBaseRemainderOperatorDelegationServiceDecorator.js";
import type { IRemainderOperatorDelegationService } from "../../contracts/IRemainderOperatorDelegationService.js";

export class AuditTrailRemainderOperatorDelegationServiceDecoratorImpl
  extends AbstractBaseRemainderOperatorDelegationServiceDecorator
{
  private static readonly DECORATOR_NAME = "AuditTrailRemainderOperatorDelegationServiceDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-RELEASE";
  private invocationCount: number = 0;

  constructor(decoratedService: IRemainderOperatorDelegationService) {
    super(decoratedService);
  }

  override computeRemainder(dividend: number, divisor: number): number {
    this.invocationCount++;
    const result = this.decoratedService.computeRemainder(dividend, divisor);
    console.debug(
      `[${this.getDecoratorName()}] Invocation #${this.invocationCount}: computeRemainder(${dividend}, ${divisor}) => ${result}`,
    );
    return result;
  }

  override getDecoratorName(): string {
    return AuditTrailRemainderOperatorDelegationServiceDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return AuditTrailRemainderOperatorDelegationServiceDecoratorImpl.DECORATOR_VERSION;
  }

  getInvocationCount(): number {
    return this.invocationCount;
  }
}
