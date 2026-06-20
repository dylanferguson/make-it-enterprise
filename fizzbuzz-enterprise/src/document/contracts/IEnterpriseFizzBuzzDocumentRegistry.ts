import type { DocumentNodeType } from "./IEnterpriseFizzBuzzComputationResultDocument.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "./IEnterpriseFizzBuzzDocumentVisitor.js";
import { DocumentVisitOutcome } from "./IEnterpriseFizzBuzzDocumentVisitor.js";

export interface IEnterpriseFizzBuzzDocumentRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  registerDocumentNodeType(nodeType: DocumentNodeType, factoryMethod: (value: number, content: string) => object): void;
  unregisterDocumentNodeType(nodeType: DocumentNodeType): boolean;
  getRegisteredNodeTypes(): readonly DocumentNodeType[];
  getFactoryMethod(nodeType: DocumentNodeType): ((value: number, content: string) => object) | null;
  hasNodeType(nodeType: DocumentNodeType): boolean;
  getRegisteredNodeTypeCount(): number;
  registerVisitor(visitor: IEnterpriseFizzBuzzDocumentVisitor): void;
  unregisterVisitor(visitorName: string): boolean;
  getRegisteredVisitors(): readonly IEnterpriseFizzBuzzDocumentVisitor[];
  getVisitorByName(name: string): IEnterpriseFizzBuzzDocumentVisitor | null;
  dispatchVisitToAllVisitors(
    document: { accept(visitor: IEnterpriseFizzBuzzDocumentVisitor): DocumentVisitOutcome },
  ): void;
}
