import { AbstractBaseEnterpriseFizzBuzzDocumentBuilder } from "../abstracts/AbstractBaseEnterpriseFizzBuzzDocumentBuilder.js";
import type { IEnterpriseFizzBuzzComputationResultDocument } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import { DocumentNodeType } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import { FizzBuzzDocumentNodeImpl } from "./FizzBuzzDocumentNodeImpl.js";
import { NumberDocumentNodeImpl } from "./NumberDocumentNodeImpl.js";
import { UnresolvedDocumentNodeImpl } from "./UnresolvedDocumentNodeImpl.js";

export class EnterpriseFizzBuzzDocumentBuilderImpl extends AbstractBaseEnterpriseFizzBuzzDocumentBuilder {
  private static readonly BUILDER_NAME = "EnterpriseFizzBuzzDocumentBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-DOCUMENT-BUILDER-IMPL";

  private buildCount: number = 0;

  override getBuilderName(): string {
    return EnterpriseFizzBuzzDocumentBuilderImpl.BUILDER_NAME;
  }

  override getBuilderVersion(): string {
    return EnterpriseFizzBuzzDocumentBuilderImpl.BUILDER_VERSION;
  }

  override buildDocument(
    value: number,
    resolvedString: string,
  ): IEnterpriseFizzBuzzComputationResultDocument {
    this.assertValidInputs(value, resolvedString);
    this.buildCount++;
    const nodeType = this.resolveNodeTypeFromContent(resolvedString);
    return this.instantiateNode(nodeType, value, resolvedString);
  }

  override buildCompositeDocument(
    value: number,
    resolvedString: string,
    childDocuments: readonly IEnterpriseFizzBuzzComputationResultDocument[],
  ): IEnterpriseFizzBuzzComputationResultDocument {
    this.assertValidInputs(value, resolvedString);
    this.buildCount++;
    const compositeNode = new FizzBuzzDocumentNodeImpl(value, resolvedString);
    for (const child of childDocuments) {
      compositeNode.addChildDocument(child);
    }
    return compositeNode;
  }

  override reset(): void {
    this.buildCount = 0;
  }

  getBuildCount(): number {
    return this.buildCount;
  }

  private assertValidInputs(value: number, resolvedString: string): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${EnterpriseFizzBuzzDocumentBuilderImpl.BUILDER_NAME}] ` +
        `Value must be finite, received: ${value}`,
      );
    }
    if (resolvedString === null || resolvedString === undefined) {
      throw new Error(
        `[${EnterpriseFizzBuzzDocumentBuilderImpl.BUILDER_NAME}] ` +
        `Resolved string must not be null or undefined`,
      );
    }
  }

  private instantiateNode(
    nodeType: DocumentNodeType,
    value: number,
    content: string,
  ): IEnterpriseFizzBuzzComputationResultDocument {
    switch (nodeType) {
      case DocumentNodeType.FIZZBUZZ_COMPOSITE:
      case DocumentNodeType.FIZZ:
      case DocumentNodeType.BUZZ:
        return new FizzBuzzDocumentNodeImpl(value, content);
      case DocumentNodeType.NUMBER:
        return new NumberDocumentNodeImpl(value, content);
      case DocumentNodeType.UNRESOLVED:
      default:
        return new UnresolvedDocumentNodeImpl(value, content);
    }
  }
}
