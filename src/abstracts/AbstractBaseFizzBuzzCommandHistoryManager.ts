import type { IFizzBuzzCommandHistoryEntry, IFizzBuzzCommandHistoryManager } from "../contracts/IFizzBuzzCommandHistoryManager.js";
import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";

export abstract class AbstractBaseFizzBuzzCommandHistoryManager implements IFizzBuzzCommandHistoryManager {
  abstract recordExecution(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse,
    durationMs: number,
  ): IFizzBuzzCommandHistoryEntry;
  abstract getHistory(): readonly IFizzBuzzCommandHistoryEntry[];
  abstract getHistoryByCommandGroup(group: string): readonly IFizzBuzzCommandHistoryEntry[];
  abstract clearHistory(): void;
  abstract getHistoryManagerName(): string;
  abstract getHistoryManagerVersion(): string;
  abstract getTotalRecordedExecutions(): number;

  protected generateHistoryEntryId(): string {
    return `cmd:hist:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }

  protected logHistoryOperation(operation: string, detail: string): void {
    console.debug(`[${this.getHistoryManagerName()}] History operation [${operation}]: ${detail}`);
  }
}
