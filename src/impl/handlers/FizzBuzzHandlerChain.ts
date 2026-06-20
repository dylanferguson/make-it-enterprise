import type { IHandler } from "../../contracts/IHandler.js";
import { HandlerChainBuilder } from "../builders/HandlerChainBuilder.js";
import type { IFizzBuzzStrategyFactory } from "../../contracts/IFizzBuzzStrategyFactory.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";

export class FizzBuzzHandlerChain {
  private readonly head: IHandler<number, string>;

  constructor(strategyFactory: IFizzBuzzStrategyFactory, formatter: IFizzBuzzOutputFormatter) {
    const builder = new HandlerChainBuilder();
    this.head = builder
      .withStrategyFactory(strategyFactory)
      .withOutputFormatter(formatter)
      .build();
  }

  getHead(): IHandler<number, string> {
    return this.head;
  }
}
