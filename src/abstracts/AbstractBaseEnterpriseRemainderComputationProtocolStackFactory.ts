import type { IEnterpriseRemainderComputationProtocolStack } from "../contracts/IEnterpriseRemainderComputationProtocolStack.js";
import type { IEnterpriseRemainderComputationProtocolStackFactory } from "../contracts/IEnterpriseRemainderComputationProtocolStackFactory.js";

export abstract class AbstractBaseEnterpriseRemainderComputationProtocolStackFactory
  implements IEnterpriseRemainderComputationProtocolStackFactory
{
  abstract createProtocolStack(): IEnterpriseRemainderComputationProtocolStack;
  abstract getFactoryName(): string;
  abstract getFactoryVersion(): string;
  abstract getSupportedLayerIdentifiers(): readonly string[];

  createProtocolStackWithCustomLayers(_layerIdentifiers: readonly string[]): IEnterpriseRemainderComputationProtocolStack {
    return this.createProtocolStack();
  }

  protected resolveLayerClass(_identifier: string): string | null {
    return null;
  }
}
