import { AbstractBaseComputationProtocol } from "../../abstracts/AbstractBaseComputationProtocol.js";
import type { IComputationProtocolPhase } from "../../contracts/IComputationProtocolPhase.js";
import type { IProtocolSession } from "../../contracts/IProtocolSession.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzEnterpriseServiceFacade } from "../../contracts/IFizzBuzzEnterpriseServiceFacade.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";
import { HandshakeProtocolPhaseImpl } from "./HandshakeProtocolPhaseImpl.js";
import { ExecutionProtocolPhaseImpl } from "./ExecutionProtocolPhaseImpl.js";
import { AcknowledgmentProtocolPhaseImpl } from "./AcknowledgmentProtocolPhaseImpl.js";

export class FizzBuzzComputationProtocolImpl extends AbstractBaseComputationProtocol {
  private static readonly PROTOCOL_NAME = "FizzBuzzComputationProtocol";
  private static readonly PROTOCOL_VERSION = "1.0.0-PROTOCOL";

  private readonly enterpriseServiceFacade: IFizzBuzzEnterpriseServiceFacade;

  constructor(enterpriseServiceFacade: IFizzBuzzEnterpriseServiceFacade) {
    super(
      FizzBuzzComputationProtocolImpl.PROTOCOL_NAME,
      FizzBuzzComputationProtocolImpl.PROTOCOL_VERSION,
    );
    this.enterpriseServiceFacade = enterpriseServiceFacade;
    this.registerDefaultPhases();
  }

  override executeProtocol(
    request: IFizzBuzzComputationRequest,
    session: IProtocolSession,
  ): IFizzBuzzComputationResponse {
    this.assertSessionReady(session);
    this.logProtocolEvent(
      `Executing protocol for request ${request.getRequestId()} (value: ${request.getRequestedValue()})`,
    );

    let lastResponse: IFizzBuzzComputationResponse | null = null;

    for (const phase of this.phases) {
      if (!phase.isPhaseEnabled()) {
        this.logProtocolEvent(`Skipping disabled phase: ${phase.getPhaseName()}`);
        continue;
      }

      this.logProtocolEvent(`Executing phase: ${phase.getPhaseName()}`);
      lastResponse = phase.executePhase(request, session);
    }

    return lastResponse ?? new FizzBuzzComputationResponseImpl(
      request.getRequestedValue(),
      "PROTOCOL_ERROR",
      `error:${request.getRequestId()}`,
      request.getRequestId(),
      500,
    );
  }

  private registerDefaultPhases(): void {
    this.registerPhase(new HandshakeProtocolPhaseImpl());
    this.registerPhase(new ExecutionProtocolPhaseImpl(this.enterpriseServiceFacade));
    this.registerPhase(new AcknowledgmentProtocolPhaseImpl());
  }
}
