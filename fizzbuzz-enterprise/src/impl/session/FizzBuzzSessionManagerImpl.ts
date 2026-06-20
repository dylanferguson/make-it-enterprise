import { AbstractBaseFizzBuzzSessionManager } from "../../abstracts/AbstractBaseFizzBuzzSessionManager.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import { SessionLifecycleException } from "../../exceptions/SessionLifecycleException.js";

export class FizzBuzzSessionManagerImpl extends AbstractBaseFizzBuzzSessionManager {
  private readonly sessionStack: string[] = [];

  override beginSession(): string {
    const sessionId = this.generateSessionId();
    this.sessionStack.push(sessionId);
    this.activeSessionId = sessionId;
    console.debug(`[SessionManager] Session started: ${sessionId}`);
    return sessionId;
  }

  override commitSession(sessionId: string): void {
    this.assertSessionActive(sessionId);
    const popped = this.sessionStack.pop();
    if (popped !== sessionId) {
      throw new SessionLifecycleException(
        `Session stack corruption: expected ${sessionId} but found ${popped}`,
        sessionId,
      );
    }
    this.activeSessionId = this.sessionStack.length > 0
      ? this.sessionStack[this.sessionStack.length - 1] ?? null
      : null;
    console.debug(`[SessionManager] Session committed: ${sessionId}`);
  }

  override rollbackSession(sessionId: string, error: Error): void {
    this.assertSessionActive(sessionId);
    const popped = this.sessionStack.pop();
    if (popped !== sessionId) {
      throw new SessionLifecycleException(
        `Session stack corruption during rollback: expected ${sessionId} but found ${popped}`,
        sessionId,
      );
    }
    this.activeSessionId = this.sessionStack.length > 0
      ? this.sessionStack[this.sessionStack.length - 1] ?? null
      : null;
    console.debug(`[SessionManager] Session rolled back: ${sessionId} due to: ${error.message}`);
  }

  override resolveWithinSession(value: number, resolver: ICompositeValueResolver): string {
    const sessionId = this.beginSession();
    try {
      this.executeInterceptorsOnBeforeResolve(value, sessionId);
      const result = resolver.resolve(value);
      this.executeInterceptorsOnAfterResolve(value, result, sessionId);
      this.commitSession(sessionId);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.executeInterceptorsOnError(value, err, sessionId);
      this.rollbackSession(sessionId, err);
      throw err;
    }
  }

  override getActiveSessionId(): string | null {
    return this.activeSessionId;
  }

  getSessionDepth(): number {
    return this.sessionStack.length;
  }
}
