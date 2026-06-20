import { AbstractBaseDocumentAwareResolutionFacadeDecorator } from "../abstracts/AbstractBaseDocumentAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseFizzBuzzDocumentBuilder } from "../contracts/IEnterpriseFizzBuzzDocumentBuilder.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import type { IEnterpriseFizzBuzzDocumentRenderer } from "../contracts/IEnterpriseFizzBuzzDocumentRenderer.js";

export class DefaultDocumentAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseDocumentAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "DefaultDocumentAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-DOCUMENT-AWARE-DECORATOR";
  private static readonly FACADE_NAME_PREFIX = "DocumentAwareResolved";

  private documentProcessCount: number = 0;

  constructor(
    decoratedFacade: IFizzBuzzSingleValueResolutionFacade,
    documentBuilder: IEnterpriseFizzBuzzDocumentBuilder,
    documentVisitor: IEnterpriseFizzBuzzDocumentVisitor,
    documentRenderer: IEnterpriseFizzBuzzDocumentRenderer,
  ) {
    super(decoratedFacade, documentBuilder, documentVisitor, documentRenderer);
  }

  override resolveValue(value: number): string {
    const rawResult = this.decoratedFacade.resolveValue(value);
    this.documentProcessCount++;
    const documentProcessed = this.processThroughDocumentModel(rawResult, value);
    return documentProcessed;
  }

  override resolveRange(start: number, end: number): readonly string[] {
    const rawResults = this.decoratedFacade.resolveRange(start, end);
    const processedResults: string[] = [];
    let currentValue = start;
    for (const raw of rawResults) {
      this.documentProcessCount++;
      processedResults.push(this.processThroughDocumentModel(raw, currentValue));
      currentValue++;
    }
    return processedResults;
  }

  override getFacadeName(): string {
    return `${DefaultDocumentAwareResolutionFacadeDecoratorImpl.FACADE_NAME_PREFIX}::${this.decoratedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return this.decoratedFacade.getFacadeVersion();
  }

  override getDecoratorName(): string {
    return DefaultDocumentAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return DefaultDocumentAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getDocumentProcessCount(): number {
    return this.documentProcessCount;
  }
}
