import type { IEnterpriseComputationResolutionAdapter } from "../contracts/IEnterpriseComputationResolutionAdapter.js";
import type { IEnterpriseComputationResolutionAdapterVisitor } from "../contracts/IEnterpriseComputationResolutionAdapterVisitor.js";

export abstract class AbstractBaseEnterpriseComputationResolutionAdapterVisitor
  implements IEnterpriseComputationResolutionAdapterVisitor
{
  protected readonly visitorName: string;
  protected readonly visitorVersion: string;
  protected readonly visitorDescription: string;
  protected visitCount: number;

  constructor(
    visitorName: string,
    visitorVersion: string,
    visitorDescription: string,
  ) {
    this.visitorName = visitorName;
    this.visitorVersion = visitorVersion;
    this.visitorDescription = visitorDescription;
    this.visitCount = 0;
  }

  abstract visitAdapter(
    adapter: IEnterpriseComputationResolutionAdapter,
    value: number,
  ): string | null;

  visitAllAdapters(
    adapters: readonly IEnterpriseComputationResolutionAdapter[],
    value: number,
  ): readonly string[] {
    const results: string[] = [];
    for (const adapter of adapters) {
      const result = this.visitAdapter(adapter, value);
      if (result !== null) {
        results.push(result);
      }
    }
    return results;
  }

  getVisitorName(): string {
    return this.visitorName;
  }

  getVisitorVersion(): string {
    return this.visitorVersion;
  }

  getVisitorDescription(): string {
    return this.visitorDescription;
  }

  resetVisitorState(): void {
    this.visitCount = 0;
  }
}
