import type { IProtocolAwareEnterpriseServiceFacade } from "../contracts/IProtocolAwareEnterpriseServiceFacade.js";
import type { IFizzBuzzEnterpriseServiceFacade } from "../contracts/IFizzBuzzEnterpriseServiceFacade.js";
import type { IComputationProtocol } from "../contracts/IComputationProtocol.js";
import type { IProtocolSession } from "../contracts/IProtocolSession.js";
import type { IProtocolPhaseFactory } from "../contracts/IProtocolPhaseFactory.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";

export abstract class AbstractBaseProtocolAwareEnterpriseServiceFacade implements IProtocolAwareEnterpriseServiceFacade {
  protected readonly delegate: IFizzBuzzEnterpriseServiceFacade;
  protected readonly protocol: IComputationProtocol;
  protected readonly sessionFactory: IProtocolPhaseFactory;
  protected protocolEnabled: boolean;

  constructor(
    delegate: IFizzBuzzEnterpriseServiceFacade,
    protocol: IComputationProtocol,
    sessionFactory: IProtocolPhaseFactory,
    protocolEnabled: boolean = true,
  ) {
    this.delegate = delegate;
    this.protocol = protocol;
    this.sessionFactory = sessionFactory;
    this.protocolEnabled = protocolEnabled;
  }

  abstract resolveEnterpriseValue(value: number): string;
  abstract calculateEnterpriseRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract createProtocolSession(): IProtocolSession;

  getProtocol(): IComputationProtocol {
    return this.protocol;
  }

  getProtocolSessionFactory(): IProtocolPhaseFactory {
    return this.sessionFactory;
  }

  isProtocolEnabled(): boolean {
    return this.protocolEnabled;
  }

  setProtocolEnabled(enabled: boolean): void {
    this.protocolEnabled = enabled;
  }

  protected handleProtocolExecution(
    value: number,
    request: IFizzBuzzComputationRequest,
  ): string {
    if (!this.protocolEnabled) {
      return this.delegate.resolveEnterpriseValue(value);
    }
    const session = this.createProtocolSession();
    const response = this.protocol.executeProtocol(request, session);
    return response.getComputedResult();
  }

  protected getFacadeFrameworkVersion(): string {
    return "2.0.0-PROTOCOL-ENABLED";
  }
}
