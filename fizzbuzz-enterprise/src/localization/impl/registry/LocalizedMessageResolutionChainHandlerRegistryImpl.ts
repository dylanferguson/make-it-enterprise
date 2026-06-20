import type { ILocalizedMessageResolutionChainHandler } from "../../contracts/ILocalizedMessageResolutionChainHandler.js";

export class LocalizedMessageResolutionChainHandlerRegistryImpl {
  private static readonly REGISTRY_NAME = "LocalizedMessageResolutionChainHandlerRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-MESSAGE-CHAIN-REGISTRY";

  private readonly handlers: Map<string, ILocalizedMessageResolutionChainHandler> = new Map();
  private chainHead: ILocalizedMessageResolutionChainHandler | null = null;

  getRegistryName(): string {
    return LocalizedMessageResolutionChainHandlerRegistryImpl.REGISTRY_NAME;
  }

  getRegistryVersion(): string {
    return LocalizedMessageResolutionChainHandlerRegistryImpl.REGISTRY_VERSION;
  }

  registerHandler(
    name: string,
    handler: ILocalizedMessageResolutionChainHandler,
  ): void {
    this.handlers.set(name, handler);
    if (this.chainHead === null) {
      this.chainHead = handler;
    } else {
      let current = this.chainHead;
      while (current.getNext() !== null) {
        current = current.getNext()!;
      }
      current.setNext(handler);
    }
  }

  getChainHead(): ILocalizedMessageResolutionChainHandler | null {
    return this.chainHead;
  }

  getHandler(name: string): ILocalizedMessageResolutionChainHandler | null {
    return this.handlers.get(name) ?? null;
  }

  getRegisteredHandlerCount(): number {
    return this.handlers.size;
  }

  getRegisteredHandlerNames(): readonly string[] {
    return Array.from(this.handlers.keys());
  }

  resetChain(): void {
    this.handlers.clear();
    this.chainHead = null;
  }
}
