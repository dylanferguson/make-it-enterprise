import { AbstractBaseEnterpriseRemainderComputationProtocolStackFactory } from "../../abstracts/AbstractBaseEnterpriseRemainderComputationProtocolStackFactory.js";
import type { IEnterpriseRemainderComputationProtocolStack } from "../../contracts/IEnterpriseRemainderComputationProtocolStack.js";
import { StandardEnterpriseRemainderComputationProtocolStackBuilderImpl } from "./StandardEnterpriseRemainderComputationProtocolStackBuilderImpl.js";

export class StandardEnterpriseRemainderComputationProtocolStackFactoryImpl
  extends AbstractBaseEnterpriseRemainderComputationProtocolStackFactory
{
  private static readonly FACTORY_NAME = "StandardEnterpriseRemainderComputationProtocolStackFactory";
  private static readonly FACTORY_VERSION = "1.0.0-PROTOCOL-STACK-FACTORY";
  private static readonly SUPPORTED_LAYER_IDENTIFIERS = [
    "ApplicationLayer",
    "PresentationLayer",
    "SessionLayer",
    "TransportLayer",
    "NetworkLayer",
    "DataLinkLayer",
    "PhysicalLayer",
  ];

  override getFactoryName(): string {
    return StandardEnterpriseRemainderComputationProtocolStackFactoryImpl.FACTORY_NAME;
  }

  override getFactoryVersion(): string {
    return StandardEnterpriseRemainderComputationProtocolStackFactoryImpl.FACTORY_VERSION;
  }

  override getSupportedLayerIdentifiers(): readonly string[] {
    return StandardEnterpriseRemainderComputationProtocolStackFactoryImpl.SUPPORTED_LAYER_IDENTIFIERS;
  }

  override createProtocolStack(): IEnterpriseRemainderComputationProtocolStack {
    return new StandardEnterpriseRemainderComputationProtocolStackBuilderImpl(true).build();
  }

  override createProtocolStackWithCustomLayers(layerIdentifiers: readonly string[]): IEnterpriseRemainderComputationProtocolStack {
    const builder = new StandardEnterpriseRemainderComputationProtocolStackBuilderImpl(false);
    for (const _identifier of layerIdentifiers) {
    }
    return builder.build();
  }
}
