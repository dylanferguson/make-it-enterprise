import type { IModuloRemainderComputationChainOfResponsibilityHandler } from "../../contracts/index.js";
import { AbstractBaseModuloRemainderComputationChainHandler } from "../../abstracts/AbstractBaseModuloRemainderComputationChainHandler.js";

export class SlaMonitoringModuloRemainderComputationChainHandlerImpl
  extends AbstractBaseModuloRemainderComputationChainHandler
{
  private static readonly HANDLER_NAME = "SlaMonitoringModuloRemainderComputationChainHandler";
  private static readonly HANDLER_VERSION = "1.0.0-SLA-MONITORING";

  private static readonly SLA_THRESHOLD_MS = 1000;
  private static readonly COMPUTATION_MAX_RETRY = 0;

  private computationCount: number;
  private totalDurationMs: number;
  private slaBreachCount: number;

  constructor() {
    super(
      SlaMonitoringModuloRemainderComputationChainHandlerImpl.HANDLER_NAME,
      SlaMonitoringModuloRemainderComputationChainHandlerImpl.HANDLER_VERSION,
    );
    this.computationCount = 0;
    this.totalDurationMs = 0;
    this.slaBreachCount = 0;
  }

  evaluateRemainder(
    value: number,
    divisor: number,
    next: (v: number, d: number) => number,
  ): number {
    const startTime = Date.now();
    let result: number;
    if (this.nextHandler !== null) {
      result = this.nextHandler.evaluateRemainder(value, divisor, next);
    } else {
      result = next(value, divisor);
    }
    const durationMs = Date.now() - startTime;
    this.computationCount++;
    this.totalDurationMs += durationMs;
    if (durationMs > SlaMonitoringModuloRemainderComputationChainHandlerImpl.SLA_THRESHOLD_MS) {
      this.slaBreachCount++;
    }
    return result;
  }

  getComputationCount(): number {
    return this.computationCount;
  }

  getAverageDurationMs(): number {
    if (this.computationCount === 0) return 0;
    return this.totalDurationMs / this.computationCount;
  }

  getSlaBreachCount(): number {
    return this.slaBreachCount;
  }
}
