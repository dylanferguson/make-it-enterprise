import type { IFizzBuzzCommandInvoker } from "./IFizzBuzzCommandInvoker.js";
import type { IFizzBuzzCommandHistoryManager } from "./IFizzBuzzCommandHistoryManager.js";
import type { IFizzBuzzCommandInvokerFactoryBean } from "./IFizzBuzzCommandInvokerFactoryBean.js";

export interface IFizzBuzzCommandInfrastructureFacade {
  getCommandInvoker(): IFizzBuzzCommandInvoker;
  getCommandHistoryManager(): IFizzBuzzCommandHistoryManager;
  getCommandInvokerFactoryBean(): IFizzBuzzCommandInvokerFactoryBean;
  getFacadeName(): string;
  getFacadeVersion(): string;
}
