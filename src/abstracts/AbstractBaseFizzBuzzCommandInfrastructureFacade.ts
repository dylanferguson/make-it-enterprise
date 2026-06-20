import type { IFizzBuzzCommandInfrastructureFacade } from "../contracts/IFizzBuzzCommandInfrastructureFacade.js";
import type { IFizzBuzzCommandInvoker } from "../contracts/IFizzBuzzCommandInvoker.js";
import type { IFizzBuzzCommandHistoryManager } from "../contracts/IFizzBuzzCommandHistoryManager.js";
import type { IFizzBuzzCommandInvokerFactoryBean } from "../contracts/IFizzBuzzCommandInvokerFactoryBean.js";

export abstract class AbstractBaseFizzBuzzCommandInfrastructureFacade implements IFizzBuzzCommandInfrastructureFacade {
  abstract getCommandInvoker(): IFizzBuzzCommandInvoker;
  abstract getCommandHistoryManager(): IFizzBuzzCommandHistoryManager;
  abstract getCommandInvokerFactoryBean(): IFizzBuzzCommandInvokerFactoryBean;
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;

  protected logFacadeOperation(operation: string): void {
    console.debug(`[${this.getFacadeName()} v${this.getFacadeVersion()}] Operation: ${operation}`);
  }
}
