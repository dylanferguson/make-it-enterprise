import { AbstractBaseProtocolSession } from "../../abstracts/AbstractBaseProtocolSession.js";

export class ProtocolSessionImpl extends AbstractBaseProtocolSession {
  private static readonly SESSION_ID_PREFIX = "proto:session";

  constructor(sessionId?: string) {
    super(sessionId ?? `${ProtocolSessionImpl.SESSION_ID_PREFIX}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`);
  }

  override getSessionId(): string {
    return this.sessionId;
  }
}
