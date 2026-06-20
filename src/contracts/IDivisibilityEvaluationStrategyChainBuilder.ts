import type { IDivisibilityEvaluationStrategyChainLink } from "./IDivisibilityEvaluationStrategyChainLink.js";

export interface IDivisibilityEvaluationStrategyChainBuilder {
  addLink(link: IDivisibilityEvaluationStrategyChainLink): IDivisibilityEvaluationStrategyChainBuilder;
  addLinkAtPosition(
    index: number,
    link: IDivisibilityEvaluationStrategyChainLink,
  ): IDivisibilityEvaluationStrategyChainBuilder;
  removeLink(linkName: string): IDivisibilityEvaluationStrategyChainBuilder;
  clearLinks(): IDivisibilityEvaluationStrategyChainBuilder;
  getConfiguredLinkCount(): number;
  getConfiguredLinks(): readonly IDivisibilityEvaluationStrategyChainLink[];
  build(): IDivisibilityEvaluationStrategyChainLink;
}
