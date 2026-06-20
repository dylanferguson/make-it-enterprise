import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";

export abstract class AbstractBaseFizzBuzzComputationCommandImpl<T>
  implements IFizzBuzzComputationCommand<T>
{
  private _executed = false;
  private _executionTimestamp: number | null = null;
  private readonly _input: T;

  constructor(input: T) {
    this._input = input;
  }

  abstract getCommandDescriptor(): string;
  abstract getCommandVersion(): string;
  abstract getCommandTypeName(): string;
  abstract execute(): unknown;

  getInput(): T {
    return this._input;
  }

  isExecuted(): boolean {
    return this._executed;
  }

  getExecutionTimestamp(): number | null {
    return this._executionTimestamp;
  }

  setExecutionTimestamp(timestamp: number): void {
    this._executionTimestamp = timestamp;
    this._executed = true;
  }
}
