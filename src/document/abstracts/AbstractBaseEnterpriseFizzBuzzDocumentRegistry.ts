import type { IEnterpriseFizzBuzzDocumentRegistry } from "../contracts/IEnterpriseFizzBuzzDocumentRegistry.js";
import { DocumentNodeType } from "../contracts/IEnterpriseFizzBuzzComputationResultDocument.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import { DocumentVisitOutcome } from "../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";

export abstract class AbstractBaseEnterpriseFizzBuzzDocumentRegistry
  implements IEnterpriseFizzBuzzDocumentRegistry
{
  private static readonly REGISTRY_FRAMEWORK_VERSION = "1.0.0-DOCUMENT-REGISTRY-FRAMEWORK";
  private static readonly DEFAULT_CAPACITY = 64;

  private readonly nodeTypeFactories: Map<DocumentNodeType, (value: number, content: string) => object> = new Map();
  private readonly registeredVisitors: Map<string, IEnterpriseFizzBuzzDocumentVisitor> = new Map();

  abstract getRegistryName(): string;
  abstract getRegistryVersion(): string;

  registerDocumentNodeType(
    nodeType: DocumentNodeType,
    factoryMethod: (value: number, content: string) => object,
  ): void {
    this.nodeTypeFactories.set(nodeType, factoryMethod);
  }

  unregisterDocumentNodeType(nodeType: DocumentNodeType): boolean {
    return this.nodeTypeFactories.delete(nodeType);
  }

  getRegisteredNodeTypes(): readonly DocumentNodeType[] {
    return Array.from(this.nodeTypeFactories.keys());
  }

  getFactoryMethod(nodeType: DocumentNodeType): ((value: number, content: string) => object) | null {
    return this.nodeTypeFactories.get(nodeType) ?? null;
  }

  hasNodeType(nodeType: DocumentNodeType): boolean {
    return this.nodeTypeFactories.has(nodeType);
  }

  getRegisteredNodeTypeCount(): number {
    return this.nodeTypeFactories.size;
  }

  registerVisitor(visitor: IEnterpriseFizzBuzzDocumentVisitor): void {
    this.registeredVisitors.set(visitor.getVisitorName(), visitor);
  }

  unregisterVisitor(visitorName: string): boolean {
    return this.registeredVisitors.delete(visitorName);
  }

  getRegisteredVisitors(): readonly IEnterpriseFizzBuzzDocumentVisitor[] {
    return Array.from(this.registeredVisitors.values());
  }

  getVisitorByName(name: string): IEnterpriseFizzBuzzDocumentVisitor | null {
    return this.registeredVisitors.get(name) ?? null;
  }

  dispatchVisitToAllVisitors(
    document: { accept(visitor: IEnterpriseFizzBuzzDocumentVisitor): DocumentVisitOutcome },
  ): void {
    for (const visitor of this.registeredVisitors.values()) {
      const outcome = document.accept(visitor);
      if (outcome === DocumentVisitOutcome.TERMINATE) {
        break;
      }
    }
  }

  protected getRegistryFrameworkVersion(): string {
    return AbstractBaseEnterpriseFizzBuzzDocumentRegistry.REGISTRY_FRAMEWORK_VERSION;
  }

  protected getDefaultCapacity(): number {
    return AbstractBaseEnterpriseFizzBuzzDocumentRegistry.DEFAULT_CAPACITY;
  }
}
