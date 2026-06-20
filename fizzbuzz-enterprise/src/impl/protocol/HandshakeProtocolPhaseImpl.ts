import { AbstractBaseComputationProtocolPhase } from "../../abstracts/AbstractBaseComputationProtocolPhase.js";
import type { IProtocolSession } from "../../contracts/IProtocolSession.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";

export class HandshakeProtocolPhaseImpl extends AbstractBaseComputationProtocolPhase {
  private static readonly PHASE_NAME = "HandshakeProtocolPhase";
  private static readonly PHASE_PRIORITY = 100;
  private static readonly HANDSHAKE_PROTOCOL_VERSION = "1.0.0-HANDSHAKE";

  constructor() {
    super(true);
  }

  override executePhase(
    request: IFizzBuzzComputationRequest,
    session: IProtocolSession,
  ): IFizzBuzzComputationResponse {
    this.validateRequest(request);
    this.validateSession(session);

    const requestValue = request.getRequestedValue();
    const requestOrigin = request.getRequestOrigin();

    session.setNegotiatedParameter("protocolVersion", HandshakeProtocolPhaseImpl.HANDSHAKE_PROTOCOL_VERSION);
    session.setNegotiatedParameter("requestOrigin", requestOrigin);
    session.setNegotiatedParameter("negotiatedValue", requestValue);
    session.setNegotiatedParameter("negotiatedTimestamp", Date.now());

    if (!Number.isInteger(requestValue) || requestValue < 0) {
      throw new Error(
        `[${HandshakeProtocolPhaseImpl.PHASE_NAME}] Handshake rejected: value ${requestValue} does not satisfy protocol constraints`,
      );
    }

    session.markHandshakeComplete();

    return new FizzBuzzComputationResponseImpl(
      requestValue,
      "HANDSHAKE_ACK",
      `handshake:${request.getRequestId()}`,
      request.getRequestId(),
      202,
    );
  }

  override getPhaseName(): string {
    return HandshakeProtocolPhaseImpl.PHASE_NAME;
  }

  override getPhasePriority(): number {
    return HandshakeProtocolPhaseImpl.PHASE_PRIORITY;
  }
}
