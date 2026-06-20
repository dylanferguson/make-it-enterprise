import type { IBusinessDelegateLookupService } from "../../contracts/IBusinessDelegateLookupService.js";
import type { IFizzBuzzServiceDelegate } from "../../contracts/IFizzBuzzServiceDelegate.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import { FizzBuzzComputationRequestImpl } from "../dto/FizzBuzzComputationRequestImpl.js";

export class FizzBuzzServiceDelegateFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "FizzBuzzServiceDelegateFactoryBeanFactory";
  private static readonly DEFAULT_JNDI_NAME = "java:comp/env/fizzbuzz/DefaultEnterpriseServiceDelegate";

  private readonly lookupService: IBusinessDelegateLookupService;
  private readonly delegateJndiName: string;

  constructor(
    lookupService: IBusinessDelegateLookupService,
    delegateJndiName: string = FizzBuzzServiceDelegateFactoryBeanFactory.DEFAULT_JNDI_NAME,
  ) {
    this.lookupService = lookupService;
    this.delegateJndiName = delegateJndiName;
  }

  resolveSingleValue(value: number): IFizzBuzzComputationResponse {
    const delegate = this.lookupService.lookupDelegate(this.delegateJndiName);
    const request = new FizzBuzzComputationRequestImpl(
      value,
      `req:${FizzBuzzServiceDelegateFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME}:${value}:${Date.now()}`,
      FizzBuzzServiceDelegateFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME,
    );
    return delegate.delegateSingleValueResolution(request);
  }

  resolveRange(start: number, end: number): readonly IFizzBuzzComputationResponse[] {
    const delegate = this.lookupService.lookupDelegate(this.delegateJndiName);
    const startRequest = new FizzBuzzComputationRequestImpl(
      start,
      `req:range:${start}:${end}:start:${Date.now()}`,
      FizzBuzzServiceDelegateFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME,
    );
    const endRequest = new FizzBuzzComputationRequestImpl(
      end,
      `req:range:${start}:${end}:end:${Date.now()}`,
      FizzBuzzServiceDelegateFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME,
    );
    return delegate.delegateRangeComputation(startRequest, endRequest);
  }

  getLookupService(): IBusinessDelegateLookupService {
    return this.lookupService;
  }

  getDelegateJndiName(): string {
    return this.delegateJndiName;
  }

  getFactoryBeanFactoryName(): string {
    return FizzBuzzServiceDelegateFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME;
  }
}
