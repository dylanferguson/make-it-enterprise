import type { IComputationRequestPrototype } from "./IComputationRequestPrototype.js";

export interface IComputationRequestAdapter {
  getAdapterName(): string;
  getAdapterVersion(): string;
  adaptPrototypeToResolution(prototype: IComputationRequestPrototype<string>, resolutionDelegate: (value: number) => string): string;
  adaptRangeRequest(start: number, end: number, resolutionDelegate: (value: number) => string): readonly string[];
  getAdapterType(): string;
  getAdapterCapabilities(): readonly string[];
}
