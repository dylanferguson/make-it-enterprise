import { FizzBuzzEnterpriseServiceFactoryBeanFactory } from "./enterprise/FizzBuzzEnterpriseService.js";
import { FizzBuzzEnterpriseServiceFacadeImpl } from "./impl/delegates/FizzBuzzEnterpriseServiceFacadeImpl.js";
import { FizzBuzzClientSideServiceDelegateImpl } from "./impl/delegates/FizzBuzzClientSideServiceDelegateImpl.js";
import { BusinessDelegateLookupServiceFactoryBean } from "./impl/delegates/BusinessDelegateLookupServiceFactoryBean.js";
import { FizzBuzzCommandInfrastructureFacadeImpl } from "./impl/services/FizzBuzzCommandInfrastructureFacadeImpl.js";
import { FizzBuzzValueResolutionCommandImpl } from "./impl/commands/FizzBuzzValueResolutionCommandImpl.js";
import { FizzBuzzComputationRequestImpl } from "./impl/dto/FizzBuzzComputationRequestImpl.js";
import type { IFizzBuzzComputationCommand } from "./contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzCommandInvoker } from "./contracts/IFizzBuzzCommandInvoker.js";
import type { IFizzBuzzCommandInfrastructureFacade } from "./contracts/IFizzBuzzCommandInfrastructureFacade.js";

const enterpriseService = FizzBuzzEnterpriseServiceFactoryBeanFactory.createEnterpriseService();

const enterpriseServiceFacade = new FizzBuzzEnterpriseServiceFacadeImpl(enterpriseService);
const clientSideDelegate = new FizzBuzzClientSideServiceDelegateImpl(enterpriseServiceFacade);
const lookupServiceFactoryBean = BusinessDelegateLookupServiceFactoryBean.createLookupServiceFactoryBean(
  clientSideDelegate,
  "java:comp/env/fizzbuzz/DefaultEnterpriseServiceDelegate",
);
const lookupService = lookupServiceFactoryBean.createLookupService();
const delegatedJndiName = "java:comp/env/fizzbuzz/DefaultEnterpriseServiceDelegate";

const commandInfrastructureFacade: IFizzBuzzCommandInfrastructureFacade =
  FizzBuzzCommandInfrastructureFacadeImpl.createDefaultFacade();
const commandInvoker: IFizzBuzzCommandInvoker = commandInfrastructureFacade.getCommandInvoker();

const fizzBuzzValueResolutionCommand: IFizzBuzzComputationCommand =
  new FizzBuzzValueResolutionCommandImpl(
    lookupService.lookupDelegate(delegatedJndiName),
    delegatedJndiName,
  );

export function fizzBuzzValue(value: number): string {
  const request = new FizzBuzzComputationRequestImpl(
    value,
    `req:cmd:value:${value}:${Date.now()}`,
    "FizzBuzzCommandInfrastructureFacade",
  );
  const response = commandInvoker.invokeCommand(fizzBuzzValueResolutionCommand, request);
  return response.getComputedResult();
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  const responses: string[] = [];
  for (let i = start; i <= end; i++) {
    const request = new FizzBuzzComputationRequestImpl(
      i,
      `req:cmd:range:${start}:${end}:idx:${i}:${Date.now()}`,
      "FizzBuzzCommandInfrastructureFacade",
    );
    const response = commandInvoker.invokeCommand(fizzBuzzValueResolutionCommand, request);
    responses.push(response.getComputedResult());
  }
  return responses;
}
