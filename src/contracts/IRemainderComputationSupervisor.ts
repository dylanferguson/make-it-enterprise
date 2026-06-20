import type { IRemainderOperatorDelegationService } from "./IRemainderOperatorDelegationService.js";

export interface IRemainderComputationSupervisor {
  superviseRemainderComputation(
    dividend: number,
    divisor: number,
    computationContext: string,
  ): number;
  getSupervisorName(): string;
  getSupervisorVersion(): string;
  getUnderlyingDelegationService(): IRemainderOperatorDelegationService;
  getDelegationServiceDescriptor(): string;
}
