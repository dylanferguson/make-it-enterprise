import type { IProtocolSession } from "../contracts/IProtocolSession.js";

export abstract class AbstractBaseProtocolSession implements IProtocolSession {
  protected readonly sessionId: string;
  protected readonly sessionCreationTimestamp: Date;
  protected readonly negotiatedParameters: Map<string, unknown> = new Map();
  protected readonly sessionAttributes: Map<string, unknown> = new Map();
  protected computationResult: string | null = null;
  protected handshakeComplete: boolean = false;
  protected acknowledgmentComplete: boolean = false;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.sessionCreationTimestamp = new Date();
  }

  abstract getSessionId(): string;

  getSessionCreationTimestamp(): Date {
    return this.sessionCreationTimestamp;
  }

  getNegotiatedParameter(key: string): unknown {
    return this.negotiatedParameters.get(key);
  }

  setNegotiatedParameter(key: string, value: unknown): void {
    this.negotiatedParameters.set(key, value);
  }

  getComputationResult(): string | null {
    return this.computationResult;
  }

  setComputationResult(result: string): void {
    this.computationResult = result;
  }

  isHandshakeComplete(): boolean {
    return this.handshakeComplete;
  }

  markHandshakeComplete(): void {
    this.handshakeComplete = true;
  }

  isAcknowledgmentComplete(): boolean {
    return this.acknowledgmentComplete;
  }

  markAcknowledgmentComplete(): void {
    this.acknowledgmentComplete = true;
  }

  getSessionAttribute(key: string): unknown {
    return this.sessionAttributes.get(key);
  }

  setSessionAttribute(key: string, value: unknown): void {
    this.sessionAttributes.set(key, value);
  }

  getSessionDurationMs(): number {
    return Date.now() - this.sessionCreationTimestamp.getTime();
  }
}
