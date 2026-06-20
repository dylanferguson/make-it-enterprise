import type { IFizzBuzzEnterpriseServiceEndpointDispatcher } from "../../contracts/IFizzBuzzEnterpriseServiceEndpoint.js";

export interface IFizzBuzzEnterpriseServiceEndpointDispatcherFactory {
  createDispatcher(name: string, version: string, protocol: string): IFizzBuzzEnterpriseServiceEndpointDispatcher;
  getFactoryName(): string;
  getFactoryVersion(): string;
}
