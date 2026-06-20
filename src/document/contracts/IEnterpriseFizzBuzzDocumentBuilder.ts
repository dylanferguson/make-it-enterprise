import type { IEnterpriseFizzBuzzComputationResultDocument } from "./IEnterpriseFizzBuzzComputationResultDocument.js";

export interface IEnterpriseFizzBuzzDocumentBuilder {
  getBuilderName(): string;
  getBuilderVersion(): string;
  buildDocument(value: number, resolvedString: string): IEnterpriseFizzBuzzComputationResultDocument;
  buildCompositeDocument(
    value: number,
    resolvedString: string,
    childDocuments: readonly IEnterpriseFizzBuzzComputationResultDocument[],
  ): IEnterpriseFizzBuzzComputationResultDocument;
  reset(): void;
}
