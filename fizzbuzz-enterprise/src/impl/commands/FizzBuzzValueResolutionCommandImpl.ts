import { AbstractBaseFizzBuzzComputationCommand } from "../../abstracts/AbstractBaseFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzServiceDelegate } from "../../contracts/IFizzBuzzServiceDelegate.js";
import { FizzBuzzComputationRequestImpl } from "../dto/FizzBuzzComputationRequestImpl.js";

export class FizzBuzzValueResolutionCommandImpl extends AbstractBaseFizzBuzzComputationCommand {
  private static readonly COMMAND_NAME = "FizzBuzzValueResolutionCommand";
  private static readonly COMMAND_VERSION = "1.0.0-COMMAND";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_VALUE_RESOLUTION";

  private readonly delegate: IFizzBuzzServiceDelegate;
  private readonly delegateJndiName: string;

  constructor(delegate: IFizzBuzzServiceDelegate, delegateJndiName: string) {
    super();
    this.delegate = delegate;
    this.delegateJndiName = delegateJndiName;
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    this.validateRequest(request);
    return this.delegate.delegateSingleValueResolution(request);
  }

  override getCommandName(): string {
    return FizzBuzzValueResolutionCommandImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return FizzBuzzValueResolutionCommandImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return FizzBuzzValueResolutionCommandImpl.COMMAND_GROUP;
  }

  getDelegate(): IFizzBuzzServiceDelegate {
    return this.delegate;
  }

  getDelegateJndiName(): string {
    return this.delegateJndiName;
  }
}
