import type { IFizzBuzzOutputStringResolutionStrategyVisitor, IFizzBuzzOutputStringResolutionStrategy } from "../contracts/index.js";

export abstract class AbstractBaseFizzBuzzOutputStringResolutionStrategyVisitor
  implements IFizzBuzzOutputStringResolutionStrategyVisitor
{
  private readonly visitorName: string;
  private readonly visitorPriority: number;

  constructor(visitorName: string, visitorPriority: number) {
    this.visitorName = visitorName;
    this.visitorPriority = visitorPriority;
  }

  getName(): string {
    return this.visitorName;
  }

  getVisitorPriority(): number {
    return this.visitorPriority;
  }

  abstract visitStrategy(strategy: IFizzBuzzOutputStringResolutionStrategy, value: number): boolean;

  abstract selectResolvedStrategy(
    strategies: readonly IFizzBuzzOutputStringResolutionStrategy[],
    value: number,
  ): IFizzBuzzOutputStringResolutionStrategy | null;
}
