import type { IRemainderOperatorDelegationService } from "../contracts/IRemainderOperatorDelegationService.js";
import type { IRemainderOperatorDelegationServiceDecorator } from "../contracts/IRemainderOperatorDelegationServiceDecorator.js";

export abstract class AbstractBaseRemainderOperatorDelegationServiceDecorator
  implements IRemainderOperatorDelegationServiceDecorator
{
  protected readonly decoratedService: IRemainderOperatorDelegationService;

  constructor(decoratedService: IRemainderOperatorDelegationService) {
    this.decoratedService = decoratedService;
  }

  getDecoratedService(): IRemainderOperatorDelegationService {
    return this.decoratedService;
  }

  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;

  computeRemainder(dividend: number, divisor: number): number {
    return this.decoratedService.computeRemainder(dividend, divisor);
  }

  getDelegationServiceName(): string {
    return `${this.getDecoratorName()} -> ${this.decoratedService.getDelegationServiceName()}`;
  }

  getDelegationServiceVersion(): string {
    return `${this.getDecoratorVersion()} (wrapping ${this.decoratedService.getDelegationServiceVersion()})`;
  }

  supportsOperands(dividend: number, divisor: number): boolean {
    return this.decoratedService.supportsOperands(dividend, divisor);
  }
}
