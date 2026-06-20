import type {
  IComputationEventStore,
  IComputationEventStoreEntry,
} from "../contracts/IComputationEventStore.js";

export abstract class AbstractBaseComputationEventStore
  implements IComputationEventStore
{
  protected readonly eventStore: IComputationEventStoreEntry[] = [];
  private entryCounter: number = 0;

  abstract getStoreName(): string;
  abstract getStoreVersion(): string;

  appendEvent(
    value: number,
    result: string,
    durationMs: number,
    entryType: string,
  ): IComputationEventStoreEntry {
    const entry = this.createEntry(value, result, durationMs, entryType);
    this.eventStore.push(entry);
    return entry;
  }

  getEventsByValue(value: number): readonly IComputationEventStoreEntry[] {
    return this.eventStore.filter((entry) => entry.getValue() === value);
  }

  getAllEvents(): readonly IComputationEventStoreEntry[] {
    return [...this.eventStore];
  }

  getEventsByType(entryType: string): readonly IComputationEventStoreEntry[] {
    return this.eventStore.filter((entry) => entry.getEntryType() === entryType);
  }

  getEventCount(): number {
    return this.eventStore.length;
  }

  replayEvents(handler: (entry: IComputationEventStoreEntry) => void): void {
    for (const entry of this.eventStore) {
      handler(entry);
    }
  }

  clearEvents(): void {
    this.eventStore.length = 0;
    this.entryCounter = 0;
  }

  protected generateEntryId(): string {
    this.entryCounter++;
    return `evt:${this.getStoreName()}:${Date.now()}:${this.entryCounter}`;
  }

  protected abstract createEntry(
    value: number,
    result: string,
    durationMs: number,
    entryType: string,
  ): IComputationEventStoreEntry;
}
