import { AbstractBaseEnterpriseFizzBuzzResolutionStrategySelectorVisitor } from "../../../../abstracts/AbstractBaseEnterpriseFizzBuzzResolutionStrategySelectorVisitor.js";
import type { IEnterpriseFizzBuzzResolutionStrategySelectorVisitor } from "../../../../contracts/IEnterpriseFizzBuzzResolutionStrategySelectorVisitor.js";

export class EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl
  extends AbstractBaseEnterpriseFizzBuzzResolutionStrategySelectorVisitor
  implements IEnterpriseFizzBuzzResolutionStrategySelectorVisitor
{
  private static readonly VISITOR_NAME = "EnterpriseFizzBuzzResolutionStrategySelectorVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-STRATEGY-SELECTOR-VISITOR";

  private static readonly STRATEGY_DIVISIBLE_BY_FIFTEEN = "FIZZBUZZ_DIVISIBLE_BY_FIFTEEN";
  private static readonly STRATEGY_DIVISIBLE_BY_THREE = "FIZZBUZZ_DIVISIBLE_BY_THREE";
  private static readonly STRATEGY_DIVISIBLE_BY_FIVE = "FIZZBUZZ_DIVISIBLE_BY_FIVE";
  private static readonly STRATEGY_DEFAULT_VALUE = "FIZZBUZZ_DEFAULT_VALUE";

  override visitForStrategySelection(
    value: number,
    _context: string | null,
  ): string | null {
    let selectedStrategy: string | null;

    if (value % 15 === 0) {
      selectedStrategy = EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.STRATEGY_DIVISIBLE_BY_FIFTEEN;
    } else if (value % 3 === 0) {
      selectedStrategy = EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.STRATEGY_DIVISIBLE_BY_THREE;
    } else if (value % 5 === 0) {
      selectedStrategy = EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.STRATEGY_DIVISIBLE_BY_FIVE;
    } else {
      selectedStrategy = EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.STRATEGY_DEFAULT_VALUE;
    }

    this.setLastSelectedStrategyName(selectedStrategy);
    return selectedStrategy;
  }

  override getVisitorName(): string {
    return EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.VISITOR_NAME;
  }

  override getVisitorVersion(): string {
    return EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.VISITOR_VERSION;
  }

  override getResolutionCategoryDescription(value: number): string {
    const strategy = this.visitForStrategySelection(value, null);
    switch (strategy) {
      case EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.STRATEGY_DIVISIBLE_BY_FIFTEEN:
        return "Value is divisible by 15 — FizzBuzz composite resolution category";
      case EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.STRATEGY_DIVISIBLE_BY_THREE:
        return "Value is divisible by 3 — Fizz resolution category";
      case EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.STRATEGY_DIVISIBLE_BY_FIVE:
        return "Value is divisible by 5 — Buzz resolution category";
      default:
        return "Value is not divisible by 3 or 5 — Default value resolution category";
    }
  }
}
