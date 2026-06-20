import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IDocumentAwareResolutionFacadeDecorator } from "../contracts/IDocumentAwareResolutionFacadeDecorator.js";
import type { IEnterpriseFizzBuzzDocumentBuilder } from "../contracts/IEnterpriseFizzBuzzDocumentBuilder.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import type { IEnterpriseFizzBuzzDocumentRenderer } from "../contracts/IEnterpriseFizzBuzzDocumentRenderer.js";

export abstract class AbstractBaseDocumentAwareResolutionFacadeDecorator
  implements IDocumentAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_FRAMEWORK_VERSION = "1.0.0-DOCUMENT-AWARE-DECORATOR-FRAMEWORK";
  private static readonly DEFAULT_DOCUMENT_PROCESSING_ENABLED = true;

  protected readonly decoratedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly documentBuilder: IEnterpriseFizzBuzzDocumentBuilder;
  protected readonly documentVisitor: IEnterpriseFizzBuzzDocumentVisitor;
  protected readonly documentRenderer: IEnterpriseFizzBuzzDocumentRenderer;

  constructor(
    decoratedFacade: IFizzBuzzSingleValueResolutionFacade,
    documentBuilder: IEnterpriseFizzBuzzDocumentBuilder,
    documentVisitor: IEnterpriseFizzBuzzDocumentVisitor,
    documentRenderer: IEnterpriseFizzBuzzDocumentRenderer,
  ) {
    if (decoratedFacade === null) {
      throw new Error(
        `[DocumentAwareDecorator] Decorated facade must not be null`,
      );
    }
    this.decoratedFacade = decoratedFacade;
    this.documentBuilder = documentBuilder;
    this.documentVisitor = documentVisitor;
    this.documentRenderer = documentRenderer;
  }

  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;
  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];

  getDecoratedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.decoratedFacade;
  }

  getDocumentBuilder(): IEnterpriseFizzBuzzDocumentBuilder {
    return this.documentBuilder;
  }

  getDocumentVisitor(): IEnterpriseFizzBuzzDocumentVisitor {
    return this.documentVisitor;
  }

  getDocumentRenderer(): IEnterpriseFizzBuzzDocumentRenderer {
    return this.documentRenderer;
  }

  isDocumentProcessingEnabled(): boolean {
    return AbstractBaseDocumentAwareResolutionFacadeDecorator.DEFAULT_DOCUMENT_PROCESSING_ENABLED;
  }

  protected getDecoratorFrameworkVersion(): string {
    return AbstractBaseDocumentAwareResolutionFacadeDecorator.DECORATOR_FRAMEWORK_VERSION;
  }

  protected processThroughDocumentModel(rawResult: string, value: number): string {
    const document = this.documentBuilder.buildDocument(value, rawResult);
    this.documentVisitor.resetVisitorState();
    document.accept(this.documentVisitor);
    return this.documentRenderer.renderDocument(document, this.documentVisitor);
  }
}
