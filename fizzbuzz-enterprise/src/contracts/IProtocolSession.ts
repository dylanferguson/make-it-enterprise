export interface IProtocolSession {
  getSessionId(): string;
  getSessionCreationTimestamp(): Date;
  getNegotiatedParameter(key: string): unknown;
  setNegotiatedParameter(key: string, value: unknown): void;
  getComputationResult(): string | null;
  setComputationResult(result: string): void;
  isHandshakeComplete(): boolean;
  markHandshakeComplete(): void;
  isAcknowledgmentComplete(): boolean;
  markAcknowledgmentComplete(): void;
  getSessionAttribute(key: string): unknown;
  setSessionAttribute(key: string, value: unknown): void;
}
