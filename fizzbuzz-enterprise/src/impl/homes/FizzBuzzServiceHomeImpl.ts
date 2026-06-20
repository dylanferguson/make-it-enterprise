import type { IEnterpriseServiceHome } from "../../contracts/IEnterpriseServiceHome.js";
import type { IEnterpriseServiceBean } from "../../contracts/IEnterpriseServiceBean.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { ITransactionManager } from "../../contracts/ITransactionManager.js";
import { FizzBuzzManagedServiceBeanImpl } from "../beans/FizzBuzzManagedServiceBeanImpl.js";

export class FizzBuzzServiceHomeImpl implements IEnterpriseServiceHome {
  private static readonly HOME_NAME = "FizzBuzzServiceHome";
  private readonly delegateResolver: ICompositeValueResolver;
  private readonly transactionManager: ITransactionManager;
  private readonly beanPool: Map<string, FizzBuzzManagedServiceBeanImpl> = new Map();

  constructor(
    delegateResolver: ICompositeValueResolver,
    transactionManager: ITransactionManager,
  ) {
    this.delegateResolver = delegateResolver;
    this.transactionManager = transactionManager;
  }

  create(): IEnterpriseServiceBean {
    const bean = new FizzBuzzManagedServiceBeanImpl(
      this.delegateResolver,
      this.transactionManager,
    );
    bean.ejbCreate();
    bean.ejbActivate();
    this.beanPool.set(bean.getServiceInstanceId(), bean);
    console.debug(
      `[${this.getHomeName()}] Created and activated bean instance [${bean.getServiceInstanceId()}]`,
    );
    return bean;
  }

  findByPrimaryKey(key: string): IEnterpriseServiceBean | null {
    return this.beanPool.get(key) ?? null;
  }

  remove(bean: IEnterpriseServiceBean): void {
    if (bean instanceof FizzBuzzManagedServiceBeanImpl) {
      bean.ejbPassivate();
      bean.ejbRemove();
      this.beanPool.delete(bean.getServiceInstanceId());
    }
  }

  getHomeName(): string {
    return FizzBuzzServiceHomeImpl.HOME_NAME;
  }

  getActiveBeanCount(): number {
    return this.beanPool.size;
  }
}
