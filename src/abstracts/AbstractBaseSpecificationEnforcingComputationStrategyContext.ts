import type { ISpecificationEnforcingComputationStrategyContext } from "../contracts/ISpecificationEnforcingComputationStrategyContext.js";
import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import { AbstractBaseEnterpriseComputationStrategySelectionContext } from "./AbstractBaseEnterpriseComputationStrategySelectionContext.js";

export abstract class AbstractBaseSpecificationEnforcingComputationStrategyContext
  extends AbstractBaseEnterpriseComputationStrategySelectionContext
  implements ISpecificationEnforcingComputationStrategyContext
{
  protected readonly enforcedSpecifications: Map<number, IFizzBuzzSpecification>;

  constructor(
    request: IFizzBuzzComputationRequest,
    selectionContextId: string,
    selectionProfile: string = "SPECIFICATION_ENFORCING",
  ) {
    super(request, selectionContextId, selectionProfile);
    this.enforcedSpecifications = new Map<number, IFizzBuzzSpecification>();
  }

  abstract getSpecificationContextName(): string;

  setEnforcedSpecification(
    divisor: number,
    specification: IFizzBuzzSpecification,
  ): void {
    this.enforcedSpecifications.set(divisor, specification);
  }

  getEnforcedSpecification(
    divisor: number,
  ): IFizzBuzzSpecification | null {
    return this.enforcedSpecifications.get(divisor) ?? null;
  }

  getEnforcedDivisorCount(): number {
    return this.enforcedSpecifications.size;
  }
}
