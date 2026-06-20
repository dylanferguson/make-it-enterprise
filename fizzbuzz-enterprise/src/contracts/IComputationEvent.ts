export interface IComputationEvent {
  getEventType(): string;
  getEventTimestamp(): number;
  getEventSequenceNumber(): number;
  getSourceIdentifier(): string;
  getEventPayload(): Record<string, unknown>;
}
