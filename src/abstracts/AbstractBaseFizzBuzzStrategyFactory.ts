import type { IFizzBuzzStrategy } from "../contracts/IFizzBuzzStrategy.js";
import type { IFizzBuzzStrategyFactory } from "../contracts/IFizzBuzzStrategyFactory.js";
import type { IDivisibilityStrategyProvider } from "../contracts/IDivisibilityStrategyProvider.js";
import type { IEnterpriseServiceComponentValidator } from "../contracts/IEnterpriseServiceComponentValidator.js";

export abstract class AbstractBaseFizzBuzzStrategyFactory implements IFizzBuzzStrategyFactory {
  protected divisibilityStrategyProvider: IDivisibilityStrategyProvider | null = null;
  protected componentValidator: IEnterpriseServiceComponentValidator | null = null;

  abstract createStrategies(): readonly IFizzBuzzStrategy[];

  setDivisibilityStrategyProvider(provider: IDivisibilityStrategyProvider | null): void {
    this.divisibilityStrategyProvider = provider;
  }

  setComponentValidator(validator: IEnterpriseServiceComponentValidator | null): void {
    this.componentValidator = validator;
  }

  protected sortByPriority(strategies: readonly IFizzBuzzStrategy[]): readonly IFizzBuzzStrategy[] {
    return [...strategies].sort((a, b) => b.getPriority() - a.getPriority());
  }

  protected applyCrossCuttingConcerns(strategy: IFizzBuzzStrategy): void {
    if (this.divisibilityStrategyProvider !== null && 'setDivisibilityStrategyProvider' in strategy) {
      (strategy as { setDivisibilityStrategyProvider: (p: IDivisibilityStrategyProvider | null) => void }).setDivisibilityStrategyProvider(this.divisibilityStrategyProvider);
    }
    if (this.componentValidator !== null && 'setComponentValidator' in strategy) {
      (strategy as { setComponentValidator: (v: IEnterpriseServiceComponentValidator | null) => void }).setComponentValidator(this.componentValidator);
    }
  }
}
