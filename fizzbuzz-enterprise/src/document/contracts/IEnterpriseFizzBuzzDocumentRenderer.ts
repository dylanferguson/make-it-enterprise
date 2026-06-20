import type { IEnterpriseFizzBuzzComputationResultDocument, DocumentSerializationFormat } from "./IEnterpriseFizzBuzzComputationResultDocument.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "./IEnterpriseFizzBuzzDocumentVisitor.js";

export interface IEnterpriseFizzBuzzDocumentRenderer {
  getRendererName(): string;
  getRendererVersion(): string;
  renderDocument(
    document: IEnterpriseFizzBuzzComputationResultDocument,
    visitor: IEnterpriseFizzBuzzDocumentVisitor,
  ): string;
  renderInFormat(
    document: IEnterpriseFizzBuzzComputationResultDocument,
    format: DocumentSerializationFormat,
  ): string;
  getSupportedFormats(): readonly DocumentSerializationFormat[];
}
