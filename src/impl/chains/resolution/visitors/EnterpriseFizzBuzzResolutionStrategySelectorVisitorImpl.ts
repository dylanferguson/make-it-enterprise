import { AbstractBaseEnterpriseFizzBuzzResolutionStrategySelectorVisitor } from "../../../../abstracts/AbstractBaseEnterpriseFizzBuzzResolutionStrategySelectorVisitor.js";
import type { IEnterpriseFizzBuzzResolutionStrategySelectorVisitor } from "../../../../contracts/IEnterpriseFizzBuzzResolutionStrategySelectorVisitor.js";
import { ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory } from "../../../../enterprisemodulo/factories/ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.js";
import type { IModularArithmeticDivisibilityResolutionMediationVisitor } from "../../../../enterprisemodulo/contracts/IModularArithmeticDivisibilityResolutionMediationVisitor.js";

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

  private readonly mediationVisitor: IModularArithmeticDivisibilityResolutionMediationVisitor;

  constructor() {
    super();
    const architecture = ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.initializeArchitecture();
    this.mediationVisitor = architecture.visitor;
  }

  override visitForStrategySelection(
    value: number,
    _context: string | null,
  ): string | null {
    let selectedStrategy: string | null;

    if (this.mediationVisitor.visitMediatorEvaluation(value, 15)) {
      selectedStrategy = EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.STRATEGY_DIVISIBLE_BY_FIFTEEN;
    } else if (this.mediationVisitor.visitMediatorEvaluation(value, 3)) {
      selectedStrategy = EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.STRATEGY_DIVISIBLE_BY_THREE;
    } else if (this.mediationVisitor.visitMediatorEvaluation(value, 5)) {
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
