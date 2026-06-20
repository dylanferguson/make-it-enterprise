import type { IFizzBuzzComputationCommandDecorator } from "../contracts/IFizzBuzzComputationCommandDecorator.js";
import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";

export abstract class AbstractBaseFizzBuzzComputationCommandDecorator implements IFizzBuzzComputationCommandDecorator {
  protected readonly wrappedCommand: IFizzBuzzComputationCommand;

  constructor(wrappedCommand: IFizzBuzzComputationCommand) {
    this.wrappedCommand = wrappedCommand;
  }

  abstract execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse;
  abstract getCommandName(): string;
  abstract getCommandVersion(): string;
  abstract canExecute(input: number): boolean;
  abstract getCommandGroup(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;

  getWrappedCommand(): IFizzBuzzComputationCommand {
    return this.wrappedCommand;
  }
}
