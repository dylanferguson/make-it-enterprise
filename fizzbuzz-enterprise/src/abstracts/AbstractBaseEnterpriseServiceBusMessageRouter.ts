import type { IEnterpriseServiceBusChannel } from "../contracts/IEnterpriseServiceBusChannel.js";
import type { IEnterpriseServiceBusMessage } from "../contracts/IEnterpriseServiceBusMessage.js";
import type { IEnterpriseServiceBusMessageRouter } from "../contracts/IEnterpriseServiceBusMessageRouter.js";

export abstract class AbstractBaseEnterpriseServiceBusMessageRouter
  implements IEnterpriseServiceBusMessageRouter
{
  private readonly channels: Map<string, IEnterpriseServiceBusChannel> = new Map();

  abstract getRouterName(): string;
  abstract getRouterVersion(): string;

  abstract determineRoutingKey(message: IEnterpriseServiceBusMessage): string;

  route(message: IEnterpriseServiceBusMessage, destinationChannelName: string): void {
    const channel = this.channels.get(destinationChannelName);
    if (channel === undefined) {
      throw new Error(
        `[${this.getRouterName()}] No channel registered with name: ${destinationChannelName}`,
      );
    }
    channel.publish(message);
  }

  registerChannel(channel: IEnterpriseServiceBusChannel): void {
    this.channels.set(channel.getChannelName(), channel);
  }

  unregisterChannel(channelName: string): boolean {
    return this.channels.delete(channelName);
  }

  resolveChannel(channelName: string): IEnterpriseServiceBusChannel | null {
    return this.channels.get(channelName) ?? null;
  }

  getRegisteredChannelCount(): number {
    return this.channels.size;
  }
}
