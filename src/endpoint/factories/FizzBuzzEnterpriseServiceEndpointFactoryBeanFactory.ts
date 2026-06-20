import type { IFizzBuzzEnterpriseServiceEndpoint } from "../contracts/IFizzBuzzEnterpriseServiceEndpoint.js";
import type { IFizzBuzzPipelineManager } from "../../pipeline/contracts/IFizzBuzzPipelineManager.js";
import { FizzBuzzEnterpriseServiceEndpointImpl } from "../impl/FizzBuzzEnterpriseServiceEndpointImpl.js";
import { EnterpriseServiceEndpointFaultInterceptorImpl } from "../fault/EnterpriseServiceEndpointFaultInterceptorImpl.js";
import { EnterpriseServiceEndpointDispatcherImpl } from "../dispatch/EnterpriseServiceEndpointDispatcherImpl.js";
import type { IFizzBuzzEnterpriseServiceEndpointDispatcher } from "../contracts/IFizzBuzzEnterpriseServiceEndpoint.js";
import type { IFizzBuzzEnterpriseServiceEndpointFaultInterceptor } from "../contracts/IFizzBuzzEnterpriseServiceEndpoint.js";

export const FizzBuzzEnterpriseServiceEndpointConfigurationProfile = {
  STANDARD: "STANDARD",
  FAULT_TOLERANT: "FAULT_TOLERANT",
  STRICT_VALIDATION: "STRICT_VALIDATION",
  FULLY_INSTRUMENTED: "FULLY_INSTRUMENTED",
} as const;

export type FizzBuzzEnterpriseServiceEndpointConfigurationProfile =
  (typeof FizzBuzzEnterpriseServiceEndpointConfigurationProfile)[keyof typeof FizzBuzzEnterpriseServiceEndpointConfigurationProfile];

export class FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ENDPOINT-FACTORY-BEAN";

  private static endpointInstance: IFizzBuzzEnterpriseServiceEndpoint | null = null;
  private static dispatcherInstance: IFizzBuzzEnterpriseServiceEndpointDispatcher | null = null;
  private static currentProfile: FizzBuzzEnterpriseServiceEndpointConfigurationProfile = "STANDARD";

  static createEndpoint(
    pipelineManagerResolver: () => IFizzBuzzPipelineManager,
    profile: FizzBuzzEnterpriseServiceEndpointConfigurationProfile = "STANDARD",
  ): IFizzBuzzEnterpriseServiceEndpoint {
    if (
      FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.endpointInstance === null ||
      FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.currentProfile !== profile
    ) {
      console.debug(
        `[${FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.FACTORY_BEAN_NAME} v${FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.FACTORY_BEAN_VERSION}] Creating endpoint with profile: ${profile}`,
      );

      let interceptors: readonly IFizzBuzzEnterpriseServiceEndpointFaultInterceptor[] = [];
      if (profile === "FAULT_TOLERANT" || profile === "FULLY_INSTRUMENTED") {
        interceptors = [
          new EnterpriseServiceEndpointFaultInterceptorImpl(
            "DefaultEndpointFaultInterceptor",
            "1.0.0-FAULT-INTERCEPTOR",
            0,
            500,
            "ENDPOINT_FAULT_FALLBACK",
          ),
        ];
      }

      const endpoint = new FizzBuzzEnterpriseServiceEndpointImpl(pipelineManagerResolver, interceptors);
      FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.endpointInstance = endpoint;
      FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.currentProfile = profile;

      const dispatcher = new EnterpriseServiceEndpointDispatcherImpl();
      FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.dispatcherInstance = dispatcher;

      console.debug(
        `[${FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.FACTORY_BEAN_NAME} v${FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Endpoint created: name=[${endpoint.getEndpointName()}], ` +
        `version=[${endpoint.getEndpointVersion()}], ` +
        `available=[${endpoint.isEndpointAvailable()}], ` +
        `wsdl=[${endpoint.getEndpointWsdUrl()}], ` +
        `faultInterceptors=[${endpoint.getFaultInterceptorChain().length}], ` +
        `dispatcher=[${dispatcher.getDispatcherName()} v${dispatcher.getDispatcherVersion()}], ` +
        `dispatchProtocol=[${dispatcher.getDispatchProtocol()}], ` +
        `profile=[${profile}]`,
      );
    }
    return FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.endpointInstance!;
  }

  static getEndpoint(): IFizzBuzzEnterpriseServiceEndpoint | null {
    return FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.endpointInstance;
  }

  static getDispatcher(): IFizzBuzzEnterpriseServiceEndpointDispatcher | null {
    return FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.dispatcherInstance;
  }

  static getCurrentProfile(): FizzBuzzEnterpriseServiceEndpointConfigurationProfile {
    return FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.currentProfile;
  }

  static resetEndpointInfrastructure(): void {
    FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.endpointInstance = null;
    FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.dispatcherInstance = null;
    FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.currentProfile = "STANDARD";
  }

  static isEndpointInfrastructureInitialized(): boolean {
    return FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.endpointInstance !== null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzEnterpriseServiceEndpointFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
