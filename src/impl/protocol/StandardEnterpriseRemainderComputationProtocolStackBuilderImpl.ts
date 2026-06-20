import { AbstractBaseEnterpriseRemainderComputationProtocolStackBuilder } from "../../abstracts/AbstractBaseEnterpriseRemainderComputationProtocolStackBuilder.js";
import type { IEnterpriseRemainderComputationProtocolStack } from "../../contracts/IEnterpriseRemainderComputationProtocolStack.js";
import type { IEnterpriseRemainderComputationProtocolLayer } from "../../contracts/IEnterpriseRemainderComputationProtocolLayer.js";
import { StandardEnterpriseRemainderComputationProtocolStackImpl } from "./StandardEnterpriseRemainderComputationProtocolStackImpl.js";
import { ApplicationLayerComputationProtocolImpl } from "./ApplicationLayerComputationProtocolImpl.js";
import { PresentationLayerComputationProtocolImpl } from "./PresentationLayerComputationProtocolImpl.js";
import { SessionLayerComputationProtocolImpl } from "./SessionLayerComputationProtocolImpl.js";
import { TransportLayerComputationProtocolImpl } from "./TransportLayerComputationProtocolImpl.js";
import { NetworkLayerComputationProtocolImpl } from "./NetworkLayerComputationProtocolImpl.js";
import { DataLinkLayerComputationProtocolImpl } from "./DataLinkLayerComputationProtocolImpl.js";
import { PhysicalLayerComputationProtocolImpl } from "./PhysicalLayerComputationProtocolImpl.js";

export class StandardEnterpriseRemainderComputationProtocolStackBuilderImpl
  extends AbstractBaseEnterpriseRemainderComputationProtocolStackBuilder
{
  private static readonly BUILDER_NAME = "StandardEnterpriseRemainderComputationProtocolStackBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-PROTOCOL-STACK-BUILDER";

  constructor(includeDefaultLayers: boolean = true) {
    super();
    if (includeDefaultLayers) {
      this.withLayer(new ApplicationLayerComputationProtocolImpl());
      this.withLayer(new PresentationLayerComputationProtocolImpl());
      this.withLayer(new SessionLayerComputationProtocolImpl());
      this.withLayer(new TransportLayerComputationProtocolImpl());
      this.withLayer(new NetworkLayerComputationProtocolImpl());
      this.withLayer(new DataLinkLayerComputationProtocolImpl());
      this.withLayer(new PhysicalLayerComputationProtocolImpl());
    }
  }

  override getBuilderName(): string {
    return StandardEnterpriseRemainderComputationProtocolStackBuilderImpl.BUILDER_NAME;
  }

  override getBuilderVersion(): string {
    return StandardEnterpriseRemainderComputationProtocolStackBuilderImpl.BUILDER_VERSION;
  }

  override build(): IEnterpriseRemainderComputationProtocolStack {
    const sortedLayers = this.getSortedLayers();
    if (sortedLayers.length === 0) {
      throw new Error(
        `[${this.getBuilderName()}] Cannot build protocol stack: no layers registered`,
      );
    }
    const missingLayerNumbers: number[] = [];
    for (let i = 1; i <= 7; i++) {
      if (!this.layers.has(i)) {
        missingLayerNumbers.push(i);
      }
    }
    if (missingLayerNumbers.length > 0) {
      console.debug(
        `[${this.getBuilderName()}] Building protocol stack without layers: [${missingLayerNumbers.join(", ")}]`,
      );
    }
    return new StandardEnterpriseRemainderComputationProtocolStackImpl(sortedLayers);
  }
}
