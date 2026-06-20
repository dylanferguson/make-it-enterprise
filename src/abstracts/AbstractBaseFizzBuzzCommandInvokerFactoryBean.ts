import type { IFizzBuzzCommandInvokerFactoryBean } from "../contracts/IFizzBuzzCommandInvokerFactoryBean.js";
import type { IFizzBuzzCommandInvoker } from "../contracts/IFizzBuzzCommandInvoker.js";
import type { IFizzBuzzCommandHistoryManager } from "../contracts/IFizzBuzzCommandHistoryManager.js";

export abstract class AbstractBaseFizzBuzzCommandInvokerFactoryBean implements IFizzBuzzCommandInvokerFactoryBean {
  abstract createCommandInvoker(): IFizzBuzzCommandInvoker;
  abstract createCommandInvokerWithHistory(historyManager: IFizzBuzzCommandHistoryManager): IFizzBuzzCommandInvoker;
  abstract getFactoryBeanName(): string;
  abstract getFactoryBeanVersion(): string;

  protected logFactoryOperation(operation: string, detail: string): void {
    console.debug(`[${this.getFactoryBeanName()}] ${operation}: ${detail}`);
  }
}
