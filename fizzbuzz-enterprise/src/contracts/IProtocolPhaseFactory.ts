import type { IComputationProtocolPhase } from "./IComputationProtocolPhase.js";
import type { IComputationProtocol } from "./IComputationProtocol.js";
import type { IProtocolSession } from "./IProtocolSession.js";

export interface IProtocolPhaseFactory {
  createHandshakePhase(): IComputationProtocolPhase;
  createExecutionPhase(delegate: IComputationProtocol): IComputationProtocolPhase;
  createAcknowledgmentPhase(): IComputationProtocolPhase;
  getFactoryName(): string;
  getFactoryVersion(): string;
}
