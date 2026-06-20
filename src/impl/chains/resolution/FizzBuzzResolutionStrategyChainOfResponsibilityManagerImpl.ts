import { AbstractBaseEnterpriseFizzBuzzResolutionStrategySelectorVisitor } from "../../../abstracts/AbstractBaseEnterpriseFizzBuzzResolutionStrategySelectorVisitor.js";
import type { IFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "../../../contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";
import type { IFizzBuzzResolutionStrategyChainOfResponsibilityManager } from "../../../contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityManager.js";
import type { IEnterpriseFizzBuzzResolutionStrategySelectorVisitor } from "../../../contracts/IEnterpriseFizzBuzzResolutionStrategySelectorVisitor.js";

export class FizzBuzzResolutionStrategyChainOfResponsibilityManagerImpl
  implements IFizzBuzzResolutionStrategyChainOfResponsibilityManager
{
  private static readonly CHAIN_NAME = "FizzBuzzResolutionStrategyChainOfResponsibilityManager";
  private static readonly CHAIN_VERSION = "1.0.0-CHAIN-OF-RESPONSIBILITY-MANAGER";

  private readonly chainHead: IFizzBuzzResolutionStrategyChainOfResponsibilityHandler | null;
  private readonly strategySelectorVisitor: IEnterpriseFizzBuzzResolutionStrategySelectorVisitor;
  private readonly registeredHandlers: Map<string, IFizzBuzzResolutionStrategyChainOfResponsibilityHandler>;
  private readonly sortedHandlerList: IFizzBuzzResolutionStrategyChainOfResponsibilityHandler[];

  constructor(
    handlers: IFizzBuzzResolutionStrategyChainOfResponsibilityHandler[],
    strategySelectorVisitor: IEnterpriseFizzBuzzResolutionStrategySelectorVisitor,
  ) {
    this.strategySelectorVisitor = strategySelectorVisitor;
    this.registeredHandlers = new Map();
    this.sortedHandlerList = [...handlers].sort(
      (a, b) => b.getHandlerPriority() - a.getHandlerPriority(),
    );
    for (const handler of this.sortedHandlerList) {
      this.registeredHandlers.set(handler.getHandlerName(), handler);
    }
    this.chainHead = this.buildChain();
  }

  private buildChain(): IFizzBuzzResolutionStrategyChainOfResponsibilityHandler | null {
    if (this.sortedHandlerList.length === 0) {
      return null;
    }
    for (let i = 0; i < this.sortedHandlerList.length - 1; i++) {
      this.sortedHandlerList[i]!.setNextHandler(this.sortedHandlerList[i + 1]!);
    }
    this.sortedHandlerList[this.sortedHandlerList.length - 1]!.setNextHandler(null);
    return this.sortedHandlerList[0]!;
  }

  resolveThroughChain(value: number, innerResolver: (value: number) => string): string {
    const selectedStrategyName = this.strategySelectorVisitor.visitForStrategySelection(value, null);

    if (this.chainHead !== null) {
      const delegationContext = `chain:${this.getChainName()}:strategy:${selectedStrategyName}`;
      const result = this.chainHead.handleResolution(value, innerResolver, delegationContext);
      if (result !== null) {
        return result;
      }
    }

    return innerResolver(value);
  }

  getChainName(): string {
    return FizzBuzzResolutionStrategyChainOfResponsibilityManagerImpl.CHAIN_NAME;
  }

  getChainVersion(): string {
    return FizzBuzzResolutionStrategyChainOfResponsibilityManagerImpl.CHAIN_VERSION;
  }

  getRegisteredHandlerCount(): number {
    return this.registeredHandlers.size;
  }

  getRegisteredHandlerNames(): readonly string[] {
    return Array.from(this.registeredHandlers.keys());
  }

  getChainHead(): IFizzBuzzResolutionStrategyChainOfResponsibilityHandler | null {
    return this.chainHead;
  }

  getStrategySelectorVisitor(): IEnterpriseFizzBuzzResolutionStrategySelectorVisitor {
    return this.strategySelectorVisitor;
  }
}
