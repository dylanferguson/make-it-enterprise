import type { IFizzBuzzCommandInvoker } from "./IFizzBuzzCommandInvoker.js";
import type { IFizzBuzzCommandHistoryManager } from "./IFizzBuzzCommandHistoryManager.js";

export interface IFizzBuzzCommandInvokerFactoryBean {
  createCommandInvoker(): IFizzBuzzCommandInvoker;
  createCommandInvokerWithHistory(historyManager: IFizzBuzzCommandHistoryManager): IFizzBuzzCommandInvoker;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
}
