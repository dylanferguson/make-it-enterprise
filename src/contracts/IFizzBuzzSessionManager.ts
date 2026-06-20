import type { ISessionInterceptor } from "./ISessionInterceptor.js";
import type { ICompositeValueResolver } from "./ICompositeValueResolver.js";

export interface IFizzBuzzSessionManager {
  beginSession(): string;
  commitSession(sessionId: string): void;
  rollbackSession(sessionId: string, error: Error): void;
  resolveWithinSession(value: number, resolver: ICompositeValueResolver): string;
  getActiveSessionId(): string | null;
  registerInterceptor(interceptor: ISessionInterceptor): void;
}
