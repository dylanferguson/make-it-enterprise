import { FizzBuzzEnterpriseServiceFactoryBeanFactory } from "./enterprise/FizzBuzzEnterpriseService.js";
import { FizzBuzzEnterpriseServiceFacadeImpl } from "./impl/delegates/FizzBuzzEnterpriseServiceFacadeImpl.js";
import { FizzBuzzClientSideServiceDelegateImpl } from "./impl/delegates/FizzBuzzClientSideServiceDelegateImpl.js";
import { BusinessDelegateLookupServiceFactoryBean } from "./impl/delegates/BusinessDelegateLookupServiceFactoryBean.js";
import { FizzBuzzServiceDelegateFactoryBeanFactory } from "./impl/delegates/FizzBuzzServiceDelegateFactoryBeanFactory.js";

const enterpriseService = FizzBuzzEnterpriseServiceFactoryBeanFactory.createEnterpriseService();

const enterpriseServiceFacade = new FizzBuzzEnterpriseServiceFacadeImpl(enterpriseService);
const clientSideDelegate = new FizzBuzzClientSideServiceDelegateImpl(enterpriseServiceFacade);
const lookupServiceFactoryBean = BusinessDelegateLookupServiceFactoryBean.createLookupServiceFactoryBean(
  clientSideDelegate,
  "java:comp/env/fizzbuzz/DefaultEnterpriseServiceDelegate",
);
const lookupService = lookupServiceFactoryBean.createLookupService();
const delegateFactoryBeanFactory = new FizzBuzzServiceDelegateFactoryBeanFactory(
  lookupService,
  "java:comp/env/fizzbuzz/DefaultEnterpriseServiceDelegate",
);

export function fizzBuzzValue(value: number): string {
  const response = delegateFactoryBeanFactory.resolveSingleValue(value);
  return response.getComputedResult();
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  const responses = delegateFactoryBeanFactory.resolveRange(start, end);
  return responses.map((response) => response.getComputedResult());
}
