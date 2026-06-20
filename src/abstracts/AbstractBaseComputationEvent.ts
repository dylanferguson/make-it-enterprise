import type { IComputationEvent } from "../contracts/IComputationEvent.js";

export abstract class AbstractBaseComputationEvent implements IComputationEvent {
  private static globalSequenceCounter: number = 0;

  private readonly eventType: string;
  private readonly eventTimestamp: number;
  private readonly eventSequenceNumber: number;
  private readonly sourceIdentifier: string;
  private readonly eventPayload: Record<string, unknown>;

  constructor(
    eventType: string,
    sourceIdentifier: string,
    payload: Record<string, unknown> = {},
  ) {
    this.eventType = eventType;
    this.eventTimestamp = Date.now();
    this.eventSequenceNumber = AbstractBaseComputationEvent.generateSequenceNumber();
    this.sourceIdentifier = sourceIdentifier;
    this.eventPayload = { ...payload };
  }

  getEventType(): string {
    return this.eventType;
  }

  getEventTimestamp(): number {
    return this.eventTimestamp;
  }

  getEventSequenceNumber(): number {
    return this.eventSequenceNumber;
  }

  getSourceIdentifier(): string {
    return this.sourceIdentifier;
  }

  getEventPayload(): Record<string, unknown> {
    return { ...this.eventPayload };
  }

  private static generateSequenceNumber(): number {
    return ++AbstractBaseComputationEvent.globalSequenceCounter;
  }

  abstract getComputationEventName(): string;
}
