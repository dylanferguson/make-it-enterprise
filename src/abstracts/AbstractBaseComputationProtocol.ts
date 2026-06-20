import type { IComputationProtocol } from "../contracts/IComputationProtocol.js";
import type { IComputationProtocolPhase } from "../contracts/IComputationProtocolPhase.js";
import type { IProtocolSession } from "../contracts/IProtocolSession.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";

export abstract class AbstractBaseComputationProtocol implements IComputationProtocol {
  protected readonly phases: IComputationProtocolPhase[] = [];
  protected protocolName: string;
  protected protocolVersion: string;

  constructor(protocolName: string, protocolVersion: string) {
    this.protocolName = protocolName;
    this.protocolVersion = protocolVersion;
  }

  abstract executeProtocol(
    request: IFizzBuzzComputationRequest,
    session: IProtocolSession,
  ): IFizzBuzzComputationResponse;

  getProtocolName(): string {
    return this.protocolName;
  }

  getProtocolVersion(): string {
    return this.protocolVersion;
  }

  getRegisteredPhases(): readonly IComputationProtocolPhase[] {
    return [...this.phases];
  }

  registerPhase(phase: IComputationProtocolPhase): void {
    this.phases.push(phase);
    this.phases.sort((a, b) => b.getPhasePriority() - a.getPhasePriority());
  }

  getProtocolFrameworkVersion(): string {
    return "1.0.0-ENTERPRISE";
  }

  protected assertSessionReady(session: IProtocolSession): void {
    if (!session) {
      throw new Error(
        `[${this.protocolName}] Protocol session not initialized`,
      );
    }
  }

  protected logProtocolEvent(message: string): void {
    console.debug(`[${this.protocolName}] ${message}`);
  }
}
