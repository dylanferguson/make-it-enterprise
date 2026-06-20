import type { ISpecificationEnforcementChainLink } from "./ISpecificationEnforcementChainLink.js";

export interface ISpecificationEnforcementChain {
  addChainLink(link: ISpecificationEnforcementChainLink): void;
  enforce(value: number, divisor: number): boolean;
  getChainName(): string;
  getChainVersion(): string;
  getChainLinkCount(): number;
}
