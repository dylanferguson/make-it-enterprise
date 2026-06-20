import type { IEnterpriseOrchestrationMediationHandler, IEnterpriseOrchestrationMediationService } from "../contracts/IEnterpriseOrchestrationMediationService.js";
import { AuditingOrchestrationMediationHandlerImpl } from "./AuditingOrchestrationMediationHandlerImpl.js";
import { PerformanceMonitoringOrchestrationMediationHandlerImpl } from "./PerformanceMonitoringOrchestrationMediationHandlerImpl.js";
import { ValidationOrchestrationMediationHandlerImpl } from "./ValidationOrchestrationMediationHandlerImpl.js";
import { MetricCollectionOrchestrationMediationHandlerImpl } from "./MetricCollectionOrchestrationMediationHandlerImpl.js";

export class FizzBuzzEnterpriseOrchestrationMediationServiceImpl implements IEnterpriseOrchestrationMediationService {
  private static readonly SERVICE_NAME = "FizzBuzzEnterpriseOrchestrationMediationServiceImpl";
  private static readonly SERVICE_VERSION = "1.0.0-MEDIATION-SERVICE";

  private readonly handlers: IEnterpriseOrchestrationMediationHandler[];
  private mediationEnabled: boolean;

  constructor(mediationEnabled: boolean = true) {
    this.mediationEnabled = mediationEnabled;
    this.handlers = [];
    this.initializeDefaultHandlers();
  }

  private initializeDefaultHandlers(): void {
    const sortedHandlers = [
      new AuditingOrchestrationMediationHandlerImpl(),
      new PerformanceMonitoringOrchestrationMediationHandlerImpl(),
      new ValidationOrchestrationMediationHandlerImpl(),
      new MetricCollectionOrchestrationMediationHandlerImpl(),
    ].sort((a, b) => a.getHandlerPriority() - b.getHandlerPriority());

    for (let i = 0; i < sortedHandlers.length - 1; i++) {
      (sortedHandlers[i] as any).setNextHandler(sortedHandlers[i + 1]);
    }

    this.handlers.push(...sortedHandlers);
  }

  private getChainHead(): IEnterpriseOrchestrationMediationHandler | null {
    const enabled = this.handlers.filter(h => h.isHandlerEnabled());
    return enabled.length > 0 ? enabled[0] ?? null : null;
  }

  mediateValueResolution(value: number, innerResolver: (v: number) => string): string {
    if (!this.mediationEnabled) {
      return innerResolver(value);
    }
    const chainHead = this.getChainHead();
    if (chainHead !== null) {
      return chainHead.handle(value, innerResolver);
    }
    return innerResolver(value);
  }

  mediateRangeResolution(
    start: number,
    end: number,
    innerResolver: (start: number, end: number) => readonly string[],
  ): readonly string[] {
    if (!this.mediationEnabled) {
      return innerResolver(start, end);
    }
    const results = innerResolver(start, end);
    const metricHandler = this.handlers.find(
      h => h instanceof MetricCollectionOrchestrationMediationHandlerImpl,
    ) as MetricCollectionOrchestrationMediationHandlerImpl | undefined;
    if (metricHandler !== undefined) {
      metricHandler.logMetricsSummary();
    }
    return results;
  }

  registerHandler(handler: IEnterpriseOrchestrationMediationHandler): void {
    this.handlers.push(handler);
    this.handlers.sort((a, b) => a.getHandlerPriority() - b.getHandlerPriority());
    for (let i = 0; i < this.handlers.length - 1; i++) {
      (this.handlers[i] as any).setNextHandler(this.handlers[i + 1]);
    }
    (this.handlers[this.handlers.length - 1] as any).setNextHandler(null);
  }

  getServiceName(): string { return FizzBuzzEnterpriseOrchestrationMediationServiceImpl.SERVICE_NAME; }
  getServiceVersion(): string { return FizzBuzzEnterpriseOrchestrationMediationServiceImpl.SERVICE_VERSION; }
  getActiveHandlerChainDescriptor(): string {
    return this.handlers
      .filter(h => h.isHandlerEnabled())
      .map(h => `${h.getHandlerName()}@${h.getHandlerPriority()}`)
      .join(" -> ");
  }
  getRegisteredHandlerCount(): number { return this.handlers.length; }
  isMediationEnabled(): boolean { return this.mediationEnabled; }
  setMediationEnabled(enabled: boolean): void { this.mediationEnabled = enabled; }
}
