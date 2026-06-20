import type { IFizzBuzzSessionManager } from "./IFizzBuzzSessionManager.js";
import type { ICompositeValueResolver } from "./ICompositeValueResolver.js";
import type { IResultPostProcessorChain } from "./IResultPostProcessorChain.js";

export interface ISessionManagedResolver extends ICompositeValueResolver {
  getSessionManager(): IFizzBuzzSessionManager;
  getPostProcessorChain(): IResultPostProcessorChain;
}
