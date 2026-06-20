import { AbstractBaseComputationProtocolContext } from "../../abstracts/AbstractBaseComputationProtocolContext.js";
import { randomUUID } from "node:crypto";

export class StandardComputationProtocolContextImpl extends AbstractBaseComputationProtocolContext {
  private static readonly CONTEXT_VERSION = "1.0.0-PROTOCOL-CONTEXT";

  constructor(dividend: number, divisor: number) {
    const contextId = randomUUID();
    const correlationId = `modulo:${dividend}:${divisor}:${Date.now()}`;
    super(contextId, correlationId);
    this.setAttribute("computation.dividend", dividend);
    this.setAttribute("computation.divisor", divisor);
    this.setAttribute("computation.contextVersion", StandardComputationProtocolContextImpl.CONTEXT_VERSION);
  }

  getContextVersion(): string {
    return StandardComputationProtocolContextImpl.CONTEXT_VERSION;
  }
}
