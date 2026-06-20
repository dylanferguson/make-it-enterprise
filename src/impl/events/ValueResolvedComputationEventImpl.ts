import { AbstractBaseComputationEvent } from "../../abstracts/AbstractBaseComputationEvent.js";

export class ValueResolvedComputationEventImpl extends AbstractBaseComputationEvent {
  private static readonly EVENT_TYPE = "VALUE_RESOLVED";
  private static readonly EVENT_NAME = "ValueResolvedComputationEvent";

  constructor(
    sourceIdentifier: string,
    inputValue: number,
    resolvedResult: string,
    resolutionDurationMs: number,
  ) {
    super(
      ValueResolvedComputationEventImpl.EVENT_TYPE,
      sourceIdentifier,
      {
        inputValue,
        resolvedResult,
        resolutionDurationMs,
      },
    );
  }

  getInputValue(): number {
    return this.getEventPayload()["inputValue"] as number;
  }

  getResolvedResult(): string {
    return this.getEventPayload()["resolvedResult"] as string;
  }

  getResolutionDurationMs(): number {
    return this.getEventPayload()["resolutionDurationMs"] as number;
  }

  override getComputationEventName(): string {
    return ValueResolvedComputationEventImpl.EVENT_NAME;
  }
}
