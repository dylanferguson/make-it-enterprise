import type { IEnterpriseComputationResolutionAdapter } from "./IEnterpriseComputationResolutionAdapter.js";

export interface IEnterpriseComputationResolutionAdapterVisitor {
  visitAdapter(adapter: IEnterpriseComputationResolutionAdapter, value: number): string | null;
  visitAllAdapters(adapters: readonly IEnterpriseComputationResolutionAdapter[], value: number): readonly string[];
  getVisitorName(): string;
  getVisitorVersion(): string;
  getVisitorDescription(): string;
  resetVisitorState(): void;
}
