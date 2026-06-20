import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";

export interface IFizzBuzzCommandHistoryEntry {
  getHistoryEntryId(): string;
  getCommand(): IFizzBuzzComputationCommand;
  getRequest(): IFizzBuzzComputationRequest;
  getResponse(): IFizzBuzzComputationResponse;
  getExecutionTimestamp(): number;
  getExecutionDurationMs(): number;
}

export interface IFizzBuzzCommandHistoryManager {
  recordExecution(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse,
    durationMs: number,
  ): IFizzBuzzCommandHistoryEntry;
  getHistory(): readonly IFizzBuzzCommandHistoryEntry[];
  getHistoryByCommandGroup(group: string): readonly IFizzBuzzCommandHistoryEntry[];
  clearHistory(): void;
  getHistoryManagerName(): string;
  getHistoryManagerVersion(): string;
  getTotalRecordedExecutions(): number;
}
