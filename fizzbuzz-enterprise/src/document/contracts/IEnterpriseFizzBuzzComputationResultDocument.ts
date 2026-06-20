export enum DocumentNodeType {
  FIZZBUZZ_COMPOSITE = "FIZZBUZZ_COMPOSITE",
  FIZZ = "FIZZ",
  BUZZ = "BUZZ",
  FIZZBUZZ = "FIZZBUZZ",
  NUMBER = "NUMBER",
  UNRESOLVED = "UNRESOLVED",
}

export enum DocumentSerializationFormat {
  PLAIN_STRING = "PLAIN_STRING",
  CANONICAL_XML = "CANONICAL_XML",
  DIAGNOSTIC_JSON = "DIAGNOSTIC_JSON",
}

import type { IEnterpriseFizzBuzzDocumentVisitor } from "./IEnterpriseFizzBuzzDocumentVisitor.js";
import { DocumentVisitOutcome } from "./IEnterpriseFizzBuzzDocumentVisitor.js";

export interface IEnterpriseFizzBuzzComputationResultDocument {
  getDocumentNodeType(): DocumentNodeType;
  getDocumentNodeName(): string;
  getDocumentNodeVersion(): string;
  getDocumentNodeIdentifier(): string;
  getOriginalValue(): number;
  getResolvedContent(): string;
  getParentDocument(): IEnterpriseFizzBuzzComputationResultDocument | null;
  getChildDocuments(): readonly IEnterpriseFizzBuzzComputationResultDocument[];
  setParentDocument(parent: IEnterpriseFizzBuzzComputationResultDocument): void;
  addChildDocument(child: IEnterpriseFizzBuzzComputationResultDocument): void;
  hasChildDocuments(): boolean;
  getDocumentDepth(): number;
  accept(visitor: IEnterpriseFizzBuzzDocumentVisitor): DocumentVisitOutcome;
  serialize(format: DocumentSerializationFormat): string;
}
