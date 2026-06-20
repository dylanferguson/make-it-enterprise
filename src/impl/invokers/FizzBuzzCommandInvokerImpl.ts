import { AbstractBaseFizzBuzzCommandInvoker } from "../../abstracts/AbstractBaseFizzBuzzCommandInvoker.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzCommandHistoryManager } from "../../contracts/IFizzBuzzCommandHistoryManager.js";

export class FizzBuzzCommandInvokerImpl extends AbstractBaseFizzBuzzCommandInvoker {
  private static readonly INVOKER_NAME = "FizzBuzzCommandInvoker";
  private static readonly INVOKER_VERSION = "1.0.0-INVOKER";

  private readonly historyManager: IFizzBuzzCommandHistoryManager | null;
  private totalCommandsInvoked: number = 0;

  constructor(historyManager: IFizzBuzzCommandHistoryManager | null = null) {
    super();
    this.historyManager = historyManager;
  }

  override invokeCommand(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
  ): IFizzBuzzComputationResponse {
    this.validateCommand(command, request);
    this.preInvocationLog(command, request);

    const startTime = performance.now();
    const response = command.execute(request);
    const durationMs = performance.now() - startTime;

    this.totalCommandsInvoked++;
    this.postInvocationLog(command, request, response, durationMs);

    if (this.historyManager !== null) {
      this.historyManager.recordExecution(command, request, response, durationMs);
    }

    return response;
  }

  override getInvokerName(): string {
    return FizzBuzzCommandInvokerImpl.INVOKER_NAME;
  }

  override getInvokerVersion(): string {
    return FizzBuzzCommandInvokerImpl.INVOKER_VERSION;
  }

  override getTotalCommandsInvoked(): number {
    return this.totalCommandsInvoked;
  }

  getHistoryManager(): IFizzBuzzCommandHistoryManager | null {
    return this.historyManager;
  }
}
