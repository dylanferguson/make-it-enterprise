import type { IEnterpriseServiceBusMessage } from "../contracts/IEnterpriseServiceBusMessage.js";
import type { IEnterpriseServiceBusChannel } from "../contracts/IEnterpriseServiceBusChannel.js";

export abstract class AbstractBaseEnterpriseServiceBusChannel
  implements IEnterpriseServiceBusChannel
{
  private readonly subscriptions: Map<string, (message: IEnterpriseServiceBusMessage) => void> = new Map();
  private messageCount: number = 0;
  private readonly channelName: string;
  private readonly channelType: string;
  private readonly durable: boolean;

  constructor(channelName: string, channelType: string, durable: boolean = false) {
    this.channelName = channelName;
    this.channelType = channelType;
    this.durable = durable;
  }

  abstract getChannelName(): string;
  abstract getChannelType(): string;

  publish(message: IEnterpriseServiceBusMessage): void {
    this.messageCount++;
    for (const [, consumer] of this.subscriptions) {
      try {
        consumer(message);
      } catch {
        console.warn(`[${this.getChannelName()}] Consumer failed to process message ${message.getMessageId()}`);
      }
    }
  }

  subscribe(consumer: (message: IEnterpriseServiceBusMessage) => void): string {
    const subscriptionId = `sub:${this.channelName}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
    this.subscriptions.set(subscriptionId, consumer);
    return subscriptionId;
  }

  unsubscribe(subscriptionId: string): boolean {
    return this.subscriptions.delete(subscriptionId);
  }

  getMessageCount(): number {
    return this.messageCount;
  }

  isDurable(): boolean {
    return this.durable;
  }

  protected getConsumerCount(): number {
    return this.subscriptions.size;
  }
}
