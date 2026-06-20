import { AbstractBaseEnterpriseTransactionContextPropagatingResolutionFacadeDecorator } from "../../abstracts/AbstractBaseEnterpriseTransactionContextPropagatingResolutionFacadeDecorator.js";
import type { IEnterpriseUserTransaction } from "../../contracts/IEnterpriseUserTransaction.js";
import type { IEnterpriseTransactionSynchronizationRegistry } from "../../contracts/IEnterpriseTransactionSynchronizationRegistry.js";
import type { IEnterpriseTransactionRollbackStrategy } from "../../contracts/IEnterpriseTransactionRollbackStrategy.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export class TransactionContextPropagatingResolutionFacadeDecoratorImpl
  extends AbstractBaseEnterpriseTransactionContextPropagatingResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "TransactionContextPropagatingResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-TX-PROPAGATION-DECORATOR";

  private readonly userTransaction: IEnterpriseUserTransaction;
  private readonly synchronizationRegistry: IEnterpriseTransactionSynchronizationRegistry;
  private readonly rollbackStrategy: IEnterpriseTransactionRollbackStrategy;
  private resolutionCount: number = 0;
  private transactionCount: number = 0;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    userTransaction: IEnterpriseUserTransaction,
    synchronizationRegistry: IEnterpriseTransactionSynchronizationRegistry,
    rollbackStrategy: IEnterpriseTransactionRollbackStrategy,
    transactionAttributeType: string,
  ) {
    super(wrappedFacade, transactionAttributeType);
    this.userTransaction = userTransaction;
    this.synchronizationRegistry = synchronizationRegistry;
    this.rollbackStrategy = rollbackStrategy;
  }

  override resolveValue(value: number): string {
    this.resolutionCount++;
    const ctx = this.buildOperationContext(value);
    console.debug(
      `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] ` +
      `Transaction context propagation for value [${value}] ` +
      `context=[${ctx}], attribute=[${this.transactionAttributeType}], ` +
      `userTransaction=[${this.userTransaction.getUserTransactionName()}], ` +
      `registry=[${this.synchronizationRegistry.getRegistryName()}], ` +
      `rollbackStrategy=[${this.rollbackStrategy.getRollbackStrategyName()}]`,
    );
    this.userTransaction.begin();
    this.transactionCount++;
    this.synchronizationRegistry.putResource(
      `computation-value-${value}`,
      value,
    );
    try {
      const result = this.wrappedFacade.resolveValue(value);
      this.synchronizationRegistry.notifyBeforeCompletion();
      this.userTransaction.commit();
      this.synchronizationRegistry.notifyAfterCompletion("COMMITTED");
      return result;
    } catch (error) {
      this.synchronizationRegistry.notifyBeforeCompletion();
      if (error instanceof Error && this.rollbackStrategy.isRollbackRequired(error)) {
        this.userTransaction.rollback();
        this.synchronizationRegistry.notifyAfterCompletion("ROLLED_BACK");
      } else {
        this.synchronizationRegistry.notifyAfterCompletion("COMMITTED");
      }
      throw error;
    }
  }

  override resolveRange(start: number, end: number): readonly string[] {
    if (end < start) {
      throw new Error(
        `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] ` +
        `Range end [${end}] must be >= start [${start}]`,
      );
    }
    const ctx = this.buildOperationContext(start);
    console.debug(
      `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] ` +
      `Transaction context propagation for range [${start}..${end}] ` +
      `context=[${ctx}], attribute=[${this.transactionAttributeType}]`,
    );
    this.userTransaction.begin();
    this.transactionCount++;
    try {
      const results = this.wrappedFacade.resolveRange(start, end);
      this.userTransaction.commit();
      return results;
    } catch (error) {
      if (error instanceof Error && this.rollbackStrategy.isRollbackRequired(error)) {
        this.userTransaction.rollback();
      }
      throw error;
    }
  }

  override getFacadeName(): string {
    return `${this.getDecoratorName()}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return TransactionContextPropagatingResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorName(): string {
    return TransactionContextPropagatingResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return TransactionContextPropagatingResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getResolutionCount(): number {
    return this.resolutionCount;
  }

  getTransactionCount(): number {
    return this.transactionCount;
  }
}
