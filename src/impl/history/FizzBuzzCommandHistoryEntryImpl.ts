import type { IFizzBuzzCommandHistoryEntry } from "../../contracts/IFizzBuzzCommandHistoryManager.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";

export class FizzBuzzCommandHistoryEntryImpl implements IFizzBuzzCommandHistoryEntry {
  private readonly historyEntryId: string;
  private readonly command: IFizzBuzzComputationCommand;
  private readonly request: IFizzBuzzComputationRequest;
  private readonly response: IFizzBuzzComputationResponse;
  private readonly executionTimestamp: number;
  private readonly executionDurationMs: number;

  constructor(
    historyEntryId: string,
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse,
    executionTimestamp: number,
    executionDurationMs: number,
  ) {
    this.historyEntryId = historyEntryId;
    this.command = command;
    this.request = request;
    this.response = response;
    this.executionTimestamp = executionTimestamp;
    this.executionDurationMs = executionDurationMs;
  }

  getHistoryEntryId(): string {
    return this.historyEntryId;
  }

  getCommand(): IFizzBuzzComputationCommand {
    return this.command;
  }

  getRequest(): IFizzBuzzComputationRequest {
    return this.request;
  }

  getResponse(): IFizzBuzzComputationResponse {
    return this.response;
  }

  getExecutionTimestamp(): number {
    return this.executionTimestamp;
  }

  getExecutionDurationMs(): number {
    return this.executionDurationMs;
  }
}
