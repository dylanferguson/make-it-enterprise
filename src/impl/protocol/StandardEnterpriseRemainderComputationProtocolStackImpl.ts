import { AbstractBaseEnterpriseRemainderComputationProtocolStack } from "../../abstracts/AbstractBaseEnterpriseRemainderComputationProtocolStack.js";
import type { IEnterpriseRemainderComputationProtocolLayer } from "../../contracts/IEnterpriseRemainderComputationProtocolLayer.js";
import type { IComputationProtocolContext } from "../../contracts/IComputationProtocolContext.js";
import { ApplicationLayerComputationProtocolImpl } from "./ApplicationLayerComputationProtocolImpl.js";
import { PresentationLayerComputationProtocolImpl } from "./PresentationLayerComputationProtocolImpl.js";
import { SessionLayerComputationProtocolImpl } from "./SessionLayerComputationProtocolImpl.js";
import { TransportLayerComputationProtocolImpl } from "./TransportLayerComputationProtocolImpl.js";
import { NetworkLayerComputationProtocolImpl } from "./NetworkLayerComputationProtocolImpl.js";
import { DataLinkLayerComputationProtocolImpl } from "./DataLinkLayerComputationProtocolImpl.js";
import { PhysicalLayerComputationProtocolImpl } from "./PhysicalLayerComputationProtocolImpl.js";
import { StandardComputationProtocolContextImpl } from "./StandardComputationProtocolContextImpl.js";

export class StandardEnterpriseRemainderComputationProtocolStackImpl extends AbstractBaseEnterpriseRemainderComputationProtocolStack {
  private static readonly STACK_NAME = "StandardEnterpriseRemainderComputationProtocolStack";
  private static readonly STACK_VERSION = "1.0.0-ENTERPRISE-PROTOCOL-STACK";

  constructor(customLayers?: readonly IEnterpriseRemainderComputationProtocolLayer[]) {
    super();
    const layers = customLayers ?? [
      new ApplicationLayerComputationProtocolImpl(),
      new PresentationLayerComputationProtocolImpl(),
      new SessionLayerComputationProtocolImpl(),
      new TransportLayerComputationProtocolImpl(),
      new NetworkLayerComputationProtocolImpl(),
      new DataLinkLayerComputationProtocolImpl(),
      new PhysicalLayerComputationProtocolImpl(),
    ];
    this.setLayers(layers);
  }

  override getStackName(): string {
    return StandardEnterpriseRemainderComputationProtocolStackImpl.STACK_NAME;
  }

  override getStackVersion(): string {
    return StandardEnterpriseRemainderComputationProtocolStackImpl.STACK_VERSION;
  }

  protected override createDefaultContext(dividend: number, divisor: number): IComputationProtocolContext {
    const context = new StandardComputationProtocolContextImpl(dividend, divisor);
    context.setAttribute("stack.name", this.getStackName());
    context.setAttribute("stack.version", this.getStackVersion());
    return context;
  }
}
