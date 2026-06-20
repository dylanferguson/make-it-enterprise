import type { IFizzBuzzComputationMediator } from "../../contracts/IFizzBuzzComputationMediator.js";
import type { IFizzBuzzComputationBridge } from "../../contracts/IFizzBuzzComputationBridge.js";
import type { IComputationEventNotificationBus } from "../../contracts/IComputationEventNotificationBus.js";
import type { IFizzBuzzSessionManager } from "../../contracts/IFizzBuzzSessionManager.js";
import type { ITransactionManager } from "../../contracts/ITransactionManager.js";
import type { ISloMetricsCollector } from "../../contracts/ISloMetricsCollector.js";
import { FizzBuzzComputationMediatorImpl } from "../mediator/FizzBuzzComputationMediatorImpl.js";

export class FizzBuzzComputationMediatorFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzComputationMediatorFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0";

  private readonly bridge: IFizzBuzzComputationBridge;
  private readonly eventBus: IComputationEventNotificationBus;
  private readonly sessionManager: IFizzBuzzSessionManager;
  private readonly transactionManager: ITransactionManager;
  private readonly sloMetricsCollector: ISloMetricsCollector;
  private mediator: IFizzBuzzComputationMediator | null = null;

  constructor(
    bridge: IFizzBuzzComputationBridge,
    eventBus: IComputationEventNotificationBus,
    sessionManager: IFizzBuzzSessionManager,
    transactionManager: ITransactionManager,
    sloMetricsCollector: ISloMetricsCollector,
  ) {
    this.bridge = bridge;
    this.eventBus = eventBus;
    this.sessionManager = sessionManager;
    this.transactionManager = transactionManager;
    this.sloMetricsCollector = sloMetricsCollector;
  }

  createMediator(): IFizzBuzzComputationMediator {
    if (this.mediator === null) {
      console.debug(
        `[${FizzBuzzComputationMediatorFactoryBean.FACTORY_BEAN_NAME}] Creating FizzBuzzComputationMediatorImpl (version: ${FizzBuzzComputationMediatorFactoryBean.FACTORY_BEAN_VERSION})`,
      );
      this.mediator = new FizzBuzzComputationMediatorImpl(
        this.bridge,
        this.eventBus,
        this.sessionManager,
        this.transactionManager,
        this.sloMetricsCollector,
      );
    }
    return this.mediator;
  }

  resetMediator(): void {
    this.mediator = null;
  }

  getFactoryBeanName(): string {
    return FizzBuzzComputationMediatorFactoryBean.FACTORY_BEAN_NAME;
  }

  getFactoryBeanVersion(): string {
    return FizzBuzzComputationMediatorFactoryBean.FACTORY_BEAN_VERSION;
  }
}

export class FizzBuzzComputationMediatorFactoryBeanFactory {
  static createFactoryBean(
    bridge: IFizzBuzzComputationBridge,
    eventBus: IComputationEventNotificationBus,
    sessionManager: IFizzBuzzSessionManager,
    transactionManager: ITransactionManager,
    sloMetricsCollector: ISloMetricsCollector,
  ): FizzBuzzComputationMediatorFactoryBean {
    return new FizzBuzzComputationMediatorFactoryBean(
      bridge,
      eventBus,
      sessionManager,
      transactionManager,
      sloMetricsCollector,
    );
  }
}
