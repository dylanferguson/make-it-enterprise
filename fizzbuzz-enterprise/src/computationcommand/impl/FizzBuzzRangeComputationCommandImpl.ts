import { AbstractBaseFizzBuzzComputationCommandImpl } from "../abstracts/AbstractBaseFizzBuzzComputationCommandImpl.js";
import type { IEnterpriseFizzBuzzPublicApiSessionFacade } from "../../enterprisefacade/contracts/IEnterpriseFizzBuzzPublicApiSessionFacade.js";

export class FizzBuzzRangeComputationCommandImpl
  extends AbstractBaseFizzBuzzComputationCommandImpl<[number, number]>
{
  private readonly _facade: IEnterpriseFizzBuzzPublicApiSessionFacade;

  constructor(
    start: number,
    end: number,
    facade: IEnterpriseFizzBuzzPublicApiSessionFacade,
  ) {
    super([start, end]);
    this._facade = facade;
  }

  getCommandDescriptor(): string {
    const [start, end] = this.getInput();
    return `FizzBuzzRangeCommand[start=${start}, end=${end}]`;
  }

  getCommandVersion(): string {
    return "1.0.0-CMD-RNG";
  }

  getCommandTypeName(): string {
    return "FIZZBUZZ_RANGE_COMMAND";
  }

  execute(): readonly string[] {
    const [start, end] = this.getInput();
    this.setExecutionTimestamp(Date.now());
    return this._facade.resolveRange(start, end);
  }
}
