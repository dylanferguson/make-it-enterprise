export interface IComputationEventStoreEntry {
  getEntryId(): string;
  getValue(): number;
  getResult(): string;
  getDurationMs(): number;
  getTimestamp(): Date;
  getEntryType(): string;
}

export interface IComputationEventStore {
  appendEvent(
    value: number,
    result: string,
    durationMs: number,
    entryType: string,
  ): IComputationEventStoreEntry;
  getEventsByValue(value: number): readonly IComputationEventStoreEntry[];
  getAllEvents(): readonly IComputationEventStoreEntry[];
  getEventsByType(entryType: string): readonly IComputationEventStoreEntry[];
  getEventCount(): number;
  replayEvents(handler: (entry: IComputationEventStoreEntry) => void): void;
  clearEvents(): void;
  getStoreName(): string;
  getStoreVersion(): string;
}
