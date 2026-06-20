import { AbstractBaseEnterpriseServiceBusChannel } from "../../abstracts/AbstractBaseEnterpriseServiceBusChannel.js";

export class EnterpriseServiceBusChannelImpl extends AbstractBaseEnterpriseServiceBusChannel {
  constructor(
    channelName: string,
    channelType: string = "STANDARD_MESSAGE_CHANNEL",
    durable: boolean = false,
  ) {
    super(channelName, channelType, durable);
  }

  override getChannelName(): string {
    const nameField = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(Object.getPrototypeOf(this)),
      "getChannelName",
    );
    return nameField?.value?.call(this) ?? "EnterpriseServiceBusChannel";
  }

  override getChannelType(): string {
    return "STANDARD_MESSAGE_CHANNEL";
  }
}
