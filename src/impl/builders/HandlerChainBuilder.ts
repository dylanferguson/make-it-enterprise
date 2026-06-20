import type { IHandler } from "../../contracts/IHandler.js";
import type { IFizzBuzzStrategyFactory } from "../../contracts/IFizzBuzzStrategyFactory.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";
import { DivisibilityHandler } from "../handlers/DivisibilityHandler.js";
import { DefaultOutputHandler } from "../handlers/DefaultOutputHandler.js";

export class HandlerChainBuilder {
  private strategyFactory: IFizzBuzzStrategyFactory | null = null;
  private formatter: IFizzBuzzOutputFormatter | null = null;
  private preHandlers: IHandler<number, string>[] = [];
  private postHandlers: IHandler<number, string>[] = [];

  withStrategyFactory(factory: IFizzBuzzStrategyFactory): this {
    this.strategyFactory = factory;
    return this;
  }

  withOutputFormatter(formatter: IFizzBuzzOutputFormatter): this {
    this.formatter = formatter;
    return this;
  }

  withPreHandler(handler: IHandler<number, string>): this {
    this.preHandlers.push(handler);
    return this;
  }

  withPostHandler(handler: IHandler<number, string>): this {
    this.postHandlers.push(handler);
    return this;
  }

  build(): IHandler<number, string> {
    if (this.strategyFactory === null) {
      throw new Error("StrategyFactory is required to build the handler chain");
    }
    if (this.formatter === null) {
      throw new Error("OutputFormatter is required to build the handler chain");
    }

    const divisibilityHandler = new DivisibilityHandler(this.strategyFactory);
    const defaultHandler = new DefaultOutputHandler(this.formatter);
    divisibilityHandler.setNext(defaultHandler);

    let head: IHandler<number, string> = divisibilityHandler;
    let tail: IHandler<number, string> = defaultHandler;

    for (const handler of this.postHandlers) {
      tail.setNext(handler);
      tail = handler;
    }

    for (const handler of this.preHandlers.reverse()) {
      handler.setNext(head);
      head = handler;
    }

    return head;
  }
}
