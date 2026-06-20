import type { ISessionInterceptor } from "../contracts/ISessionInterceptor.js";

export abstract class AbstractBaseSessionInterceptor implements ISessionInterceptor {
  abstract onBeforeResolve(value: number, sessionId: string): void;
  abstract onAfterResolve(value: number, result: string, sessionId: string): void;
  abstract onError(value: number, error: Error, sessionId: string): void;
  abstract getInterceptorName(): string;
  abstract getInterceptorPriority(): number;

  protected formatLogMessage(interceptorName: string, sessionId: string, message: string): string {
    return `[Session:${sessionId}][Interceptor:${interceptorName}] ${message}`;
  }
}
