import { AbstractBaseEnterpriseFizzBuzzDocumentRegistry } from "../abstracts/AbstractBaseEnterpriseFizzBuzzDocumentRegistry.js";

export class EnterpriseFizzBuzzDocumentRegistryImpl extends AbstractBaseEnterpriseFizzBuzzDocumentRegistry {
  private static readonly REGISTRY_NAME = "EnterpriseFizzBuzzDocumentRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-DOCUMENT-REGISTRY-IMPL";

  override getRegistryName(): string {
    return EnterpriseFizzBuzzDocumentRegistryImpl.REGISTRY_NAME;
  }

  override getRegistryVersion(): string {
    return EnterpriseFizzBuzzDocumentRegistryImpl.REGISTRY_VERSION;
  }
}
