import type { IProtocolPhaseFactory } from "../../contracts/IProtocolPhaseFactory.js";
import type { IComputationProtocolPhase } from "../../contracts/IComputationProtocolPhase.js";
import type { IComputationProtocol } from "../../contracts/IComputationProtocol.js";
import { HandshakeProtocolPhaseImpl } from "./HandshakeProtocolPhaseImpl.js";
import { AcknowledgmentProtocolPhaseImpl } from "./AcknowledgmentProtocolPhaseImpl.js";

export class FizzBuzzProtocolPhaseFactoryImpl implements IProtocolPhaseFactory {
  private static readonly FACTORY_NAME = "FizzBuzzProtocolPhaseFactory";
  private static readonly FACTORY_VERSION = "1.0.0-PHASE-FACTORY";

  createHandshakePhase(): IComputationProtocolPhase {
    return new HandshakeProtocolPhaseImpl();
  }

  createExecutionPhase(delegate: IComputationProtocol): IComputationProtocolPhase {
    throw new Error(
      `[${FizzBuzzProtocolPhaseFactoryImpl.FACTORY_NAME}] Execution phase requires an IFizzBuzzEnterpriseServiceFacade reference — use createExecutionPhaseWithFacade instead`,
    );
  }

  createAcknowledgmentPhase(): IComputationProtocolPhase {
    return new AcknowledgmentProtocolPhaseImpl();
  }

  getFactoryName(): string {
    return FizzBuzzProtocolPhaseFactoryImpl.FACTORY_NAME;
  }

  getFactoryVersion(): string {
    return FizzBuzzProtocolPhaseFactoryImpl.FACTORY_VERSION;
  }
}
