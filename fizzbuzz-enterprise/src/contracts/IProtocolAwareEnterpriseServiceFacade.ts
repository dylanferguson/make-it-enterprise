import type { IFizzBuzzEnterpriseServiceFacade } from "./IFizzBuzzEnterpriseServiceFacade.js";
import type { IComputationProtocol } from "./IComputationProtocol.js";
import type { IProtocolSession } from "./IProtocolSession.js";
import type { IProtocolPhaseFactory } from "./IProtocolPhaseFactory.js";

export interface IProtocolAwareEnterpriseServiceFacade extends IFizzBuzzEnterpriseServiceFacade {
  getProtocol(): IComputationProtocol;
  getProtocolSessionFactory(): IProtocolPhaseFactory;
  createProtocolSession(): IProtocolSession;
  isProtocolEnabled(): boolean;
  setProtocolEnabled(enabled: boolean): void;
}
