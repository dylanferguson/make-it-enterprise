import { FizzBuzzEnterpriseException } from "./FizzBuzzEnterpriseException.js";

export class StrategyResolutionException extends FizzBuzzEnterpriseException {
  private readonly strategyName: string;

  constructor(strategyName: string, message: string, cause: Error | null = null) {
    super(message, "FIZZBUZZ-3001", cause);
    this.name = "StrategyResolutionException";
    this.strategyName = strategyName;
  }

  getStrategyName(): string {
    return this.strategyName;
  }
}
