import { AbstractBaseEnterpriseFizzBuzzComputationResultDocument } from "../abstracts/AbstractBaseEnterpriseFizzBuzzComputationResultDocument.js";
import { DocumentNodeType } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import { DocumentVisitOutcome } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";

export class FizzBuzzDocumentNodeImpl extends AbstractBaseEnterpriseFizzBuzzComputationResultDocument {
  private static readonly FIZZBUZZ_NODE_NAME = "FizzBuzzCompositeDocumentNode";
  private static readonly FIZZBUZZ_NODE_VERSION = "1.0.0-FIZZBUZZ-DOCUMENT-NODE";

  constructor(originalValue: number, resolvedContent: string) {
    super(
      DocumentNodeType.FIZZBUZZ_COMPOSITE,
      FizzBuzzDocumentNodeImpl.FIZZBUZZ_NODE_NAME,
      FizzBuzzDocumentNodeImpl.FIZZBUZZ_NODE_VERSION,
      `fizzbuzz:doc:node:${originalValue}`,
      originalValue,
      resolvedContent,
    );
  }

  override accept(visitor: IEnterpriseFizzBuzzDocumentVisitor): DocumentVisitOutcome {
    this.incrementVisitedCount();
    const outcome = visitor.visitDocument(this);
    if (outcome === DocumentVisitOutcome.TERMINATE || outcome === DocumentVisitOutcome.SKIP_CHILDREN) {
      return outcome;
    }
    for (const child of this.getChildDocuments()) {
      const childOutcome = child.accept(visitor);
      if (childOutcome === DocumentVisitOutcome.TERMINATE) {
        return DocumentVisitOutcome.TERMINATE;
      }
    }
    return DocumentVisitOutcome.CONTINUE;
  }

  private incrementVisitedCount(): void {
  }
}
