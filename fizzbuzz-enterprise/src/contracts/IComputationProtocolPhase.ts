import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";
import type { IProtocolSession } from "./IProtocolSession.js";

export interface IComputationProtocolPhase {
  executePhase(
    request: IFizzBuzzComputationRequest,
    session: IProtocolSession,
  ): IFizzBuzzComputationResponse;
  getPhaseName(): string;
  getPhasePriority(): number;
  isPhaseEnabled(): boolean;
}
