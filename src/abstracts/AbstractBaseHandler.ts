import type { IHandler } from "../contracts/IHandler.js";

export abstract class AbstractBaseHandler<TInput, TOutput> implements IHandler<TInput, TOutput> {
  protected nextHandler: IHandler<TInput, TOutput> | null = null;

  setNext(handler: IHandler<TInput, TOutput>): IHandler<TInput, TOutput> {
    this.nextHandler = handler;
    return handler;
  }

  abstract handle(input: TInput): TOutput;

  protected handleNext(input: TInput): TOutput {
    if (this.nextHandler === null) {
      throw new Error("End of chain reached without a handler producing output");
    }
    return this.nextHandler.handle(input);
  }
}
