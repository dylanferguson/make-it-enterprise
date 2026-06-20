import type { IComputationProtocolPhase } from "./IComputationProtocolPhase.js";
import type { IProtocolSession } from "./IProtocolSession.js";
import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";

export interface IComputationProtocol {
  executeProtocol(
    request: IFizzBuzzComputationRequest,
    session: IProtocolSession,
  ): IFizzBuzzComputationResponse;
  getProtocolName(): string;
  getProtocolVersion(): string;
  getRegisteredPhases(): readonly IComputationProtocolPhase[];
  registerPhase(phase: IComputationProtocolPhase): void;
}
