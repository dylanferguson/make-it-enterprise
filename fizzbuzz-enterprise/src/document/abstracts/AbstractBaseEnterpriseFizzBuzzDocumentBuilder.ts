import type { IEnterpriseFizzBuzzDocumentBuilder } from "../contracts/IEnterpriseFizzBuzzDocumentBuilder.js";
import type { IEnterpriseFizzBuzzComputationResultDocument } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import { DocumentNodeType } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";

export abstract class AbstractBaseEnterpriseFizzBuzzDocumentBuilder
  implements IEnterpriseFizzBuzzDocumentBuilder
{
  private static readonly BUILDER_FRAMEWORK_VERSION = "1.0.0-DOCUMENT-BUILDER-FRAMEWORK";
  private static readonly DEFAULT_NODE_TYPE_PREFIX = "DOCUMENT_NODE";

  abstract getBuilderName(): string;
  abstract getBuilderVersion(): string;
  abstract buildDocument(
    value: number,
    resolvedString: string,
  ): IEnterpriseFizzBuzzComputationResultDocument;
  abstract buildCompositeDocument(
    value: number,
    resolvedString: string,
    childDocuments: readonly IEnterpriseFizzBuzzComputationResultDocument[],
  ): IEnterpriseFizzBuzzComputationResultDocument;
  abstract reset(): void;

  protected resolveNodeTypeFromContent(resolvedString: string): DocumentNodeType {
    if (resolvedString === "FizzBuzz") {
      return DocumentNodeType.FIZZBUZZ;
    }
    if (resolvedString === "Fizz") {
      return DocumentNodeType.FIZZ;
    }
    if (resolvedString === "Buzz") {
      return DocumentNodeType.BUZZ;
    }
    if (/^\d+$/.test(resolvedString)) {
      return DocumentNodeType.NUMBER;
    }
    return DocumentNodeType.UNRESOLVED;
  }

  protected getBuilderFrameworkVersion(): string {
    return AbstractBaseEnterpriseFizzBuzzDocumentBuilder.BUILDER_FRAMEWORK_VERSION;
  }

  protected getDefaultNodeTypePrefix(): string {
    return AbstractBaseEnterpriseFizzBuzzDocumentBuilder.DEFAULT_NODE_TYPE_PREFIX;
  }

  protected generateDocumentIdentifier(value: number): string {
    return `doc:${value}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }
}
