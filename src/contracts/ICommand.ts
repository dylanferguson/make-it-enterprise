export interface ICommand<TInput, TOutput> {
  execute(input: TInput): TOutput;
  getCommandName(): string;
  canExecute(input: TInput): boolean;
}
