import type { IEnterpriseServiceBusChannel } from "./IEnterpriseServiceBusChannel.js";
import type { IEnterpriseServiceBusMessageRouter } from "./IEnterpriseServiceBusMessageRouter.js";
import type { IEnterpriseServiceBusMessage } from "./IEnterpriseServiceBusMessage.js";

export interface IEnterpriseServiceBusChannelBinding {
  getChannel(): IEnterpriseServiceBusChannel;
  getRouter(): IEnterpriseServiceBusMessageRouter;
  send(message: IEnterpriseServiceBusMessage, destinationChannelName: string): void;
  receive(message: IEnterpriseServiceBusMessage): void;
  getBindingName(): string;
  getBindingVersion(): string;
}
