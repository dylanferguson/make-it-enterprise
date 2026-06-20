import { FizzBuzzEnterpriseException } from "./FizzBuzzEnterpriseException.js";

export class SessionLifecycleException extends FizzBuzzEnterpriseException {
  private readonly sessionId: string | null;

  constructor(message: string, sessionId: string | null = null, cause: Error | null = null) {
    super(message, "FIZZBUZZ-2001", cause);
    this.name = "SessionLifecycleException";
    this.sessionId = sessionId;
  }

  getSessionId(): string | null {
    return this.sessionId;
  }
}
