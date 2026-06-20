import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";

export abstract class AbstractBaseFizzBuzzComputationCommand implements IFizzBuzzComputationCommand {
  abstract execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse;
  abstract getCommandName(): string;
  abstract getCommandVersion(): string;
  abstract canExecute(input: number): boolean;
  abstract getCommandGroup(): string;

  protected validateRequest(request: IFizzBuzzComputationRequest): void {
    if (request === null || request === undefined) {
      throw new Error(`[${this.getCommandName()}] Request must not be null`);
    }
    if (!Number.isFinite(request.getRequestedValue())) {
      throw new Error(`[${this.getCommandName()}] Request value must be finite`);
    }
  }

  protected createCommandExecutionError(input: number, reason: string): Error {
    return new Error(
      `Command '${this.getCommandName()}' version '${this.getCommandVersion()}' execution failed for value ${input}: ${reason}`,
    );
  }
}
