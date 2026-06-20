import type { IJmsSession } from "./IJmsSession.js";
import type { IJmsExceptionListener } from "./IJmsExceptionListener.js";
import type { JmsAcknowledgementMode } from "./JmsTypes.js";

export interface IJmsConnection {
  getConnectionName(): string;
  getConnectionVersion(): string;
  getClientId(): string;
  setClientId(clientId: string): void;
  createSession(acknowledgementMode: JmsAcknowledgementMode): IJmsSession;
  createTransactedSession(): IJmsSession;
  start(): void;
  stop(): void;
  close(): void;
  isRunning(): boolean;
  getExceptionListener(): IJmsExceptionListener | null;
  setExceptionListener(listener: IJmsExceptionListener): void;
}
