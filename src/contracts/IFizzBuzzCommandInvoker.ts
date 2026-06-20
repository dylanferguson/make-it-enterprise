import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";

export interface IFizzBuzzCommandInvoker {
  invokeCommand(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
  ): IFizzBuzzComputationResponse;
  getInvokerName(): string;
  getInvokerVersion(): string;
  getTotalCommandsInvoked(): number;
}
