import type { IFizzBuzzSessionManager } from "../contracts/IFizzBuzzSessionManager.js";
import type { ISessionInterceptor } from "../contracts/ISessionInterceptor.js";
import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";
import { SessionLifecycleException } from "../exceptions/SessionLifecycleException.js";

export abstract class AbstractBaseFizzBuzzSessionManager implements IFizzBuzzSessionManager {
  protected readonly interceptors: ISessionInterceptor[] = [];
  protected activeSessionId: string | null = null;

  abstract beginSession(): string;
  abstract commitSession(sessionId: string): void;
  abstract rollbackSession(sessionId: string, error: Error): void;
  abstract resolveWithinSession(
    value: number,
    resolver: ICompositeValueResolver,
  ): string;
  abstract getActiveSessionId(): string | null;

  registerInterceptor(interceptor: ISessionInterceptor): void {
    this.interceptors.push(interceptor);
    this.interceptors.sort((a, b) => b.getInterceptorPriority() - a.getInterceptorPriority());
  }

  protected executeInterceptorsOnBeforeResolve(value: number, sessionId: string): void {
    for (const interceptor of this.interceptors) {
      interceptor.onBeforeResolve(value, sessionId);
    }
  }

  protected executeInterceptorsOnAfterResolve(
    value: number,
    result: string,
    sessionId: string,
  ): void {
    for (const interceptor of this.interceptors) {
      interceptor.onAfterResolve(value, result, sessionId);
    }
  }

  protected executeInterceptorsOnError(value: number, error: Error, sessionId: string): void {
    for (const interceptor of this.interceptors) {
      interceptor.onError(value, error, sessionId);
    }
  }

  protected assertSessionActive(sessionId: string): void {
    if (this.activeSessionId !== sessionId) {
      throw new SessionLifecycleException(
        `Session ${sessionId} is not the active session. Active: ${this.activeSessionId}`,
        sessionId,
      );
    }
  }

  protected generateSessionId(): string {
    return `FIZZBUZZ-SESSION-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  }
}
