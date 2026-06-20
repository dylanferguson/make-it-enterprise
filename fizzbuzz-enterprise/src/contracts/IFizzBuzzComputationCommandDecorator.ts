import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";

export interface IFizzBuzzComputationCommandDecorator extends IFizzBuzzComputationCommand {
  getWrappedCommand(): IFizzBuzzComputationCommand;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
}
