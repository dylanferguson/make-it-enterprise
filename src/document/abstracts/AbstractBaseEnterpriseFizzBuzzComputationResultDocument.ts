import type { IEnterpriseFizzBuzzComputationResultDocument } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import { DocumentNodeType, DocumentSerializationFormat } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import { DocumentVisitOutcome } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";

export abstract class AbstractBaseEnterpriseFizzBuzzComputationResultDocument
  implements IEnterpriseFizzBuzzComputationResultDocument
{
  private static readonly DOCUMENT_FRAMEWORK_VERSION = "1.0.0-DOCUMENT-MODEL-FRAMEWORK";

  private readonly documentNodeType: DocumentNodeType;
  private readonly documentNodeName: string;
  private readonly documentNodeVersion: string;
  private readonly documentNodeIdentifier: string;
  private readonly originalValue: number;
  private readonly resolvedContent: string;
  private parentDocument: IEnterpriseFizzBuzzComputationResultDocument | null = null;
  private readonly childDocuments: IEnterpriseFizzBuzzComputationResultDocument[] = [];

  constructor(
    documentNodeType: DocumentNodeType,
    documentNodeName: string,
    documentNodeVersion: string,
    documentNodeIdentifier: string,
    originalValue: number,
    resolvedContent: string,
  ) {
    this.documentNodeType = documentNodeType;
    this.documentNodeName = documentNodeName;
    this.documentNodeVersion = documentNodeVersion;
    this.documentNodeIdentifier = documentNodeIdentifier;
    this.originalValue = originalValue;
    this.resolvedContent = resolvedContent;
  }

  getDocumentNodeType(): DocumentNodeType {
    return this.documentNodeType;
  }

  getDocumentNodeName(): string {
    return this.documentNodeName;
  }

  getDocumentNodeVersion(): string {
    return this.documentNodeVersion;
  }

  getDocumentNodeIdentifier(): string {
    return this.documentNodeIdentifier;
  }

  getOriginalValue(): number {
    return this.originalValue;
  }

  getResolvedContent(): string {
    return this.resolvedContent;
  }

  getParentDocument(): IEnterpriseFizzBuzzComputationResultDocument | null {
    return this.parentDocument;
  }

  getChildDocuments(): readonly IEnterpriseFizzBuzzComputationResultDocument[] {
    return [...this.childDocuments];
  }

  setParentDocument(parent: IEnterpriseFizzBuzzComputationResultDocument): void {
    this.parentDocument = parent;
  }

  addChildDocument(child: IEnterpriseFizzBuzzComputationResultDocument): void {
    this.childDocuments.push(child);
    child.setParentDocument(this);
  }

  hasChildDocuments(): boolean {
    return this.childDocuments.length > 0;
  }

  getDocumentDepth(): number {
    if (this.parentDocument === null) {
      return 0;
    }
    return 1 + this.parentDocument.getDocumentDepth();
  }

  abstract accept(visitor: IEnterpriseFizzBuzzDocumentVisitor): DocumentVisitOutcome;

  serialize(format: DocumentSerializationFormat): string {
    switch (format) {
      case DocumentSerializationFormat.PLAIN_STRING:
        return this.resolvedContent;
      case DocumentSerializationFormat.CANONICAL_XML:
        return this.serializeToXml();
      case DocumentSerializationFormat.DIAGNOSTIC_JSON:
        return this.serializeToJson();
      default:
        return this.resolvedContent;
    }
  }

  protected getDocumentFrameworkVersion(): string {
    return AbstractBaseEnterpriseFizzBuzzComputationResultDocument.DOCUMENT_FRAMEWORK_VERSION;
  }

  private serializeToXml(): string {
    const childXml = this.childDocuments
      .map((c) => c.serialize(DocumentSerializationFormat.CANONICAL_XML))
      .join("\n");
    const indent = childXml ? `\n  ${childXml.replace(/\n/g, "\n  ")}\n` : "";
    return `<${this.documentNodeType} value="${this.originalValue}" identifier="${this.documentNodeIdentifier}">${indent}<![CDATA[${this.resolvedContent}]]></${this.documentNodeType}>`;
  }

  private serializeToJson(): string {
    return JSON.stringify({
      nodeType: this.documentNodeType,
      nodeName: this.documentNodeName,
      nodeVersion: this.documentNodeVersion,
      identifier: this.documentNodeIdentifier,
      value: this.originalValue,
      content: this.resolvedContent,
      depth: this.getDocumentDepth(),
      childCount: this.childDocuments.length,
    });
  }
}
