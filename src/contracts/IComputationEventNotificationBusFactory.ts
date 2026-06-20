import type { IComputationEventNotificationBus } from "./IComputationEventNotificationBus.js";

export interface IComputationEventNotificationBusFactory {
  createNotificationBus(): IComputationEventNotificationBus;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
}
