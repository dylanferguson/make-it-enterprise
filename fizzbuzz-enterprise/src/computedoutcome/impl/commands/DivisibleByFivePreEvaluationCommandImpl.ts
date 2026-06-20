import { AbstractBaseDivisibilityDrivenEnterpriseComputedOutcomePreEvaluationCommand } from "./AbstractBaseDivisibilityDrivenEnterpriseComputedOutcomePreEvaluationCommand.js";

export class DivisibleByFivePreEvaluationCommandImpl
  extends AbstractBaseDivisibilityDrivenEnterpriseComputedOutcomePreEvaluationCommand
{
  private static readonly COMMAND_NAME = "DivisibleByFivePreEvaluationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-DIV-BY-5-PRE-EVAL-COMMAND";
  private static readonly COMMAND_PRIORITY = 80;
  private static readonly SUPPORTED_DIVISOR = 5;
  private static readonly OUTPUT_MESSAGE = "Buzz";

  constructor() {
    super(
      DivisibleByFivePreEvaluationCommandImpl.COMMAND_NAME,
      DivisibleByFivePreEvaluationCommandImpl.COMMAND_VERSION,
      DivisibleByFivePreEvaluationCommandImpl.COMMAND_PRIORITY,
      DivisibleByFivePreEvaluationCommandImpl.SUPPORTED_DIVISOR,
      DivisibleByFivePreEvaluationCommandImpl.OUTPUT_MESSAGE,
    );
  }
}
