import type { IEnterpriseComputedOutcomePreEvaluationCommand, IEnterpriseComputedOutcomePreEvaluationCommandChain } from "../contracts/index.js";

export abstract class AbstractBaseEnterpriseComputedOutcomePreEvaluationCommandChain
  implements IEnterpriseComputedOutcomePreEvaluationCommandChain
{
  private static readonly CHAIN_FRAMEWORK_VERSION = "1.0.0-PRE-EVALUATION-CHAIN-FRAMEWORK";

  protected readonly chainName: string;
  protected readonly chainVersion: string;
  protected commands: IEnterpriseComputedOutcomePreEvaluationCommand[] = [];
  protected sorted = false;

  constructor(chainName: string, chainVersion: string) {
    this.chainName = chainName;
    this.chainVersion = chainVersion;
  }

  abstract getChainName(): string;
  abstract getChainVersion(): string;

  getRegisteredCommandCount(): number {
    return this.commands.length;
  }

  getRegisteredCommandNames(): readonly string[] {
    return this.commands.map(c => c.getCommandName());
  }

  addCommand(command: IEnterpriseComputedOutcomePreEvaluationCommand): void {
    this.commands.push(command);
    this.sorted = false;
  }

  removeCommand(commandName: string): boolean {
    const index = this.commands.findIndex(c => c.getCommandName() === commandName);
    if (index === -1) return false;
    this.commands.splice(index, 1);
    return true;
  }

  abstract evaluate(value: number): string | null;

  clearChain(): void {
    this.commands = [];
    this.sorted = false;
  }

  protected ensureSorted(): void {
    if (!this.sorted) {
      this.commands.sort((a, b) => b.getCommandPriority() - a.getCommandPriority());
      this.sorted = true;
    }
  }

  protected getChainFrameworkVersion(): string {
    return AbstractBaseEnterpriseComputedOutcomePreEvaluationCommandChain.CHAIN_FRAMEWORK_VERSION;
  }
}
