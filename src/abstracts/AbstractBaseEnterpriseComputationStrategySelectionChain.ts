import type { IEnterpriseComputationStrategySelectionChain } from "../contracts/IEnterpriseComputationStrategySelectionChain.js";
import type { IEnterpriseComputationStrategySelectionHandler } from "../contracts/IEnterpriseComputationStrategySelectionHandler.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../contracts/IEnterpriseComputationStrategySelectionContext.js";

export abstract class AbstractBaseEnterpriseComputationStrategySelectionChain
  implements IEnterpriseComputationStrategySelectionChain
{
  protected readonly handlers: IEnterpriseComputationStrategySelectionHandler[] = [];

  abstract getChainName(): string;
  abstract getChainVersion(): string;

  addHandler(handler: IEnterpriseComputationStrategySelectionHandler): void {
    this.handlers.push(handler);
    this.handlers.sort((a, b) => b.getHandlerPriority() - a.getHandlerPriority());
    this.linkHandlers();
  }

  removeHandler(handlerName: string): boolean {
    const index = this.handlers.findIndex(h => h.getHandlerName() === handlerName);
    if (index !== -1) {
      this.handlers.splice(index, 1);
      this.linkHandlers();
      return true;
    }
    return false;
  }

  resolveStrategy(context: IEnterpriseComputationStrategySelectionContext): IEnterpriseComputationStrategySelectionHandler | null {
    if (this.handlers.length === 0) {
      return null;
    }
    return this.handlers[0] ?? null;
  }

  getHandlers(): readonly IEnterpriseComputationStrategySelectionHandler[] {
    return [...this.handlers];
  }

  protected linkHandlers(): void {
    for (let i = 0; i < this.handlers.length - 1; i++) {
      const current = this.handlers[i];
      const next = this.handlers[i + 1];
      if (current !== undefined && next !== undefined) {
        current.setNext(next);
      }
    }
    if (this.handlers.length > 0) {
      const last = this.handlers[this.handlers.length - 1];
      if (last !== undefined) {
        try {
          last.setNext(null as unknown as IEnterpriseComputationStrategySelectionHandler);
        } catch {
        }
      }
    }
  }
}
