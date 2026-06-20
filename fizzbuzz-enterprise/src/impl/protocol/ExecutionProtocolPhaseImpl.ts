import { AbstractBaseComputationProtocolPhase } from "../../abstracts/AbstractBaseComputationProtocolPhase.js";
import type { IProtocolSession } from "../../contracts/IProtocolSession.js";
import type { IComputationProtocol } from "../../contracts/IComputationProtocol.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzEnterpriseServiceFacade } from "../../contracts/IFizzBuzzEnterpriseServiceFacade.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";

export class ExecutionProtocolPhaseImpl extends AbstractBaseComputationProtocolPhase {
  private static readonly PHASE_NAME = "ExecutionProtocolPhase";
  private static readonly PHASE_PRIORITY = 50;

  private readonly computationDelegate: IFizzBuzzEnterpriseServiceFacade;

  constructor(computationDelegate: IFizzBuzzEnterpriseServiceFacade) {
    super(true);
    this.computationDelegate = computationDelegate;
  }

  override executePhase(
    request: IFizzBuzzComputationRequest,
    session: IProtocolSession,
  ): IFizzBuzzComputationResponse {
    this.validateRequest(request);
    this.validateSession(session);

    if (!session.isHandshakeComplete()) {
      throw new Error(
        `[${ExecutionProtocolPhaseImpl.PHASE_NAME}] Cannot execute computation: handshake phase not complete for session ${session.getSessionId()}`,
      );
    }

    const requestValue = request.getRequestedValue();

    const startTime = performance.now();
    const result = this.computationDelegate.resolveEnterpriseValue(requestValue);
    const durationMs = performance.now() - startTime;

    session.setComputationResult(result);
    session.setNegotiatedParameter("executionDurationMs", durationMs);
    session.setNegotiatedParameter("executionTimestamp", Date.now());

    const response = new FizzBuzzComputationResponseImpl(
      requestValue,
      result,
      `exec:${request.getRequestId()}`,
      request.getRequestId(),
    );
    response.setComputationDurationMs(durationMs);
    return response;
  }

  override getPhaseName(): string {
    return ExecutionProtocolPhaseImpl.PHASE_NAME;
  }

  override getPhasePriority(): number {
    return ExecutionProtocolPhaseImpl.PHASE_PRIORITY;
  }
}
