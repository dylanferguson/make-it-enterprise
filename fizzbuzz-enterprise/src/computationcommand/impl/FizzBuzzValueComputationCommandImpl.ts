import { AbstractBaseFizzBuzzComputationCommandImpl } from "../abstracts/AbstractBaseFizzBuzzComputationCommandImpl.js";
import type { IEnterpriseFizzBuzzPublicApiSessionFacade } from "../../enterprisefacade/contracts/IEnterpriseFizzBuzzPublicApiSessionFacade.js";

export class FizzBuzzValueComputationCommandImpl extends AbstractBaseFizzBuzzComputationCommandImpl<number> {
  private readonly _facade: IEnterpriseFizzBuzzPublicApiSessionFacade;

  constructor(
    value: number,
    facade: IEnterpriseFizzBuzzPublicApiSessionFacade,
  ) {
    super(value);
    this._facade = facade;
  }

  getCommandDescriptor(): string {
    return `FizzBuzzValueCommand[input=${this.getInput()}]`;
  }

  getCommandVersion(): string {
    return "1.0.0-CMD-VAL";
  }

  getCommandTypeName(): string {
    return "FIZZBUZZ_VALUE_COMMAND";
  }

  execute(): string {
    const input = this.getInput();
    this.setExecutionTimestamp(Date.now());
    return this._facade.resolveSingleValue(input);
  }
}
