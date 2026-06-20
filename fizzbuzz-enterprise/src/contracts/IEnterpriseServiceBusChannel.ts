import type { IEnterpriseServiceBusMessage } from "./IEnterpriseServiceBusMessage.js";

export interface IEnterpriseServiceBusChannel {
  publish(message: IEnterpriseServiceBusMessage): void;
  subscribe(consumer: (message: IEnterpriseServiceBusMessage) => void): string;
  unsubscribe(subscriptionId: string): boolean;
  getChannelName(): string;
  getChannelType(): string;
  getMessageCount(): number;
  isDurable(): boolean;
}
