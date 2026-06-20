import { AbstractBaseFizzBuzzCommandHistoryManager } from "../../abstracts/AbstractBaseFizzBuzzCommandHistoryManager.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzCommandHistoryEntry } from "../../contracts/IFizzBuzzCommandHistoryManager.js";
import { FizzBuzzCommandHistoryEntryImpl } from "./FizzBuzzCommandHistoryEntryImpl.js";

export class FizzBuzzCommandHistoryManagerImpl extends AbstractBaseFizzBuzzCommandHistoryManager {
  private static readonly HISTORY_MANAGER_NAME = "FizzBuzzCommandHistoryManager";
  private static readonly HISTORY_MANAGER_VERSION = "1.0.0-HISTORY";

  private readonly historyEntries: IFizzBuzzCommandHistoryEntry[] = [];

  override recordExecution(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse,
    durationMs: number,
  ): IFizzBuzzCommandHistoryEntry {
    const entry = new FizzBuzzCommandHistoryEntryImpl(
      this.generateHistoryEntryId(),
      command,
      request,
      response,
      Date.now(),
      durationMs,
    );
    this.historyEntries.push(entry);
    this.logHistoryOperation("RECORD", `Entry [${entry.getHistoryEntryId()}] for value ${request.getRequestedValue()}`);
    return entry;
  }

  override getHistory(): readonly IFizzBuzzCommandHistoryEntry[] {
    return [...this.historyEntries];
  }

  override getHistoryByCommandGroup(group: string): readonly IFizzBuzzCommandHistoryEntry[] {
    return this.historyEntries.filter((entry) => entry.getCommand().getCommandGroup() === group);
  }

  override clearHistory(): void {
    const count = this.historyEntries.length;
    this.historyEntries.length = 0;
    this.logHistoryOperation("CLEAR", `Cleared ${count} history entries`);
  }

  override getHistoryManagerName(): string {
    return FizzBuzzCommandHistoryManagerImpl.HISTORY_MANAGER_NAME;
  }

  override getHistoryManagerVersion(): string {
    return FizzBuzzCommandHistoryManagerImpl.HISTORY_MANAGER_VERSION;
  }

  override getTotalRecordedExecutions(): number {
    return this.historyEntries.length;
  }
}
