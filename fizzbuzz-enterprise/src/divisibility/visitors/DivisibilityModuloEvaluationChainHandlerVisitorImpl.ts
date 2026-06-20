import { AbstractBaseDivisibilityModuloEvaluationChainHandlerVisitor } from "../abstracts/AbstractBaseDivisibilityModuloEvaluationChainHandlerVisitor.js";
import type { IDivisibilityModuloEvaluationChainHandler } from "../contracts/IDivisibilityModuloEvaluationChainHandler.js";

export class DivisibilityModuloEvaluationChainHandlerVisitorImpl
  extends AbstractBaseDivisibilityModuloEvaluationChainHandlerVisitor
{
  private static readonly VISITOR_NAME = "DivisibilityModuloEvaluationChainHandlerVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-CHAIN-VISITOR";
  private static readonly VISITOR_PRIORITY = 50;

  private visitedHandlerCount: number = 0;
  private traversalCount: number = 0;

  constructor() {
    super(
      DivisibilityModuloEvaluationChainHandlerVisitorImpl.VISITOR_NAME,
      DivisibilityModuloEvaluationChainHandlerVisitorImpl.VISITOR_VERSION,
      DivisibilityModuloEvaluationChainHandlerVisitorImpl.VISITOR_PRIORITY,
    );
  }

  override visitChainHandler(handler: IDivisibilityModuloEvaluationChainHandler): boolean {
    this.visitedHandlerCount++;
    console.debug(
      `[${DivisibilityModuloEvaluationChainHandlerVisitorImpl.VISITOR_NAME}] ` +
      `Visiting chain handler: ${handler.getHandlerName()} v${handler.getHandlerVersion()} ` +
      `(priority=${handler.getHandlerPriority()})`,
    );
    return true;
  }

  override traverseChain(chainHead: IDivisibilityModuloEvaluationChainHandler): readonly IDivisibilityModuloEvaluationChainHandler[] {
    this.traversalCount++;
    const result = super.traverseChain(chainHead);
    console.debug(
      `[${DivisibilityModuloEvaluationChainHandlerVisitorImpl.VISITOR_NAME}] ` +
      `Chain traversal #${this.traversalCount} complete: ${result.length} handler(s) visited`,
    );
    return result;
  }

  getVisitedHandlerCount(): number {
    return this.visitedHandlerCount;
  }

  getTraversalCount(): number {
    return this.traversalCount;
  }
}
