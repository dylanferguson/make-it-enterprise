import { AbstractBaseDivisibilityDrivenEnterpriseComputedOutcomePreEvaluationCommand } from "./AbstractBaseDivisibilityDrivenEnterpriseComputedOutcomePreEvaluationCommand.js";

export class DivisibleByFifteenPreEvaluationCommandImpl
  extends AbstractBaseDivisibilityDrivenEnterpriseComputedOutcomePreEvaluationCommand
{
  private static readonly COMMAND_NAME = "DivisibleByFifteenPreEvaluationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-DIV-BY-15-PRE-EVAL-COMMAND";
  private static readonly COMMAND_PRIORITY = 100;
  private static readonly SUPPORTED_DIVISOR = 15;
  private static readonly OUTPUT_MESSAGE = "FizzBuzz";

  constructor() {
    super(
      DivisibleByFifteenPreEvaluationCommandImpl.COMMAND_NAME,
      DivisibleByFifteenPreEvaluationCommandImpl.COMMAND_VERSION,
      DivisibleByFifteenPreEvaluationCommandImpl.COMMAND_PRIORITY,
      DivisibleByFifteenPreEvaluationCommandImpl.SUPPORTED_DIVISOR,
      DivisibleByFifteenPreEvaluationCommandImpl.OUTPUT_MESSAGE,
    );
  }
}
