export interface ISessionInterceptor {
  onBeforeResolve(value: number, sessionId: string): void;
  onAfterResolve(value: number, result: string, sessionId: string): void;
  onError(value: number, error: Error, sessionId: string): void;
  getInterceptorName(): string;
  getInterceptorPriority(): number;
}
