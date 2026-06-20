import type { IEnterpriseFizzBuzzComputationResultDocument } from "./IEnterpriseFizzBuzzComputationResultDocument.js";

export enum DocumentVisitOutcome {
  CONTINUE = "CONTINUE",
  SKIP_CHILDREN = "SKIP_CHILDREN",
  TERMINATE = "TERMINATE",
}

export interface IEnterpriseFizzBuzzDocumentVisitor {
  getVisitorName(): string;
  getVisitorVersion(): string;
  getVisitedDocumentCount(): number;
  visitDocument(document: IEnterpriseFizzBuzzComputationResultDocument): DocumentVisitOutcome;
  getVisitorMetadata(key: string): string | null;
  setVisitorMetadata(key: string, value: string): void;
  resetVisitorState(): void;
}
