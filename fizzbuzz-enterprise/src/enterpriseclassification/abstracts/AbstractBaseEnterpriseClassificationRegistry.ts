import type { IEnterpriseClassificationChainHandler } from "../contracts/index.js";
import type { IEnterpriseClassificationRegistry } from "../contracts/index.js";

export abstract class AbstractBaseEnterpriseClassificationRegistry
  implements IEnterpriseClassificationRegistry
{
  protected abstract readonly registryName: string;
  protected abstract readonly registryVersion: string;

  protected readonly handlers: Map<string, { handler: IEnterpriseClassificationChainHandler; priority: number }> = new Map();

  abstract registerHandler(handler: IEnterpriseClassificationChainHandler, priority: number): void;
  abstract unregisterHandler(handlerName: string): boolean;
  abstract clearRegistry(): void;

  getRegistryName(): string {
    return this.registryName;
  }

  getRegistryVersion(): string {
    return this.registryVersion;
  }

  getRegisteredHandlers(): readonly IEnterpriseClassificationChainHandler[] {
    return Array.from(this.handlers.values())
      .sort((a, b) => a.priority - b.priority)
      .map((entry) => entry.handler);
  }

  getHandlerCount(): number {
    return this.handlers.size;
  }

  getChainHead(): IEnterpriseClassificationChainHandler | null {
    const sorted = this.getRegisteredHandlers();
    if (sorted.length === 0) return null;
    for (let i = 0; i < sorted.length - 1; i++) {
      sorted[i]!.setNextHandler(sorted[i + 1]!);
    }
    sorted[sorted.length - 1]!.setNextHandler(null);
    return sorted[0]!;
  }
}
