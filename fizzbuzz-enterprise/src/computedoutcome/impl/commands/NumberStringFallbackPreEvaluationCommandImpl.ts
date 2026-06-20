import { AbstractBaseEnterpriseComputedOutcomePreEvaluationCommand } from "../../abstracts/AbstractBaseEnterpriseComputedOutcomePreEvaluationCommand.js";

export class NumberStringFallbackPreEvaluationCommandImpl
  extends AbstractBaseEnterpriseComputedOutcomePreEvaluationCommand
{
  private static readonly COMMAND_NAME = "NumberStringFallbackPreEvaluationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-NUMBER-STRING-FALLBACK-COMMAND";
  private static readonly COMMAND_PRIORITY = 0;

  constructor() {
    super(
      NumberStringFallbackPreEvaluationCommandImpl.COMMAND_NAME,
      NumberStringFallbackPreEvaluationCommandImpl.COMMAND_VERSION,
      NumberStringFallbackPreEvaluationCommandImpl.COMMAND_PRIORITY,
      null,
      null,
      true,
    );
  }

  override getCommandName(): string {
    return NumberStringFallbackPreEvaluationCommandImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return NumberStringFallbackPreEvaluationCommandImpl.COMMAND_VERSION;
  }

  override evaluate(value: number): string | null {
    this.validateCommandValue(value);
    return value.toString();
  }
}
