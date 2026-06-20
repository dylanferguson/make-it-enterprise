import type { IEnterpriseServiceBusMessage } from "../../contracts/IEnterpriseServiceBusMessage.js";
import { AbstractBaseEnterpriseServiceBusMessageRouter } from "../../abstracts/AbstractBaseEnterpriseServiceBusMessageRouter.js";

export class StandardEnterpriseServiceBusMessageRouterImpl extends AbstractBaseEnterpriseServiceBusMessageRouter {
  private static readonly ROUTER_NAME = "StandardEnterpriseServiceBusMessageRouter";
  private static readonly ROUTER_VERSION = "1.0.0-ENTERPRISE-ESB-ROUTER";

  override getRouterName(): string {
    return StandardEnterpriseServiceBusMessageRouterImpl.ROUTER_NAME;
  }

  override getRouterVersion(): string {
    return StandardEnterpriseServiceBusMessageRouterImpl.ROUTER_VERSION;
  }

  override determineRoutingKey(message: IEnterpriseServiceBusMessage): string {
    const messageType = message.getMessageType();
    if (messageType.includes("EVALUATION") || messageType.includes("COMPUTATION")) {
      return "computation-channel";
    }
    if (messageType.includes("NORMALIZATION")) {
      return "normalization-channel";
    }
    if (messageType.includes("RESULT")) {
      return "result-channel";
    }
    return "default-channel";
  }
}
