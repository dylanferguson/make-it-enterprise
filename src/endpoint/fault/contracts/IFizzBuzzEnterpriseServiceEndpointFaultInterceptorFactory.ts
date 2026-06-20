import type { IFizzBuzzEnterpriseServiceEndpointFaultInterceptor } from "../../contracts/IFizzBuzzEnterpriseServiceEndpoint.js";

export interface IFizzBuzzEnterpriseServiceEndpointFaultInterceptorFactory {
  createFaultInterceptor(
    name: string,
    version: string,
    order: number,
    fallbackStatusCode: number,
    fallbackStatusDescription: string,
  ): IFizzBuzzEnterpriseServiceEndpointFaultInterceptor;
  getFactoryName(): string;
  getFactoryVersion(): string;
}
