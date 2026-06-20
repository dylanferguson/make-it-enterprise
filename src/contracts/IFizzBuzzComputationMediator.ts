import type { IFizzBuzzComputationBridge } from "./IFizzBuzzComputationBridge.js";
import type { IComputationEventNotificationBus } from "./IComputationEventNotificationBus.js";
import type { IFizzBuzzSessionManager } from "./IFizzBuzzSessionManager.js";
import type { ITransactionManager } from "./ITransactionManager.js";
import type { ISloMetricsCollector } from "./ISloMetricsCollector.js";
import type { IFizzBuzzComputationMemento } from "./IFizzBuzzComputationMemento.js";

export interface IFizzBuzzComputationMediator {
  mediateValueResolution(value: number): string;
  mediateRangeCalculation(start: number, end: number): readonly string[];
  getMediatorName(): string;
  getMediatorVersion(): string;
  getBridge(): IFizzBuzzComputationBridge;
  getEventBus(): IComputationEventNotificationBus;
  getSessionManager(): IFizzBuzzSessionManager;
  getTransactionManager(): ITransactionManager;
  getSloMetricsCollector(): ISloMetricsCollector;
  createComputationMemento(value: number, result: string): IFizzBuzzComputationMemento;
}
