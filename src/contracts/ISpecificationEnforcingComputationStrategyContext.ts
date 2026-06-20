import type { IFizzBuzzSpecification } from "./IFizzBuzzSpecification.js";
import type { IEnterpriseComputationStrategySelectionContext } from "./IEnterpriseComputationStrategySelectionContext.js";

export interface ISpecificationEnforcingComputationStrategyContext
  extends IEnterpriseComputationStrategySelectionContext {
  setEnforcedSpecification(
    divisor: number,
    specification: IFizzBuzzSpecification,
  ): void;
  getEnforcedSpecification(
    divisor: number,
  ): IFizzBuzzSpecification | null;
  getSpecificationContextName(): string;
}
