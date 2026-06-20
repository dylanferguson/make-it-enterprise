import type { IFizzBuzzComputationMediator } from "../contracts/IFizzBuzzComputationMediator.js";
import type { IFizzBuzzComputationBridge } from "../contracts/IFizzBuzzComputationBridge.js";
import type { IComputationEventNotificationBus } from "../contracts/IComputationEventNotificationBus.js";
import type { IFizzBuzzSessionManager } from "../contracts/IFizzBuzzSessionManager.js";
import type { ITransactionManager } from "../contracts/ITransactionManager.js";
import type { ISloMetricsCollector } from "../contracts/ISloMetricsCollector.js";
import type { IFizzBuzzComputationMemento } from "../contracts/IFizzBuzzComputationMemento.js";
import type { IFizzBuzzComputationOriginator } from "../contracts/IFizzBuzzComputationOriginator.js";

export abstract class AbstractBaseFizzBuzzComputationMediator
  implements IFizzBuzzComputationMediator, IFizzBuzzComputationOriginator
{
  protected readonly bridge: IFizzBuzzComputationBridge;
  protected readonly eventBus: IComputationEventNotificationBus;
  protected readonly sessionManager: IFizzBuzzSessionManager;
  protected readonly transactionManager: ITransactionManager;
  protected readonly sloMetricsCollector: ISloMetricsCollector;
  protected readonly mementoHistory: IFizzBuzzComputationMemento[] = [];
  private static readonly MAX_MEMENTO_HISTORY = 100;
  private static readonly MEDIATOR_FRAMEWORK_VERSION = "1.0.0";

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

  abstract getMediatorName(): string;
  abstract getMediatorVersion(): string;

  getBridge(): IFizzBuzzComputationBridge { return this.bridge; }
  getEventBus(): IComputationEventNotificationBus { return this.eventBus; }
  getSessionManager(): IFizzBuzzSessionManager { return this.sessionManager; }
  getTransactionManager(): ITransactionManager { return this.transactionManager; }
  getSloMetricsCollector(): ISloMetricsCollector { return this.sloMetricsCollector; }

  abstract mediateValueResolution(value: number): string;
  abstract mediateRangeCalculation(start: number, end: number): readonly string[];

  abstract createMemento(value: number, result: string): IFizzBuzzComputationMemento;

  createComputationMemento(value: number, result: string): IFizzBuzzComputationMemento {
    return this.createMemento(value, result);
  }
  abstract restoreFromMemento(memento: IFizzBuzzComputationMemento): { value: number; result: string };

  getOriginatorName(): string {
    return `${this.getMediatorName()}Originator`;
  }

  getOriginatorVersion(): string {
    return `${this.getMediatorVersion()}-ORIGINATOR`;
  }

  protected recordMemento(memento: IFizzBuzzComputationMemento): void {
    this.mementoHistory.push(memento);
    if (this.mementoHistory.length > AbstractBaseFizzBuzzComputationMediator.MAX_MEMENTO_HISTORY) {
      this.mementoHistory.shift();
    }
  }

  getMementoHistory(): readonly IFizzBuzzComputationMemento[] {
    return [...this.mementoHistory];
  }

  protected beginTransaction(): void {
    this.transactionManager.beginTransaction();
  }

  protected commitTransaction(): void {
    this.transactionManager.commitTransaction();
  }

  protected rollbackTransaction(): void {
    this.transactionManager.rollbackTransaction();
  }

  protected recordSloMetric(operationName: string, durationMs: number, success: boolean): void {
    this.sloMetricsCollector.recordResolveOperation(durationMs, success);
  }

  protected getMediatorFrameworkVersion(): string {
    return AbstractBaseFizzBuzzComputationMediator.MEDIATOR_FRAMEWORK_VERSION;
  }
}
