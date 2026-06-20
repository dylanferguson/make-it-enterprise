import { AbstractBaseFizzBuzzCommandInfrastructureFacade } from "../../abstracts/AbstractBaseFizzBuzzCommandInfrastructureFacade.js";
import type { IFizzBuzzCommandInvoker } from "../../contracts/IFizzBuzzCommandInvoker.js";
import type { IFizzBuzzCommandHistoryManager } from "../../contracts/IFizzBuzzCommandHistoryManager.js";
import type { IFizzBuzzCommandInvokerFactoryBean } from "../../contracts/IFizzBuzzCommandInvokerFactoryBean.js";
import { FizzBuzzCommandInvokerFactoryBeanFactory } from "../factories/FizzBuzzCommandInvokerFactoryBeanFactory.js";
import { FizzBuzzCommandHistoryManagerImpl } from "../history/FizzBuzzCommandHistoryManagerImpl.js";

export class FizzBuzzCommandInfrastructureFacadeImpl extends AbstractBaseFizzBuzzCommandInfrastructureFacade {
  private static readonly FACADE_NAME = "FizzBuzzCommandInfrastructureFacade";
  private static readonly FACADE_VERSION = "1.0.0-FACADE";

  private readonly commandInvoker: IFizzBuzzCommandInvoker;
  private readonly commandHistoryManager: IFizzBuzzCommandHistoryManager;
  private readonly commandInvokerFactoryBean: IFizzBuzzCommandInvokerFactoryBean;

  constructor(
    commandInvoker: IFizzBuzzCommandInvoker,
    commandHistoryManager: IFizzBuzzCommandHistoryManager,
    commandInvokerFactoryBean: IFizzBuzzCommandInvokerFactoryBean,
  ) {
    super();
    this.commandInvoker = commandInvoker;
    this.commandHistoryManager = commandHistoryManager;
    this.commandInvokerFactoryBean = commandInvokerFactoryBean;
  }

  static createDefaultFacade(): FizzBuzzCommandInfrastructureFacadeImpl {
    const historyManager = new FizzBuzzCommandHistoryManagerImpl();
    const factoryBean = FizzBuzzCommandInvokerFactoryBeanFactory.createFactoryBean(historyManager);
    const invoker = factoryBean.createCommandInvoker();
    return new FizzBuzzCommandInfrastructureFacadeImpl(invoker, historyManager, factoryBean);
  }

  override getCommandInvoker(): IFizzBuzzCommandInvoker {
    return this.commandInvoker;
  }

  override getCommandHistoryManager(): IFizzBuzzCommandHistoryManager {
    return this.commandHistoryManager;
  }

  override getCommandInvokerFactoryBean(): IFizzBuzzCommandInvokerFactoryBean {
    return this.commandInvokerFactoryBean;
  }

  override getFacadeName(): string {
    return FizzBuzzCommandInfrastructureFacadeImpl.FACADE_NAME;
  }

  override getFacadeVersion(): string {
    return FizzBuzzCommandInfrastructureFacadeImpl.FACADE_VERSION;
  }
}
