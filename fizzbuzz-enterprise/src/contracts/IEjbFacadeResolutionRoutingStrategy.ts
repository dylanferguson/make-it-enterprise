import type { IFizzBuzzSingleValueResolutionFacade } from "./IFizzBuzzSingleValueResolutionFacade.js";

export interface IEjbFacadeResolutionRoutingStrategy {
  getRoutingStrategyName(): string;
  getRoutingStrategyVersion(): string;
  routeThroughEjb(value: number, inner: (v: number) => string): string;
}

export interface IJndiToEjbResolutionRouter {
  getRouterName(): string;
  getRouterVersion(): string;
  resolveViaJndiEjbLookup(value: number): string;
}
