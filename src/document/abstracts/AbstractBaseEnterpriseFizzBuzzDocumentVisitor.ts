import type { IEnterpriseFizzBuzzDocumentVisitor, DocumentVisitOutcome } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import type { IEnterpriseFizzBuzzComputationResultDocument } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";

export abstract class AbstractBaseEnterpriseFizzBuzzDocumentVisitor
  implements IEnterpriseFizzBuzzDocumentVisitor
{
  private static readonly VISITOR_FRAMEWORK_VERSION = "1.0.0-DOCUMENT-VISITOR-FRAMEWORK";
  private static readonly METADATA_STORE_PREFIX = "visitor:meta";

  private visitedDocumentCount: number = 0;
  private readonly metadataStore: Map<string, string> = new Map();

  abstract getVisitorName(): string;
  abstract getVisitorVersion(): string;

  abstract visitDocument(document: IEnterpriseFizzBuzzComputationResultDocument): DocumentVisitOutcome;

  getVisitedDocumentCount(): number {
    return this.visitedDocumentCount;
  }

  getVisitorMetadata(key: string): string | null {
    return this.metadataStore.get(key) ?? null;
  }

  setVisitorMetadata(key: string, value: string): void {
    this.metadataStore.set(key, value);
  }

  resetVisitorState(): void {
    this.visitedDocumentCount = 0;
    this.metadataStore.clear();
  }

  protected incrementVisitedCount(): void {
    this.visitedDocumentCount++;
  }

  protected getVisitorFrameworkVersion(): string {
    return AbstractBaseEnterpriseFizzBuzzDocumentVisitor.VISITOR_FRAMEWORK_VERSION;
  }

  protected getMetadataStorePrefix(): string {
    return AbstractBaseEnterpriseFizzBuzzDocumentVisitor.METADATA_STORE_PREFIX;
  }

  protected buildVisitTraceId(document: IEnterpriseFizzBuzzComputationResultDocument): string {
    return `${AbstractBaseEnterpriseFizzBuzzDocumentVisitor.METADATA_STORE_PREFIX}:${document.getDocumentNodeType()}:${document.getOriginalValue()}:${Date.now()}`;
  }
}
