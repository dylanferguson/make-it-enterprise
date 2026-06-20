import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";

export interface IFizzBuzzComputationCommand {
  execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse;
  getCommandName(): string;
  getCommandVersion(): string;
  canExecute(input: number): boolean;
  getCommandGroup(): string;
}
