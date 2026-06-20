import { AbstractBaseEnterpriseFizzBuzzDocumentVisitor } from "../abstracts/AbstractBaseEnterpriseFizzBuzzDocumentVisitor.js";
import type { IEnterpriseFizzBuzzComputationResultDocument } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import { DocumentVisitOutcome } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import { DocumentNodeType } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";

export class EnterpriseFizzBuzzDocumentVisitorImpl extends AbstractBaseEnterpriseFizzBuzzDocumentVisitor {
  private static readonly VISITOR_NAME = "EnterpriseFizzBuzzDocumentVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-DOCUMENT-VISITOR-IMPL";
  private static readonly VISIT_TRACE_ENABLED = true;

  private visitTraces: string[] = [];

  override getVisitorName(): string {
    return EnterpriseFizzBuzzDocumentVisitorImpl.VISITOR_NAME;
  }

  override getVisitorVersion(): string {
    return EnterpriseFizzBuzzDocumentVisitorImpl.VISITOR_VERSION;
  }

  override visitDocument(document: IEnterpriseFizzBuzzComputationResultDocument): DocumentVisitOutcome {
    this.incrementVisitedCount();
    const traceId = this.buildVisitTraceId(document);
    if (EnterpriseFizzBuzzDocumentVisitorImpl.VISIT_TRACE_ENABLED) {
      this.visitTraces.push(traceId);
      this.setVisitorMetadata(
        `last_visit:${document.getOriginalValue()}`,
        `${document.getDocumentNodeType()}@${traceId}`,
      );
    }
    return DocumentVisitOutcome.CONTINUE;
  }

  override resetVisitorState(): void {
    super.resetVisitorState();
    this.visitTraces = [];
  }

  getVisitTraces(): readonly string[] {
    return [...this.visitTraces];
  }

  getVisitTraceCount(): number {
    return this.visitTraces.length;
  }

  hasVisitedNodeType(nodeType: DocumentNodeType): boolean {
    return this.visitTraces.some((trace) => trace.includes(nodeType));
  }
}
