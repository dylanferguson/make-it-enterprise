import type { IComputationProtocolPhase } from "../contracts/IComputationProtocolPhase.js";
import type { IProtocolSession } from "../contracts/IProtocolSession.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";

export abstract class AbstractBaseComputationProtocolPhase implements IComputationProtocolPhase {
  protected readonly phaseEnabled: boolean;

  constructor(phaseEnabled: boolean = true) {
    this.phaseEnabled = phaseEnabled;
  }

  abstract executePhase(
    request: IFizzBuzzComputationRequest,
    session: IProtocolSession,
  ): IFizzBuzzComputationResponse;

  abstract getPhaseName(): string;

  abstract getPhasePriority(): number;

  isPhaseEnabled(): boolean {
    return this.phaseEnabled;
  }

  protected validateRequest(request: IFizzBuzzComputationRequest): void {
    if (!request || !Number.isFinite(request.getRequestedValue())) {
      throw new Error(
        `[${this.getPhaseName()}] Invalid computation request: value must be finite`,
      );
    }
  }

  protected validateSession(session: IProtocolSession): void {
    if (!session) {
      throw new Error(
        `[${this.getPhaseName()}] Protocol session is null — cannot execute phase`,
      );
    }
  }
}
