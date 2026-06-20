import { AbstractBaseEnterpriseFizzBuzzComputationResultDocument } from "../abstracts/AbstractBaseEnterpriseFizzBuzzComputationResultDocument.js";
import { DocumentNodeType } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import { DocumentVisitOutcome } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";

export class NumberDocumentNodeImpl extends AbstractBaseEnterpriseFizzBuzzComputationResultDocument {
  private static readonly NUMBER_NODE_NAME = "NumberDocumentNode";
  private static readonly NUMBER_NODE_VERSION = "1.0.0-NUMBER-DOCUMENT-NODE";

  constructor(originalValue: number, resolvedContent: string) {
    super(
      DocumentNodeType.NUMBER,
      NumberDocumentNodeImpl.NUMBER_NODE_NAME,
      NumberDocumentNodeImpl.NUMBER_NODE_VERSION,
      `number:doc:node:${originalValue}`,
      originalValue,
      resolvedContent,
    );
  }

  override accept(visitor: IEnterpriseFizzBuzzDocumentVisitor): DocumentVisitOutcome {
    return visitor.visitDocument(this);
  }
}
