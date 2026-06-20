export interface IEnterpriseFizzBuzzPublicApiSessionFacade {
  getFacadeName(): string;
  getFacadeVersion(): string;
  isSessionActive(): boolean;
  getSessionId(): string;
  resolveSingleValue(value: number): string;
  resolveRange(start: number, end: number): readonly string[];
  getResolutionCount(): number;
  incrementResolutionCount(): void;
}
