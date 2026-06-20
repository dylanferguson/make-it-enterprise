import { FizzBuzzEnterpriseServiceFactoryBeanFactory } from "./enterprise/FizzBuzzEnterpriseService.js";
import { FizzBuzzEnterpriseServiceFacadeImpl } from "./impl/delegates/FizzBuzzEnterpriseServiceFacadeImpl.js";
import { FizzBuzzClientSideServiceDelegateImpl } from "./impl/delegates/FizzBuzzClientSideServiceDelegateImpl.js";
import { BusinessDelegateLookupServiceFactoryBean } from "./impl/delegates/BusinessDelegateLookupServiceFactoryBean.js";
import { FizzBuzzCommandInfrastructureFacadeImpl } from "./impl/services/FizzBuzzCommandInfrastructureFacadeImpl.js";
import { FizzBuzzValueResolutionCommandImpl } from "./impl/commands/FizzBuzzValueResolutionCommandImpl.js";
import { FizzBuzzComputationRequestBuilderImpl } from "./impl/builders/FizzBuzzComputationRequestBuilderImpl.js";
import type { IFizzBuzzComputationCommand } from "./contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzCommandInvoker } from "./contracts/IFizzBuzzCommandInvoker.js";
import type { IFizzBuzzCommandInfrastructureFacade } from "./contracts/IFizzBuzzCommandInfrastructureFacade.js";
import type { IFizzBuzzComputationTemplate } from "./contracts/IFizzBuzzComputationTemplate.js";
import type { IFizzBuzzComputationRequestBuilder } from "./contracts/IFizzBuzzComputationRequestBuilder.js";
import { FizzBuzzComputationTemplateFactoryBean } from "./impl/factories/FizzBuzzComputationTemplateFactoryBean.js";

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

const computationTemplate: IFizzBuzzComputationTemplate =
  FizzBuzzComputationTemplateFactoryBean.createTemplate();

const requestBuilder: IFizzBuzzComputationRequestBuilder =
  new FizzBuzzComputationRequestBuilderImpl();

class FizzBuzzSingleValueResolutionFacade {
  private static readonly FACADE_NAME = "FizzBuzzSingleValueResolutionFacade";
  private static readonly FACADE_VERSION = "1.0.0-RESOLUTION-FACADE";
  private static readonly REQUEST_ORIGIN = "FizzBuzzCommandInfrastructureFacade";

  resolveValue(value: number): string {
    const request = requestBuilder
      .reset()
      .withRequestedValue(value)
      .withRequestOrigin(FizzBuzzSingleValueResolutionFacade.REQUEST_ORIGIN)
      .withRequestIdPrefix("req:cmd:value")
      .build();

    const response = computationTemplate.executeComputation(
      fizzBuzzValueResolutionCommand,
      request,
    );

    return response.getComputedResult();
  }

  resolveRange(start: number, end: number): readonly string[] {
    const responses: string[] = [];
    for (let i = start; i <= end; i++) {
      const request = requestBuilder
        .reset()
        .withRequestedValue(i)
        .withRequestOrigin(FizzBuzzSingleValueResolutionFacade.REQUEST_ORIGIN)
        .withRequestIdPrefix(`req:cmd:range:${start}:${end}:idx`)
        .build();

      const response = computationTemplate.executeComputation(
        fizzBuzzValueResolutionCommand,
        request,
      );

      responses.push(response.getComputedResult());
    }
    return responses;
  }

  getFacadeName(): string {
    return FizzBuzzSingleValueResolutionFacade.FACADE_NAME;
  }

  getFacadeVersion(): string {
    return FizzBuzzSingleValueResolutionFacade.FACADE_VERSION;
  }
}

const resolutionFacade = new FizzBuzzSingleValueResolutionFacade();

export function fizzBuzzValue(value: number): string {
  return resolutionFacade.resolveValue(value);
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  return resolutionFacade.resolveRange(start, end);
}
