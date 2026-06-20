import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { ISessionManagedResolver } from "../../contracts/ISessionManagedResolver.js";
import type { IFizzBuzzSessionManager } from "../../contracts/IFizzBuzzSessionManager.js";
import type { IResultPostProcessorChain } from "../../contracts/IResultPostProcessorChain.js";

export class SessionManagedResolverProxy implements ISessionManagedResolver {
  private readonly delegate: ICompositeValueResolver;
  private readonly sessionManager: IFizzBuzzSessionManager;
  private readonly postProcessorChain: IResultPostProcessorChain;

  constructor(
    delegate: ICompositeValueResolver,
    sessionManager: IFizzBuzzSessionManager,
    postProcessorChain: IResultPostProcessorChain,
  ) {
    this.delegate = delegate;
    this.sessionManager = sessionManager;
    this.postProcessorChain = postProcessorChain;
  }

  resolve(value: number): string {
    const rawResult = this.sessionManager.resolveWithinSession(value, this.delegate);
    return this.postProcessorChain.process(value, rawResult);
  }

  getSessionManager(): IFizzBuzzSessionManager {
    return this.sessionManager;
  }

  getPostProcessorChain(): IResultPostProcessorChain {
    return this.postProcessorChain;
  }
}
