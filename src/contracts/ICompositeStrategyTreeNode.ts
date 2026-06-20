import type { ICompositeStrategyTreeVisitor } from "./ICompositeStrategyTreeVisitor.js";
import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";

export interface ICompositeStrategyTreeNode {
  evaluate(value: number): string | null;
  getNodeName(): string;
  getNodeType(): "LEAF" | "BRANCH";
  getChildCount(): number;
  getChildren(): readonly ICompositeStrategyTreeNode[];
  addChild(node: ICompositeStrategyTreeNode): void;
  removeChild(nodeName: string): boolean;
  accept(visitor: ICompositeStrategyTreeVisitor): void;
  canHandle(value: number): boolean;
  getNodePriority(): number;
}
