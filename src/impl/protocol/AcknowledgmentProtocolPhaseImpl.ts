import { AbstractBaseComputationProtocolPhase } from "../../abstracts/AbstractBaseComputationProtocolPhase.js";
import type { IProtocolSession } from "../../contracts/IProtocolSession.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";

export class AcknowledgmentProtocolPhaseImpl extends AbstractBaseComputationProtocolPhase {
  private static readonly PHASE_NAME = "AcknowledgmentProtocolPhase";
  private static readonly PHASE_PRIORITY = 0;

  constructor() {
    super(true);
  }

  override executePhase(
    request: IFizzBuzzComputationRequest,
    session: IProtocolSession,
  ): IFizzBuzzComputationResponse {
    this.validateRequest(request);
    this.validateSession(session);

    if (!session.isHandshakeComplete()) {
      throw new Error(
        `[${AcknowledgmentProtocolPhaseImpl.PHASE_NAME}] Cannot acknowledge: handshake incomplete for session ${session.getSessionId()}`,
      );
    }

    const result = session.getComputationResult();
    if (result === null) {
      throw new Error(
        `[${AcknowledgmentProtocolPhaseImpl.PHASE_NAME}] Cannot acknowledge: no computation result in session ${session.getSessionId()}`,
      );
    }

    session.markAcknowledgmentComplete();
    session.setNegotiatedParameter("acknowledgmentTimestamp", Date.now());

    return new FizzBuzzComputationResponseImpl(
      request.getRequestedValue(),
      result,
      `ack:${request.getRequestId()}`,
      request.getRequestId(),
    );
  }

  override getPhaseName(): string {
    return AcknowledgmentProtocolPhaseImpl.PHASE_NAME;
  }

  override getPhasePriority(): number {
    return AcknowledgmentProtocolPhaseImpl.PHASE_PRIORITY;
  }
}
