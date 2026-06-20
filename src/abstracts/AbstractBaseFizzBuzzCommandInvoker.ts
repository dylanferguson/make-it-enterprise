import type { IFizzBuzzCommandInvoker } from "../contracts/IFizzBuzzCommandInvoker.js";
import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";

export abstract class AbstractBaseFizzBuzzCommandInvoker implements IFizzBuzzCommandInvoker {
  abstract invokeCommand(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
  ): IFizzBuzzComputationResponse;
  abstract getInvokerName(): string;
  abstract getInvokerVersion(): string;
  abstract getTotalCommandsInvoked(): number;

  protected preInvocationLog(command: IFizzBuzzComputationCommand, request: IFizzBuzzComputationRequest): void {
    console.debug(
      `[${this.getInvokerName()}] Invoking command [${command.getCommandName()} v${command.getCommandVersion()}] for value ${request.getRequestedValue()}`,
    );
  }

  protected postInvocationLog(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse,
    durationMs: number,
  ): void {
    console.debug(
      `[${this.getInvokerName()}] Command [${command.getCommandName()}] completed in ${durationMs.toFixed(3)}ms for value ${request.getRequestedValue()}`,
    );
  }

  protected validateCommand(command: IFizzBuzzComputationCommand, request: IFizzBuzzComputationRequest): void {
    if (command === null || command === undefined) {
      throw new Error(`[${this.getInvokerName()}] Command must not be null`);
    }
    if (!command.canExecute(request.getRequestedValue())) {
      throw new Error(
        `[${this.getInvokerName()}] Command [${command.getCommandName()}] cannot execute for value ${request.getRequestedValue()}`,
      );
    }
  }
}
