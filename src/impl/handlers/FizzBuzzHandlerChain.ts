import type { IHandler } from "../../contracts/IHandler.js";
import type { IFizzBuzzStrategyFactory } from "../../contracts/IFizzBuzzStrategyFactory.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";
import { DivisibilityHandler } from "./DivisibilityHandler.js";
import { DefaultOutputHandler } from "./DefaultOutputHandler.js";

export class FizzBuzzHandlerChain {
  private readonly head: IHandler<number, string>;

  constructor(strategyFactory: IFizzBuzzStrategyFactory, formatter: IFizzBuzzOutputFormatter) {
    const divisibilityHandler = new DivisibilityHandler(strategyFactory);
    const defaultHandler = new DefaultOutputHandler(formatter);

    divisibilityHandler.setNext(defaultHandler);

    this.head = divisibilityHandler;
  }

  getHead(): IHandler<number, string> {
    return this.head;
  }
}
