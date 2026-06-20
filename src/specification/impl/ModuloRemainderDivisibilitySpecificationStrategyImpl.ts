import type { IRemainderOperatorDelegationService } from "../../contracts/IRemainderOperatorDelegationService.js";
import { AbstractBaseDivisibilitySpecificationStrategy } from "../abstracts/AbstractBaseDivisibilitySpecificationStrategy.js";

export class ModuloRemainderDivisibilitySpecificationStrategyImpl
  extends AbstractBaseDivisibilitySpecificationStrategy
{
  private static readonly SPECIFICATION_NAME = "ModuloRemainderDivisibilitySpecificationStrategy";
  private static readonly SPECIFICATION_VERSION = "1.0.0-SPECIFICATION-SPEC";

  private readonly divisor: number;
  private readonly delegationService: IRemainderOperatorDelegationService;

  constructor(divisor: number, delegationService: IRemainderOperatorDelegationService) {
    super();
    this.divisor = divisor;
    this.delegationService = delegationService;
  }

  override isSatisfiedBy(value: number): boolean {
    this.validateOperand(value);
    const remainder = this.delegationService.computeRemainder(value, this.divisor);
    return remainder === 0;
  }

  override getSpecificationName(): string {
    return `${ModuloRemainderDivisibilitySpecificationStrategyImpl.SPECIFICATION_NAME}[divisor=${this.divisor}]`;
  }

  override getSpecificationVersion(): string {
    return ModuloRemainderDivisibilitySpecificationStrategyImpl.SPECIFICATION_VERSION;
  }

  override getSpecificationDivisor(): number {
    return this.divisor;
  }
}
