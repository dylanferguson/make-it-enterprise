import { AbstractBaseEnterpriseRemainderComputationProtocolLayer } from "../../abstracts/AbstractBaseEnterpriseRemainderComputationProtocolLayer.js";
import type { IComputationProtocolContext } from "../../contracts/IComputationProtocolContext.js";

export class SessionLayerComputationProtocolImpl extends AbstractBaseEnterpriseRemainderComputationProtocolLayer {
  private static readonly LAYER_NUMBER = 5;
  private static readonly LAYER_IDENTIFIER = "SessionLayer";
  private static readonly LAYER_DESCRIPTION = "Session layer: manages computation session state and checkpointing";

  private readonly sessionStore: Map<string, number>;

  constructor(sessionStore?: Map<string, number>) {
    super();
    this.sessionStore = sessionStore ?? new Map();
  }

  override getLayerIdentifier(): string {
    return SessionLayerComputationProtocolImpl.LAYER_IDENTIFIER;
  }

  override getLayerNumber(): number {
    return SessionLayerComputationProtocolImpl.LAYER_NUMBER;
  }

  override getLayerDescription(): string {
    return SessionLayerComputationProtocolImpl.LAYER_DESCRIPTION;
  }

  override processLayer(dividend: number, divisor: number, context: IComputationProtocolContext): number {
    return this.templateMethodProcessLayer(dividend, divisor, context);
  }

  protected override preProcessLayer(
    dividend: number,
    divisor: number,
    context: IComputationProtocolContext,
  ): void {
    const sessionKey = `${dividend}:${divisor}`;
    const cachedResult = this.sessionStore.get(sessionKey);
    if (cachedResult !== undefined) {
      context.setAttribute("sessionLayer.cacheHit", true);
      context.setAttribute("sessionLayer.sessionKey", sessionKey);
      context.setAttribute("sessionLayer.cachedResult", cachedResult);
    } else {
      context.setAttribute("sessionLayer.cacheHit", false);
      context.setAttribute("sessionLayer.sessionKey", sessionKey);
    }
  }

  protected override executeLayerComputation(
    dividend: number,
    divisor: number,
    context: IComputationProtocolContext,
  ): number {
    const sessionKey = `${dividend}:${divisor}`;
    const cachedResult = this.sessionStore.get(sessionKey);
    if (cachedResult !== undefined) {
      return cachedResult;
    }
    const result = this.proceedToNextLayer(dividend, divisor, context);
    this.sessionStore.set(sessionKey, result);
    return result;
  }

  clearSessionStore(): void {
    this.sessionStore.clear();
  }

  getSessionStoreSize(): number {
    return this.sessionStore.size;
  }
}
