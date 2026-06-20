import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseFizzBuzzDocumentBuilder } from "./IEnterpriseFizzBuzzDocumentBuilder.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "./IEnterpriseFizzBuzzDocumentVisitor.js";
import type { IEnterpriseFizzBuzzDocumentRenderer } from "./IEnterpriseFizzBuzzDocumentRenderer.js";

export interface IDocumentAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getDecoratedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getDocumentBuilder(): IEnterpriseFizzBuzzDocumentBuilder;
  getDocumentVisitor(): IEnterpriseFizzBuzzDocumentVisitor;
  getDocumentRenderer(): IEnterpriseFizzBuzzDocumentRenderer;
  isDocumentProcessingEnabled(): boolean;
}
