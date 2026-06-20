import type { IEnterpriseFizzBuzzPublicApiSessionFacade } from "../contracts/IEnterpriseFizzBuzzPublicApiSessionFacade.js";

export abstract class AbstractBaseEnterpriseFizzBuzzPublicApiSessionFacadeImpl
  implements IEnterpriseFizzBuzzPublicApiSessionFacade
{
  private readonly _sessionId: string;
  private _resolutionCount = 0;

  constructor() {
    this._sessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  }

  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract resolveSingleValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];

  isSessionActive(): boolean {
    return true;
  }

  getSessionId(): string {
    return this._sessionId;
  }

  getResolutionCount(): number {
    return this._resolutionCount;
  }

  incrementResolutionCount(): void {
    this._resolutionCount++;
  }
}
