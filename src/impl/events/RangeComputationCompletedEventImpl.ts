import { AbstractBaseComputationEvent } from "../../abstracts/AbstractBaseComputationEvent.js";

export class RangeComputationCompletedEventImpl extends AbstractBaseComputationEvent {
  private static readonly EVENT_TYPE = "RANGE_COMPUTATION_COMPLETED";
  private static readonly EVENT_NAME = "RangeComputationCompletedEvent";

  constructor(
    sourceIdentifier: string,
    rangeStart: number,
    rangeEnd: number,
    resultCount: number,
    totalDurationMs: number,
  ) {
    super(
      RangeComputationCompletedEventImpl.EVENT_TYPE,
      sourceIdentifier,
      {
        rangeStart,
        rangeEnd,
        resultCount,
        totalDurationMs,
      },
    );
  }

  getRangeStart(): number {
    return this.getEventPayload()["rangeStart"] as number;
  }

  getRangeEnd(): number {
    return this.getEventPayload()["rangeEnd"] as number;
  }

  getResultCount(): number {
    return this.getEventPayload()["resultCount"] as number;
  }

  getTotalDurationMs(): number {
    return this.getEventPayload()["totalDurationMs"] as number;
  }

  override getComputationEventName(): string {
    return RangeComputationCompletedEventImpl.EVENT_NAME;
  }
}
