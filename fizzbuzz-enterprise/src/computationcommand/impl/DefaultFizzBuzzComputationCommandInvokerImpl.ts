import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationCommandInvoker } from "../contracts/IFizzBuzzComputationCommandInvoker.js";

export class DefaultFizzBuzzComputationCommandInvokerImpl
  implements IFizzBuzzComputationCommandInvoker
{
  private readonly _invokerName: string;
  private readonly _invokerVersion: string;
  private readonly _registeredCommandTypes: string[] = [];
  private _auditEnabled: boolean;

  constructor(invokerName: string, invokerVersion: string, auditEnabled: boolean) {
    this._invokerName = invokerName;
    this._invokerVersion = invokerVersion;
    this._auditEnabled = auditEnabled;
  }

  getInvokerName(): string {
    return this._invokerName;
  }

  getInvokerVersion(): string {
    return this._invokerVersion;
  }

  invoke(command: IFizzBuzzComputationCommand<unknown>): unknown {
    if (this._auditEnabled) {
      console.debug(
        `[CommandInvoker] Invoking command: type=[${command.getCommandTypeName()}], ` +
        `descriptor=[${command.getCommandDescriptor()}], version=[${command.getCommandVersion()}]`,
      );
    }
    return command.execute();
  }

  invokeValue(command: IFizzBuzzComputationCommand<number>): string {
    return this.invoke(command) as string;
  }

  invokeRange(command: IFizzBuzzComputationCommand<[number, number]>): readonly string[] {
    return this.invoke(command) as readonly string[];
  }

  isInvocationAuditEnabled(): boolean {
    return this._auditEnabled;
  }

  getRegisteredCommandTypeNames(): readonly string[] {
    return [...this._registeredCommandTypes];
  }

  registerCommandType(typeName: string): void {
    if (!this._registeredCommandTypes.includes(typeName)) {
      this._registeredCommandTypes.push(typeName);
    }
  }
}
