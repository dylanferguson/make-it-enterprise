import type { IDivisibilityModuloEvaluationChainHandlerVisitor } from "../visitors/IDivisibilityModuloEvaluationChainHandlerVisitor.js";
import type { IDivisibilityModuloEvaluationChainHandler } from "../contracts/IDivisibilityModuloEvaluationChainHandler.js";

export abstract class AbstractBaseDivisibilityModuloEvaluationChainHandlerVisitor
  implements IDivisibilityModuloEvaluationChainHandlerVisitor
{
  private readonly visitorName: string;
  private readonly visitorVersion: string;
  private readonly visitorPriority: number;

  constructor(visitorName: string, visitorVersion: string, visitorPriority: number) {
    this.visitorName = visitorName;
    this.visitorVersion = visitorVersion;
    this.visitorPriority = visitorPriority;
  }

  getVisitorName(): string {
    return this.visitorName;
  }

  getVisitorVersion(): string {
    return this.visitorVersion;
  }

  getVisitorPriority(): number {
    return this.visitorPriority;
  }

  abstract visitChainHandler(handler: IDivisibilityModuloEvaluationChainHandler): boolean;

  traverseChain(chainHead: IDivisibilityModuloEvaluationChainHandler): readonly IDivisibilityModuloEvaluationChainHandler[] {
    const visited: IDivisibilityModuloEvaluationChainHandler[] = [];
    let current: IDivisibilityModuloEvaluationChainHandler | null = chainHead;
    while (current !== null) {
      visited.push(current);
      const shouldContinue = this.visitChainHandler(current);
      if (!shouldContinue) {
        break;
      }
      current = (current as any).nextHandler ?? null;
    }
    return visited;
  }
}
