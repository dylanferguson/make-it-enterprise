import type { IComputationRequestAdapter } from "../contracts/IComputationRequestAdapter.js";
import type { IComputationRequestPrototype } from "../contracts/IComputationRequestPrototype.js";

export abstract class AbstractBaseComputationRequestAdapter implements IComputationRequestAdapter {
  protected abstract get adapterName(): string;
  protected abstract get adapterVersion(): string;
  protected abstract get adapterType(): string;
  protected abstract get adapterCapabilities(): readonly string[];

  getAdapterName(): string { return this.adapterName; }
  getAdapterVersion(): string { return this.adapterVersion; }
  getAdapterType(): string { return this.adapterType; }
  getAdapterCapabilities(): readonly string[] { return this.adapterCapabilities; }

  abstract adaptPrototypeToResolution(
    prototype: IComputationRequestPrototype<string>,
    resolutionDelegate: (value: number) => string,
  ): string;

  abstract adaptRangeRequest(
    start: number,
    end: number,
    resolutionDelegate: (value: number) => string,
  ): readonly string[];

  protected validatePrototype(prototype: IComputationRequestPrototype<string>): void {
    if (prototype.isResolved()) {
      throw new Error(
        `[${this.adapterName}] Cannot adapt already resolved prototype: ${prototype.getPrototypeDescriptorName()} (id=${prototype.getPrototypeId()})`,
      );
    }
  }
}
