import { AbstractBaseEnterpriseFizzBuzzComputationResultDocument } from "../abstracts/AbstractBaseEnterpriseFizzBuzzComputationResultDocument.js";
import { DocumentNodeType } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import { DocumentVisitOutcome } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";

export class UnresolvedDocumentNodeImpl extends AbstractBaseEnterpriseFizzBuzzComputationResultDocument {
  private static readonly UNRESOLVED_NODE_NAME = "UnresolvedDocumentNode";
  private static readonly UNRESOLVED_NODE_VERSION = "1.0.0-UNRESOLVED-DOCUMENT-NODE";

  constructor(originalValue: number, resolvedContent: string) {
    super(
      DocumentNodeType.UNRESOLVED,
      UnresolvedDocumentNodeImpl.UNRESOLVED_NODE_NAME,
      UnresolvedDocumentNodeImpl.UNRESOLVED_NODE_VERSION,
      `unresolved:doc:node:${originalValue}`,
      originalValue,
      resolvedContent,
    );
  }

  override accept(visitor: IEnterpriseFizzBuzzDocumentVisitor): DocumentVisitOutcome {
    return visitor.visitDocument(this);
  }
}
