import { AbstractBaseEnterpriseClassificationRegistry } from "../../abstracts/AbstractBaseEnterpriseClassificationRegistry.js";
import type { IEnterpriseClassificationChainHandler } from "../../contracts/index.js";

export class StandardEnterpriseClassificationRegistryImpl
  extends AbstractBaseEnterpriseClassificationRegistry
{
  protected readonly registryName = "StandardEnterpriseClassificationRegistry";
  protected readonly registryVersion = "1.0.0-ECR-STANDARD";

  override registerHandler(handler: IEnterpriseClassificationChainHandler, priority: number): void {
    this.handlers.set(handler.getHandlerName(), { handler, priority });
  }

  override unregisterHandler(handlerName: string): boolean {
    return this.handlers.delete(handlerName);
  }

  override clearRegistry(): void {
    this.handlers.clear();
  }
}
