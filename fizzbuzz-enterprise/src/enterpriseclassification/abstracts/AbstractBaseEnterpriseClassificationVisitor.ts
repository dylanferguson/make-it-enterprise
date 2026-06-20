import type { IEnterpriseClassificationVisitor } from "../contracts/index.js";
import type { IEnterpriseClassificationChainHandler } from "../contracts/index.js";

export abstract class AbstractBaseEnterpriseClassificationVisitor
  implements IEnterpriseClassificationVisitor
{
  protected abstract readonly visitorName: string;
  protected abstract readonly visitorVersion: string;

  abstract visitValue(value: number): string | null;
  abstract visitCollection(value: number, results: readonly string[]): string;
  abstract getAggregatedClassification(value: number): string;

  protected abstract getChainHead(): IEnterpriseClassificationChainHandler | null;

  protected traverseChain(value: number): readonly string[] {
    const results: string[] = [];
    let current = this.getChainHead();
    while (current !== null) {
      const result = current.handleClassification(value);
      if (result !== null) {
        results.push(result);
      }
      current = current.getNextHandler();
    }
    return results;
  }

  getVisitorName(): string {
    return this.visitorName;
  }

  getVisitorVersion(): string {
    return this.visitorVersion;
  }
}
