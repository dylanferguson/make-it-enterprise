import type { IRemainderComputationSupervisor } from "../contracts/IRemainderComputationSupervisor.js";
import type { IRemainderOperatorDelegationService } from "../contracts/IRemainderOperatorDelegationService.js";

export abstract class AbstractBaseRemainderComputationSupervisor
  implements IRemainderComputationSupervisor
{
  protected readonly delegationService: IRemainderOperatorDelegationService;

  constructor(delegationService: IRemainderOperatorDelegationService) {
    this.delegationService = delegationService;
  }

  abstract superviseRemainderComputation(
    dividend: number,
    divisor: number,
    computationContext: string,
  ): number;
  abstract getSupervisorName(): string;
  abstract getSupervisorVersion(): string;

  getUnderlyingDelegationService(): IRemainderOperatorDelegationService {
    return this.delegationService;
  }

  getDelegationServiceDescriptor(): string {
    return `${this.delegationService.getDelegationServiceName()} v${this.delegationService.getDelegationServiceVersion()}`;
  }

  protected preSupervision(
    _dividend: number,
    _divisor: number,
    _computationContext: string,
  ): void {
  }

  protected postSupervision(
    _dividend: number,
    _divisor: number,
    _result: number,
    _computationContext: string,
  ): void {
  }

  protected templateMethodSupervise(
    dividend: number,
    divisor: number,
    computationContext: string,
  ): number {
    this.preSupervision(dividend, divisor, computationContext);
    const result = this.delegationService.computeRemainder(dividend, divisor);
    this.postSupervision(dividend, divisor, result, computationContext);
    return result;
  }
}
