import type { IDivisibilityOperator } from "../contracts/IDivisibilityOperator.js";
import type { IDivisibilityOperatorChainBuilder } from "../contracts/IDivisibilityOperatorChainBuilder.js";
import type { IDivisibilityOperatorDelegationChainHandler } from "../contracts/IDivisibilityOperatorDelegationChainHandler.js";

export abstract class AbstractBaseDivisibilityOperatorChainBuilder
  implements IDivisibilityOperatorChainBuilder
{
  private readonly builderName: string;
  private readonly builderVersion: string;
  protected readonly handlers: IDivisibilityOperatorDelegationChainHandler[] = [];

  constructor(builderName: string, builderVersion: string) {
    this.builderName = builderName;
    this.builderVersion = builderVersion;
  }

  getBuilderName(): string {
    return this.builderName;
  }

  getBuilderVersion(): string {
    return this.builderVersion;
  }

  registerHandler(handler: IDivisibilityOperatorDelegationChainHandler): void {
    this.handlers.push(handler);
  }

  registerHandlerAtPosition(
    handler: IDivisibilityOperatorDelegationChainHandler,
    position: number,
  ): void {
    this.handlers.splice(position, 0, handler);
  }

  abstract buildChain(): IDivisibilityOperator;

  getRegisteredHandlerCount(): number {
    return this.handlers.length;
  }

  resetBuilder(): void {
    this.handlers.length = 0;
  }

  protected linkHandlers(): IDivisibilityOperatorDelegationChainHandler | null {
    const sorted = [...this.handlers].sort(
      (a, b) => b.getHandlerPriority() - a.getHandlerPriority(),
    );
    if (sorted.length === 0) return null;
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i]!;
      const next = sorted[i + 1]!;
      current.setNextHandler(next);
    }
    return sorted[0]!;
  }
}
