import type { IEnterpriseFizzBuzzDocumentRenderer } from "../contracts/IEnterpriseFizzBuzzDocumentRenderer.js";
import type { IEnterpriseFizzBuzzComputationResultDocument } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import { DocumentSerializationFormat } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";

export abstract class AbstractBaseEnterpriseFizzBuzzDocumentRenderer
  implements IEnterpriseFizzBuzzDocumentRenderer
{
  private static readonly RENDERER_FRAMEWORK_VERSION = "1.0.0-DOCUMENT-RENDERER-FRAMEWORK";
  private static readonly SUPPORTED_FORMATS: readonly DocumentSerializationFormat[] = [
    DocumentSerializationFormat.PLAIN_STRING,
    DocumentSerializationFormat.CANONICAL_XML,
    DocumentSerializationFormat.DIAGNOSTIC_JSON,
  ];

  abstract getRendererName(): string;
  abstract getRendererVersion(): string;

  abstract renderDocument(
    document: IEnterpriseFizzBuzzComputationResultDocument,
    visitor: IEnterpriseFizzBuzzDocumentVisitor,
  ): string;

  abstract renderInFormat(
    document: IEnterpriseFizzBuzzComputationResultDocument,
    format: DocumentSerializationFormat,
  ): string;

  getSupportedFormats(): readonly DocumentSerializationFormat[] {
    return AbstractBaseEnterpriseFizzBuzzDocumentRenderer.SUPPORTED_FORMATS;
  }

  protected getRendererFrameworkVersion(): string {
    return AbstractBaseEnterpriseFizzBuzzDocumentRenderer.RENDERER_FRAMEWORK_VERSION;
  }

  protected isFormatSupported(format: DocumentSerializationFormat): boolean {
    return AbstractBaseEnterpriseFizzBuzzDocumentRenderer.SUPPORTED_FORMATS.includes(format);
  }

  protected assertFormatSupported(format: DocumentSerializationFormat): void {
    if (!this.isFormatSupported(format)) {
      throw new Error(
        `[${this.getRendererName()} v${this.getRendererVersion()}] ` +
        `Unsupported serialization format: ${format}`,
      );
    }
  }
}
