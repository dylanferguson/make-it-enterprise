import { AbstractBaseFizzBuzzComputationCommand } from "../../abstracts/AbstractBaseFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzServiceDelegate } from "../../contracts/IFizzBuzzServiceDelegate.js";
import { FizzBuzzComputationRequestImpl } from "../dto/FizzBuzzComputationRequestImpl.js";

export class FizzBuzzRangeResolutionCommandImpl extends AbstractBaseFizzBuzzComputationCommand {
  private static readonly COMMAND_NAME = "FizzBuzzRangeResolutionCommand";
  private static readonly COMMAND_VERSION = "1.0.0-COMMAND";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_RANGE_RESOLUTION";

  private readonly delegate: IFizzBuzzServiceDelegate;
  private readonly delegateJndiName: string;

  constructor(delegate: IFizzBuzzServiceDelegate, delegateJndiName: string) {
    super();
    this.delegate = delegate;
    this.delegateJndiName = delegateJndiName;
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    this.validateRequest(request);
    const requestedValue = request.getRequestedValue();
    const endRequest = new FizzBuzzComputationRequestImpl(
      requestedValue,
      `range:end:${request.getRequestId()}`,
      request.getRequestOrigin(),
    );
    const responses = this.delegate.delegateRangeComputation(request, endRequest);
    const lastResponse = responses[responses.length - 1];
    if (lastResponse === undefined) {
      throw this.createCommandExecutionError(requestedValue, "No responses produced by range computation");
    }
    return lastResponse;
  }

  override getCommandName(): string {
    return FizzBuzzRangeResolutionCommandImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return FizzBuzzRangeResolutionCommandImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return FizzBuzzRangeResolutionCommandImpl.COMMAND_GROUP;
  }

  getDelegate(): IFizzBuzzServiceDelegate {
    return this.delegate;
  }

  getDelegateJndiName(): string {
    return this.delegateJndiName;
  }
}
