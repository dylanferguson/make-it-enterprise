import { AbstractBaseEnterpriseFizzBuzzDocumentRenderer } from "../abstracts/AbstractBaseEnterpriseFizzBuzzDocumentRenderer.js";
import type { IEnterpriseFizzBuzzComputationResultDocument, DocumentSerializationFormat } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";

export class EnterpriseFizzBuzzDocumentRendererImpl extends AbstractBaseEnterpriseFizzBuzzDocumentRenderer {
  private static readonly RENDERER_NAME = "EnterpriseFizzBuzzDocumentRenderer";
  private static readonly RENDERER_VERSION = "1.0.0-DOCUMENT-RENDERER-IMPL";

  private renderCount: number = 0;

  override getRendererName(): string {
    return EnterpriseFizzBuzzDocumentRendererImpl.RENDERER_NAME;
  }

  override getRendererVersion(): string {
    return EnterpriseFizzBuzzDocumentRendererImpl.RENDERER_VERSION;
  }

  override renderDocument(
    document: IEnterpriseFizzBuzzComputationResultDocument,
    visitor: IEnterpriseFizzBuzzDocumentVisitor,
  ): string {
    this.renderCount++;
    const visitedCount = visitor.getVisitedDocumentCount();
    return this.performRendering(document, visitedCount);
  }

  override renderInFormat(
    document: IEnterpriseFizzBuzzComputationResultDocument,
    format: DocumentSerializationFormat,
  ): string {
    this.assertFormatSupported(format);
    this.renderCount++;
    return document.serialize(format);
  }

  getRenderCount(): number {
    return this.renderCount;
  }

  private performRendering(document: IEnterpriseFizzBuzzComputationResultDocument, visitedCount: number): string {
    if (document.hasChildDocuments()) {
      const childContents = document.getChildDocuments()
        .map((c) => this.performRendering(c, visitedCount))
        .join("");
      return childContents;
    }
    return document.getResolvedContent();
  }
}
