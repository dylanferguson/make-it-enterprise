import { DivisibleByFifteenPreEvaluationCommandImpl } from "../impl/commands/DivisibleByFifteenPreEvaluationCommandImpl.js";
import { DivisibleByFivePreEvaluationCommandImpl } from "../impl/commands/DivisibleByFivePreEvaluationCommandImpl.js";
import { DivisibleByThreePreEvaluationCommandImpl } from "../impl/commands/DivisibleByThreePreEvaluationCommandImpl.js";
import { NumberStringFallbackPreEvaluationCommandImpl } from "../impl/commands/NumberStringFallbackPreEvaluationCommandImpl.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommand } from "../contracts/index.js";

export class EnterpriseDivisorPreEvaluationCommandFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDivisorPreEvaluationCommandFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DIVISOR-PRE-EVAL-COMMAND-FACTORY-BEAN";

  static createDivisibleByFifteenCommand(): IEnterpriseComputedOutcomePreEvaluationCommand {
    return new DivisibleByFifteenPreEvaluationCommandImpl();
  }

  static createDivisibleByFiveCommand(): IEnterpriseComputedOutcomePreEvaluationCommand {
    return new DivisibleByFivePreEvaluationCommandImpl();
  }

  static createDivisibleByThreeCommand(): IEnterpriseComputedOutcomePreEvaluationCommand {
    return new DivisibleByThreePreEvaluationCommandImpl();
  }

  static createNumberFallbackCommand(): IEnterpriseComputedOutcomePreEvaluationCommand {
    return new NumberStringFallbackPreEvaluationCommandImpl();
  }

  static createStandardDivisorCommandSet(): IEnterpriseComputedOutcomePreEvaluationCommand[] {
    return [
      new DivisibleByFifteenPreEvaluationCommandImpl(),
      new DivisibleByFivePreEvaluationCommandImpl(),
      new DivisibleByThreePreEvaluationCommandImpl(),
      new NumberStringFallbackPreEvaluationCommandImpl(),
    ];
  }

  static getFactoryBeanName(): string {
    return EnterpriseDivisorPreEvaluationCommandFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseDivisorPreEvaluationCommandFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
