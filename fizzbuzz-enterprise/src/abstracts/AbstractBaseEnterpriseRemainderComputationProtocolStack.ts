import type { IEnterpriseRemainderComputationProtocolLayer } from "../contracts/IEnterpriseRemainderComputationProtocolLayer.js";
import type { IEnterpriseRemainderComputationProtocolStack } from "../contracts/IEnterpriseRemainderComputationProtocolStack.js";
import type { IComputationProtocolContext } from "../contracts/IComputationProtocolContext.js";

export abstract class AbstractBaseEnterpriseRemainderComputationProtocolStack
  implements IEnterpriseRemainderComputationProtocolStack
{
  private readonly layers: IEnterpriseRemainderComputationProtocolLayer[] = [];
  private topLayer: IEnterpriseRemainderComputationProtocolLayer | null = null;
  private initialised: boolean = false;

  abstract getStackName(): string;
  abstract getStackVersion(): string;

  protected setLayers(layers: readonly IEnterpriseRemainderComputationProtocolLayer[]): void {
    this.layers.length = 0;
    this.layers.push(...layers);
    this.initialised = false;
  }

  private ensureStackLinked(): void {
    if (this.initialised) {
      return;
    }
    if (this.layers.length === 0) {
      throw new Error(
        `[${this.getStackName()}] No protocol layers registered in the stack`,
      );
    }
    const sorted = [...this.layers].sort((a, b) => b.getLayerNumber() - a.getLayerNumber());
    this.topLayer = sorted[0]!;
    for (let i = 0; i < sorted.length - 1; i++) {
      sorted[i]!.setNextLayer(sorted[i + 1]!);
    }
    this.initialised = true;
  }

  computeRemainder(dividend: number, divisor: number): number {
    this.ensureStackLinked();
    const context = this.createDefaultContext(dividend, divisor);
    return this.computeRemainderWithContext(dividend, divisor, context);
  }

  computeRemainderWithContext(dividend: number, divisor: number, context: IComputationProtocolContext): number {
    this.ensureStackLinked();
    if (this.topLayer === null) {
      throw new Error(
        `[${this.getStackName()}] Top layer is null after stack initialisation`,
      );
    }
    const result = this.topLayer.processLayer(dividend, divisor, context);
    context.markContextCompleted();
    return result;
  }

  getRegisteredLayerCount(): number {
    return this.layers.length;
  }

  getRegisteredLayers(): readonly IEnterpriseRemainderComputationProtocolLayer[] {
    return [...this.layers];
  }

  isOperational(): boolean {
    return this.initialised && this.layers.length > 0 && this.topLayer !== null;
  }

  protected abstract createDefaultContext(dividend: number, divisor: number): IComputationProtocolContext;
}
