import type { IEnterpriseServiceBusChannel } from "./IEnterpriseServiceBusChannel.js";
import type { IEnterpriseServiceBusMessage } from "./IEnterpriseServiceBusMessage.js";

export interface IEnterpriseServiceBusMessageRouter {
  route(message: IEnterpriseServiceBusMessage, destinationChannelName: string): void;
  registerChannel(channel: IEnterpriseServiceBusChannel): void;
  unregisterChannel(channelName: string): boolean;
  resolveChannel(channelName: string): IEnterpriseServiceBusChannel | null;
  getRouterName(): string;
  getRouterVersion(): string;
  getRegisteredChannelCount(): number;
}
