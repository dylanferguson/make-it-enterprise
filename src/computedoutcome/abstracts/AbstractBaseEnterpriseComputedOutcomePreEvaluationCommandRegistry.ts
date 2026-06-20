import type { IEnterpriseComputedOutcomePreEvaluationCommand, IEnterpriseComputedOutcomePreEvaluationCommandRegistry } from "../contracts/index.js";

export abstract class AbstractBaseEnterpriseComputedOutcomePreEvaluationCommandRegistry
  implements IEnterpriseComputedOutcomePreEvaluationCommandRegistry
{
  private static readonly REGISTRY_FRAMEWORK_VERSION = "1.0.0-PRE-EVALUATION-REGISTRY-FRAMEWORK";

  protected readonly registryName: string;
  protected readonly registryVersion: string;
  protected commands: Map<string, IEnterpriseComputedOutcomePreEvaluationCommand> = new Map();

  constructor(registryName: string, registryVersion: string) {
    this.registryName = registryName;
    this.registryVersion = registryVersion;
  }

  abstract getRegistryName(): string;
  abstract getRegistryVersion(): string;

  getRegisteredCommandCount(): number {
    return this.commands.size;
  }

  getRegisteredCommandNames(): readonly string[] {
    return Array.from(this.commands.keys());
  }

  registerCommand(command: IEnterpriseComputedOutcomePreEvaluationCommand): void {
    this.commands.set(command.getCommandName(), command);
  }

  unregisterCommand(commandName: string): boolean {
    return this.commands.delete(commandName);
  }

  findCommand(commandName: string): IEnterpriseComputedOutcomePreEvaluationCommand | null {
    return this.commands.get(commandName) ?? null;
  }

  clearRegistry(): void {
    this.commands.clear();
  }

  protected getRegistryFrameworkVersion(): string {
    return AbstractBaseEnterpriseComputedOutcomePreEvaluationCommandRegistry.REGISTRY_FRAMEWORK_VERSION;
  }
}
