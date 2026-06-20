import { AbstractBaseProtocolAwareEnterpriseServiceFacade } from "../../abstracts/AbstractBaseProtocolAwareEnterpriseServiceFacade.js";
import type { IFizzBuzzEnterpriseServiceFacade } from "../../contracts/IFizzBuzzEnterpriseServiceFacade.js";
import type { IComputationProtocol } from "../../contracts/IComputationProtocol.js";
import type { IProtocolSession } from "../../contracts/IProtocolSession.js";
import type { IProtocolPhaseFactory } from "../../contracts/IProtocolPhaseFactory.js";
import { FizzBuzzComputationRequestImpl } from "../dto/FizzBuzzComputationRequestImpl.js";
import { ProtocolSessionImpl } from "./ProtocolSessionImpl.js";

export class ProtocolAwareEnterpriseServiceFacadeImpl extends AbstractBaseProtocolAwareEnterpriseServiceFacade {
  private static readonly FACADE_NAME = "ProtocolAwareEnterpriseServiceFacade";
  private static readonly FACADE_VERSION = "1.0.0-PROTOCOL-FACADE";
  private static readonly PROTOCOL_REQUEST_ORIGIN = "ProtocolAwareEnterpriseServiceFacade";

  constructor(
    delegate: IFizzBuzzEnterpriseServiceFacade,
    protocol: IComputationProtocol,
    sessionFactory: IProtocolPhaseFactory,
    protocolEnabled: boolean = true,
  ) {
    super(delegate, protocol, sessionFactory, protocolEnabled);
  }

  override resolveEnterpriseValue(value: number): string {
    this.validateFacadeValue(value);

    const request = new FizzBuzzComputationRequestImpl(
      value,
      `proto:req:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
      ProtocolAwareEnterpriseServiceFacadeImpl.PROTOCOL_REQUEST_ORIGIN,
    );
    request.setComputationContext("PROTOCOL_EXECUTION");

    return this.handleProtocolExecution(value, request);
  }

  override calculateEnterpriseRange(start: number, end: number): readonly string[] {
    this.validateFacadeValue(start);
    this.validateFacadeValue(end);

    if (!this.protocolEnabled) {
      return this.delegate.calculateEnterpriseRange(start, end);
    }

    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      const request = new FizzBuzzComputationRequestImpl(
        i,
        `proto:range:${start}:${end}:${i}:${Date.now()}`,
        ProtocolAwareEnterpriseServiceFacadeImpl.PROTOCOL_REQUEST_ORIGIN,
      );
      request.setComputationContext("PROTOCOL_EXECUTION_RANGE");
      results.push(this.handleProtocolExecution(i, request));
    }
    return results;
  }

  override getFacadeName(): string {
    return ProtocolAwareEnterpriseServiceFacadeImpl.FACADE_NAME;
  }

  override getFacadeVersion(): string {
    return ProtocolAwareEnterpriseServiceFacadeImpl.FACADE_VERSION;
  }

  override createProtocolSession(): IProtocolSession {
    return new ProtocolSessionImpl();
  }

  private validateFacadeValue(value: number): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `[${ProtocolAwareEnterpriseServiceFacadeImpl.FACADE_NAME}] Invalid facade value: ${value}`,
      );
    }
  }
}
