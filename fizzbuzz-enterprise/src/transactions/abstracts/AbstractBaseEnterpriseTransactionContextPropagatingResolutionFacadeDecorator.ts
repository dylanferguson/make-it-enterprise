import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator } from "../contracts/IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator.js";

export abstract class AbstractBaseEnterpriseTransactionContextPropagatingResolutionFacadeDecorator
  implements IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator
{
  protected static readonly FACADE_OPERATION_PREFIX = "ENT-TX-FACADE";

  protected readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly transactionAttributeType: string;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    transactionAttributeType: string,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.transactionAttributeType = transactionAttributeType;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getTransactionAttributeType(): string {
    return this.transactionAttributeType;
  }

  protected buildOperationContext(value: number): string {
    return `${AbstractBaseEnterpriseTransactionContextPropagatingResolutionFacadeDecorator.FACADE_OPERATION_PREFIX}:${value}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }
}
