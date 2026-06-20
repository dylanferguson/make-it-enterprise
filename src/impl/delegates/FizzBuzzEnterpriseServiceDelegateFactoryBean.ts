import type { IEnterpriseServiceBean } from "../../contracts/IEnterpriseServiceBean.js";
import type { ITransactionManager } from "../../contracts/ITransactionManager.js";
import type { IComputationEventNotificationBus } from "../../contracts/IComputationEventNotificationBus.js";
import type { IFizzBuzzServiceDelegate } from "../../contracts/IFizzBuzzServiceDelegate.js";
import { FizzBuzzEnterpriseServiceDelegateImpl } from "./FizzBuzzEnterpriseServiceDelegateImpl.js";

export class FizzBuzzEnterpriseServiceDelegateFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzEnterpriseServiceDelegateFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN";

  private readonly managedServiceBean: IEnterpriseServiceBean;
  private readonly transactionManager: ITransactionManager;
  private readonly eventBus: IComputationEventNotificationBus;
  private delegate: IFizzBuzzServiceDelegate | null = null;

  constructor(
    managedServiceBean: IEnterpriseServiceBean,
    transactionManager: ITransactionManager,
    eventBus: IComputationEventNotificationBus,
  ) {
    this.managedServiceBean = managedServiceBean;
    this.transactionManager = transactionManager;
    this.eventBus = eventBus;
  }

  createDelegate(): IFizzBuzzServiceDelegate {
    if (this.delegate === null) {
      this.delegate = new FizzBuzzEnterpriseServiceDelegateImpl(
        this.managedServiceBean,
        this.transactionManager,
        this.eventBus,
      );
    }
    return this.delegate;
  }

  getFactoryBeanName(): string {
    return FizzBuzzEnterpriseServiceDelegateFactoryBean.FACTORY_BEAN_NAME;
  }

  getFactoryBeanVersion(): string {
    return FizzBuzzEnterpriseServiceDelegateFactoryBean.FACTORY_BEAN_VERSION;
  }

  static createDelegateFactoryBean(
    managedServiceBean: IEnterpriseServiceBean,
    transactionManager: ITransactionManager,
    eventBus: IComputationEventNotificationBus,
  ): FizzBuzzEnterpriseServiceDelegateFactoryBean {
    return new FizzBuzzEnterpriseServiceDelegateFactoryBean(
      managedServiceBean,
      transactionManager,
      eventBus,
    );
  }
}
