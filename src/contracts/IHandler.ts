export interface IHandler<TInput, TOutput> {
  setNext(handler: IHandler<TInput, TOutput>): IHandler<TInput, TOutput>;
  handle(input: TInput): TOutput;
}
