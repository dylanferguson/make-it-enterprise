export interface IFizzBuzzStrategyResolutionChainHandler {
  setNext(
    handler: IFizzBuzzStrategyResolutionChainHandler,
  ): IFizzBuzzStrategyResolutionChainHandler;
  handleStrategyResolution(
    value: number,
  ): { resolved: boolean; strategyType: string; divisor: number | null };
  getHandlerName(): string;
  getHandlerPriority(): number;
}
