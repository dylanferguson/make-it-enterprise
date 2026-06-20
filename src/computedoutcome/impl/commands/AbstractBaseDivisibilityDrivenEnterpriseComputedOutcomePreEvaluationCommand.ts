import { AbstractBaseEnterpriseComputedOutcomePreEvaluationCommand } from "../../abstracts/AbstractBaseEnterpriseComputedOutcomePreEvaluationCommand.js";

export class AbstractBaseDivisibilityDrivenEnterpriseComputedOutcomePreEvaluationCommand
  extends AbstractBaseEnterpriseComputedOutcomePreEvaluationCommand
{
  constructor(
    commandName: string,
    commandVersion: string,
    commandPriority: number,
    supportedDivisor: number,
    outputMessage: string,
  ) {
    super(commandName, commandVersion, commandPriority, supportedDivisor, outputMessage, false);
  }

  override getCommandName(): string {
    return this.commandName;
  }

  override getCommandVersion(): string {
    return this.commandVersion;
  }

  override evaluate(value: number): string | null {
    this.validateCommandValue(value);
    if (this.supportedDivisor !== null && this.evaluateDivisibility(value, this.supportedDivisor)) {
      return this.outputMessage;
    }
    return null;
  }
}
