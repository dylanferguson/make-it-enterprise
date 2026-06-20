import type { IDivisibilityModuloEvaluationChainHandler } from "../contracts/IDivisibilityModuloEvaluationChainHandler.js";

export interface IDivisibilityModuloEvaluationChainHandlerVisitor {
  getVisitorName(): string;
  getVisitorVersion(): string;
  getVisitorPriority(): number;
  visitChainHandler(handler: IDivisibilityModuloEvaluationChainHandler): boolean;
  traverseChain(chainHead: IDivisibilityModuloEvaluationChainHandler): readonly IDivisibilityModuloEvaluationChainHandler[];
}
