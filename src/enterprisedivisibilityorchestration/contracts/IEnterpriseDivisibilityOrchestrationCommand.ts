export interface IEnterpriseDivisibilityOrchestrationCommand {
  getCommandName(): string;
  getCommandVersion(): string;
  getCommandDescriptor(): string;
  execute(payload: number): string;
}
