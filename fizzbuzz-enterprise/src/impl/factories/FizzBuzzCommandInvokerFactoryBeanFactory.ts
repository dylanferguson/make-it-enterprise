import type { IFizzBuzzCommandInvokerFactoryBean } from "../../contracts/IFizzBuzzCommandInvokerFactoryBean.js";
import type { IFizzBuzzCommandHistoryManager } from "../../contracts/IFizzBuzzCommandHistoryManager.js";
import type { IFizzBuzzCommandInvoker } from "../../contracts/IFizzBuzzCommandInvoker.js";
import { FizzBuzzCommandInvokerFactoryBeanImpl } from "./FizzBuzzCommandInvokerFactoryBeanImpl.js";
import { FizzBuzzCommandHistoryManagerImpl } from "../history/FizzBuzzCommandHistoryManagerImpl.js";

export class FizzBuzzCommandInvokerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "FizzBuzzCommandInvokerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_FACTORY_VERSION = "1.0.0-FACTORY-BEAN-FACTORY";
  private static instance: IFizzBuzzCommandInvokerFactoryBean | null = null;
  private static invokerInstance: IFizzBuzzCommandInvoker | null = null;

  static createFactoryBean(
    historyManager?: IFizzBuzzCommandHistoryManager,
  ): IFizzBuzzCommandInvokerFactoryBean {
    return new FizzBuzzCommandInvokerFactoryBeanImpl(
      historyManager ?? null,
    );
  }

  static createSingletonCommandInvoker(
    historyManager?: IFizzBuzzCommandHistoryManager,
  ): IFizzBuzzCommandInvoker {
    if (FizzBuzzCommandInvokerFactoryBeanFactory.invokerInstance === null) {
      const effectiveHistory = historyManager ?? new FizzBuzzCommandHistoryManagerImpl();
      const factoryBean = new FizzBuzzCommandInvokerFactoryBeanImpl(effectiveHistory);
      FizzBuzzCommandInvokerFactoryBeanFactory.instance = factoryBean;
      FizzBuzzCommandInvokerFactoryBeanFactory.invokerInstance = factoryBean.createCommandInvoker();
    }
    return FizzBuzzCommandInvokerFactoryBeanFactory.invokerInstance;
  }

  static resetFactory(): void {
    FizzBuzzCommandInvokerFactoryBeanFactory.instance = null;
    FizzBuzzCommandInvokerFactoryBeanFactory.invokerInstance = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FizzBuzzCommandInvokerFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FizzBuzzCommandInvokerFactoryBeanFactory.FACTORY_BEAN_FACTORY_VERSION;
  }
}
