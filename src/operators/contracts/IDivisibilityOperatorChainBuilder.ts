import type { IDivisibilityOperatorDelegationChainHandler } from "./IDivisibilityOperatorDelegationChainHandler.js";
import type { IDivisibilityOperator } from "./IDivisibilityOperator.js";

export interface IDivisibilityOperatorChainBuilder {
  getBuilderName(): string;
  getBuilderVersion(): string;
  registerHandler(handler: IDivisibilityOperatorDelegationChainHandler): void;
  registerHandlerAtPosition(
    handler: IDivisibilityOperatorDelegationChainHandler,
    position: number,
  ): void;
  buildChain(): IDivisibilityOperator;
  getRegisteredHandlerCount(): number;
  resetBuilder(): void;
}
