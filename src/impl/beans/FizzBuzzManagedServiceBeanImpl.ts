import { AbstractBaseEnterpriseServiceBean } from "../../abstracts/AbstractBaseEnterpriseServiceBean.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { ITransactionManager } from "../../contracts/ITransactionManager.js";

export class FizzBuzzManagedServiceBeanImpl extends AbstractBaseEnterpriseServiceBean {
  private static readonly SERVICE_NAME = "FizzBuzzManagedServiceBean";
  private readonly delegateResolver: ICompositeValueResolver;
  private readonly transactionManager: ITransactionManager;
  private readonly serviceInstanceId: string;

  constructor(
    delegateResolver: ICompositeValueResolver,
    transactionManager: ITransactionManager,
  ) {
    super();
    this.delegateResolver = delegateResolver;
    this.transactionManager = transactionManager;
    this.serviceInstanceId = `FizzBuzzBean-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  override ejbCreate(): void {
    console.debug(`[${this.getServiceName()}:${this.serviceInstanceId}] ejbCreate invoked`);
    this.markInitialized();
  }

  override ejbActivate(): void {
    this.assertInitialized();
    console.debug(`[${this.getServiceName()}:${this.serviceInstanceId}] ejbActivate invoked`);
    this.markActivated();
  }

  override ejbPassivate(): void {
    this.assertActivated();
    console.debug(`[${this.getServiceName()}:${this.serviceInstanceId}] ejbPassivate invoked`);
    this.markPassivated();
  }

  override ejbRemove(): void {
    console.debug(`[${this.getServiceName()}:${this.serviceInstanceId}] ejbRemove invoked`);
    this.markRemoved();
  }

  override getServiceName(): string {
    return FizzBuzzManagedServiceBeanImpl.SERVICE_NAME;
  }

  override getValueResolver(): ICompositeValueResolver {
    this.assertInitialized();
    this.assertActivated();
    return {
      resolve: (value: number): string => {
        this.transactionManager.beginTransaction();
        try {
          const result = this.delegateResolver.resolve(value);
          this.transactionManager.commitTransaction();
          return result;
        } catch (error) {
          this.transactionManager.rollbackTransaction();
          throw error;
        }
      },
    };
  }

  getServiceInstanceId(): string {
    return this.serviceInstanceId;
  }
}
