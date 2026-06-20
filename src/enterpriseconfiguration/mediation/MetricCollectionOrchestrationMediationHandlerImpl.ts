import { AbstractBaseOrchestrationMediationHandlerImpl } from "./AbstractBaseOrchestrationMediationHandlerImpl.js";

export interface IMetricCollectionSnapshot {
  totalValuesProcessed: number;
  fizzCount: number;
  buzzCount: number;
  fizzBuzzCount: number;
  numberCount: number;
}

export class MetricCollectionOrchestrationMediationHandlerImpl extends AbstractBaseOrchestrationMediationHandlerImpl {
  private totalValuesProcessed: number = 0;
  private fizzCount: number = 0;
  private buzzCount: number = 0;
  private fizzBuzzCount: number = 0;
  private numberCount: number = 0;

  constructor() {
    super("MetricCollectionOrchestrationMediationHandlerImpl", "1.0.0-METRIC-HANDLER", 400, true);
  }

  handle(value: number, next: (v: number) => string): string {
    const result = this.handleNext(value, next);
    this.totalValuesProcessed++;
    if (result === "FizzBuzz") {
      this.fizzBuzzCount++;
    } else if (result === "Fizz") {
      this.fizzCount++;
    } else if (result === "Buzz") {
      this.buzzCount++;
    } else {
      this.numberCount++;
    }
    return result;
  }

  getSnapshot(): IMetricCollectionSnapshot {
    return {
      totalValuesProcessed: this.totalValuesProcessed,
      fizzCount: this.fizzCount,
      buzzCount: this.buzzCount,
      fizzBuzzCount: this.fizzBuzzCount,
      numberCount: this.numberCount,
    };
  }

  logMetricsSummary(): void {
    const snap = this.getSnapshot();
    console.debug(
      `[MetricCollectionOrchestrationMediationHandler v${this.getHandlerVersion()}] ` +
      `Metrics summary: total=[${snap.totalValuesProcessed}], ` +
      `fizz=[${snap.fizzCount}], buzz=[${snap.buzzCount}], ` +
      `fizzBuzz=[${snap.fizzBuzzCount}], number=[${snap.numberCount}]`,
    );
  }
}
