import type { IFizzBuzzCommandInvokerFactoryBean } from "../../contracts/IFizzBuzzCommandInvokerFactoryBean.js";
import type { IFizzBuzzCommandInvoker } from "../../contracts/IFizzBuzzCommandInvoker.js";
import type { IFizzBuzzCommandHistoryManager } from "../../contracts/IFizzBuzzCommandHistoryManager.js";
import { FizzBuzzCommandInvokerImpl } from "../invokers/FizzBuzzCommandInvokerImpl.js";
import { FizzBuzzCommandHistoryManagerImpl } from "../history/FizzBuzzCommandHistoryManagerImpl.js";
import { AbstractBaseFizzBuzzCommandInvokerFactoryBean } from "../../abstracts/AbstractBaseFizzBuzzCommandInvokerFactoryBean.js";

export class FizzBuzzCommandInvokerFactoryBeanImpl extends AbstractBaseFizzBuzzCommandInvokerFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzCommandInvokerFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN";

  private readonly defaultHistoryManager: IFizzBuzzCommandHistoryManager | null;

  constructor(defaultHistoryManager: IFizzBuzzCommandHistoryManager | null = null) {
    super();
    this.defaultHistoryManager = defaultHistoryManager;
  }

  override createCommandInvoker(): IFizzBuzzCommandInvoker {
    const historyManager = this.defaultHistoryManager ?? new FizzBuzzCommandHistoryManagerImpl();
    const invoker = new FizzBuzzCommandInvokerImpl(historyManager);
    console.debug(
      `[${this.getFactoryBeanName()}] Created command invoker with history manager [${historyManager.getHistoryManagerName()}]`,
    );
    return invoker;
  }

  override createCommandInvokerWithHistory(
    historyManager: IFizzBuzzCommandHistoryManager,
  ): IFizzBuzzCommandInvoker {
    const invoker = new FizzBuzzCommandInvokerImpl(historyManager);
    console.debug(
      `[${this.getFactoryBeanName()}] Created command invoker with provided history manager [${historyManager.getHistoryManagerName()}]`,
    );
    return invoker;
  }

  override getFactoryBeanName(): string {
    return FizzBuzzCommandInvokerFactoryBeanImpl.FACTORY_BEAN_NAME;
  }

  override getFactoryBeanVersion(): string {
    return FizzBuzzCommandInvokerFactoryBeanImpl.FACTORY_BEAN_VERSION;
  }
}
