import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export interface IEnterpriseFizzBuzzResultFormatterBridge extends IFizzBuzzSingleValueResolutionFacade {
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getBridgeName(): string;
  getBridgeVersion(): string;
  getBridgeImplementationType(): string;
  getFlyweightCacheHitCount(): number;
  getFlyweightCacheMissCount(): number;
  isFormatterBridgeEnabled(): boolean;
}
