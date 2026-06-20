import { AbstractBaseDivisibilityDrivenEnterpriseComputedOutcomePreEvaluationCommand } from "./AbstractBaseDivisibilityDrivenEnterpriseComputedOutcomePreEvaluationCommand.js";

export class DivisibleByThreePreEvaluationCommandImpl
  extends AbstractBaseDivisibilityDrivenEnterpriseComputedOutcomePreEvaluationCommand
{
  private static readonly COMMAND_NAME = "DivisibleByThreePreEvaluationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-DIV-BY-3-PRE-EVAL-COMMAND";
  private static readonly COMMAND_PRIORITY = 60;
  private static readonly SUPPORTED_DIVISOR = 3;
  private static readonly OUTPUT_MESSAGE = "Fizz";

  constructor() {
    super(
      DivisibleByThreePreEvaluationCommandImpl.COMMAND_NAME,
      DivisibleByThreePreEvaluationCommandImpl.COMMAND_VERSION,
      DivisibleByThreePreEvaluationCommandImpl.COMMAND_PRIORITY,
      DivisibleByThreePreEvaluationCommandImpl.SUPPORTED_DIVISOR,
      DivisibleByThreePreEvaluationCommandImpl.OUTPUT_MESSAGE,
    );
  }
}
