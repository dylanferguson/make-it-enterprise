import { AbstractBaseComputationEventStore } from "../../abstracts/AbstractBaseComputationEventStore.js";
import type { IComputationEventStoreEntry } from "../../contracts/IComputationEventStore.js";

class ComputationEventStoreEntryImpl implements IComputationEventStoreEntry {
  private readonly entryId: string;
  private readonly value: number;
  private readonly result: string;
  private readonly durationMs: number;
  private readonly timestamp: Date;
  private readonly entryType: string;

  constructor(
    entryId: string,
    value: number,
    result: string,
    durationMs: number,
    entryType: string,
  ) {
    this.entryId = entryId;
    this.value = value;
    this.result = result;
    this.durationMs = durationMs;
    this.timestamp = new Date();
    this.entryType = entryType;
  }

  getEntryId(): string {
    return this.entryId;
  }

  getValue(): number {
    return this.value;
  }

  getResult(): string {
    return this.result;
  }

  getDurationMs(): number {
    return this.durationMs;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }

  getEntryType(): string {
    return this.entryType;
  }
}

export class InMemoryComputationEventStoreImpl extends AbstractBaseComputationEventStore {
  private static readonly STORE_NAME = "InMemoryComputationEventStore";
  private static readonly STORE_VERSION = "1.0.0-EVENT-STORE";

  override getStoreName(): string {
    return InMemoryComputationEventStoreImpl.STORE_NAME;
  }

  override getStoreVersion(): string {
    return InMemoryComputationEventStoreImpl.STORE_VERSION;
  }

  protected override createEntry(
    value: number,
    result: string,
    durationMs: number,
    entryType: string,
  ): IComputationEventStoreEntry {
    return new ComputationEventStoreEntryImpl(
      this.generateEntryId(),
      value,
      result,
      durationMs,
      entryType,
    );
  }
}
