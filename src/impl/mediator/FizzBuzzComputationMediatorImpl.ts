import { AbstractBaseFizzBuzzComputationMediator } from "../../abstracts/AbstractBaseFizzBuzzComputationMediator.js";
import type { IFizzBuzzComputationBridge } from "../../contracts/IFizzBuzzComputationBridge.js";
import type { IComputationEventNotificationBus } from "../../contracts/IComputationEventNotificationBus.js";
import type { IFizzBuzzSessionManager } from "../../contracts/IFizzBuzzSessionManager.js";
import type { ITransactionManager } from "../../contracts/ITransactionManager.js";
import type { ISloMetricsCollector } from "../../contracts/ISloMetricsCollector.js";
import type { IFizzBuzzComputationMemento } from "../../contracts/IFizzBuzzComputationMemento.js";
import { FizzBuzzComputationMementoImpl } from "../memento/FizzBuzzComputationMementoImpl.js";
import { ValueResolvedComputationEventImpl } from "../events/ValueResolvedComputationEventImpl.js";
import { RangeComputationCompletedEventImpl } from "../events/RangeComputationCompletedEventImpl.js";

export class FizzBuzzComputationMediatorImpl extends AbstractBaseFizzBuzzComputationMediator {
  private static readonly MEDIATOR_NAME = "FizzBuzzComputationMediator";
  private static readonly MEDIATOR_VERSION = "1.0.0-ENTERPRISE";
  private static readonly EVENT_SOURCE = "FizzBuzzComputationMediator";

  constructor(
    bridge: IFizzBuzzComputationBridge,
    eventBus: IComputationEventNotificationBus,
    sessionManager: IFizzBuzzSessionManager,
    transactionManager: ITransactionManager,
    sloMetricsCollector: ISloMetricsCollector,
  ) {
    super(bridge, eventBus, sessionManager, transactionManager, sloMetricsCollector);
  }

  override getMediatorName(): string {
    return FizzBuzzComputationMediatorImpl.MEDIATOR_NAME;
  }

  override getMediatorVersion(): string {
    return FizzBuzzComputationMediatorImpl.MEDIATOR_VERSION;
  }

  override mediateValueResolution(value: number): string {
    const startTime = performance.now();
    const result = this.bridge.resolveValue(value);
    const durationMs = performance.now() - startTime;
    this.recordSloMetric("mediateValueResolution", durationMs, true);

    const event = new ValueResolvedComputationEventImpl(
      FizzBuzzComputationMediatorImpl.EVENT_SOURCE,
      value,
      result,
      durationMs,
    );
    this.eventBus.publishEvent(event);

    const memento = this.createMemento(value, result);
    this.recordMemento(memento);

    return result;
  }

  override mediateRangeCalculation(start: number, end: number): readonly string[] {
    const rangeStartTime = performance.now();
    const results = this.bridge.calculateRange(start, end);
    const totalDurationMs = performance.now() - rangeStartTime;
    this.recordSloMetric("mediateRangeCalculation", totalDurationMs, true);

    const rangeEvent = new RangeComputationCompletedEventImpl(
      FizzBuzzComputationMediatorImpl.EVENT_SOURCE,
      start,
      end,
      results.length,
      totalDurationMs,
    );
    this.eventBus.publishEvent(rangeEvent);

    for (let i = 0; i < results.length; i++) {
      const memento = this.createMemento(start + i, results[i]!);
      this.recordMemento(memento);
    }

    return results;
  }

  override createMemento(value: number, result: string): IFizzBuzzComputationMemento {
    return new FizzBuzzComputationMementoImpl(
      `memento-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      value,
      result,
    );
  }

  override restoreFromMemento(memento: IFizzBuzzComputationMemento): { value: number; result: string } {
    return {
      value: memento.getCapturedValue(),
      result: memento.getCapturedResult(),
    };
  }
}
