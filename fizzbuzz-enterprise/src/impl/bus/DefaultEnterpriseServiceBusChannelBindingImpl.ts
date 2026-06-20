import type { IEnterpriseServiceBusChannel } from "../../contracts/IEnterpriseServiceBusChannel.js";
import type { IEnterpriseServiceBusMessageRouter } from "../../contracts/IEnterpriseServiceBusMessageRouter.js";
import type { IEnterpriseServiceBusMessage } from "../../contracts/IEnterpriseServiceBusMessage.js";
import type { IEnterpriseServiceBusChannelBinding } from "../../contracts/IEnterpriseServiceBusChannelBinding.js";
import { AbstractBaseEnterpriseServiceBusMessageRouter } from "../../abstracts/AbstractBaseEnterpriseServiceBusMessageRouter.js";

export class DefaultEnterpriseServiceBusChannelBindingImpl implements IEnterpriseServiceBusChannelBinding {
  private readonly channel: IEnterpriseServiceBusChannel;
  private readonly router: IEnterpriseServiceBusMessageRouter;
  private readonly bindingName: string;
  private readonly bindingVersion: string;

  constructor(
    channel: IEnterpriseServiceBusChannel,
    router: IEnterpriseServiceBusMessageRouter,
    bindingName: string = "DefaultEnterpriseServiceBusChannelBinding",
    bindingVersion: string = "1.0.0-ESB-BINDING",
  ) {
    this.channel = channel;
    this.router = router;
    this.bindingName = bindingName;
    this.bindingVersion = bindingVersion;
  }

  getChannel(): IEnterpriseServiceBusChannel {
    return this.channel;
  }

  getRouter(): IEnterpriseServiceBusMessageRouter {
    return this.router;
  }

  send(message: IEnterpriseServiceBusMessage, destinationChannelName: string): void {
    this.router.route(message, destinationChannelName);
  }

  receive(message: IEnterpriseServiceBusMessage): void {
    this.channel.publish(message);
  }

  getBindingName(): string {
    return this.bindingName;
  }

  getBindingVersion(): string {
    return this.bindingVersion;
  }
}
