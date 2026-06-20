import type { IJmsConnection } from "../contracts/IJmsConnection.js";
import type { IJmsSession } from "../contracts/IJmsSession.js";
import type { IJmsExceptionListener } from "../contracts/IJmsExceptionListener.js";
import type { JmsAcknowledgementMode } from "../contracts/JmsTypes.js";

export abstract class AbstractBaseJmsConnection implements IJmsConnection {
  private readonly connectionName: string;
  private readonly connectionVersion: string;
  private clientId: string;
  private running: boolean;
  private exceptionListener: IJmsExceptionListener | null;
  protected sessions: IJmsSession[];

  constructor(connectionName: string, connectionVersion: string) {
    this.connectionName = connectionName;
    this.connectionVersion = connectionVersion;
    this.clientId = "";
    this.running = false;
    this.exceptionListener = null;
    this.sessions = [];
  }

  abstract createSession(acknowledgementMode: JmsAcknowledgementMode): IJmsSession;
  abstract createTransactedSession(): IJmsSession;

  getConnectionName(): string { return this.connectionName; }
  getConnectionVersion(): string { return this.connectionVersion; }
  getClientId(): string { return this.clientId; }
  setClientId(clientId: string): void { this.clientId = clientId; }

  start(): void {
    this.running = true;
  }

  stop(): void {
    this.running = false;
  }

  close(): void {
    this.running = false;
    for (const session of this.sessions) {
      session.close();
    }
    this.sessions = [];
  }

  isRunning(): boolean { return this.running; }
  getExceptionListener(): IJmsExceptionListener | null { return this.exceptionListener; }
  setExceptionListener(listener: IJmsExceptionListener): void { this.exceptionListener = listener; }
}
