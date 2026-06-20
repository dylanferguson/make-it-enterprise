import { AbstractBaseJmsConnection } from "../../abstracts/AbstractBaseJmsConnection.js";
import type { IJmsSession } from "../../contracts/IJmsSession.js";
import type { IJmsExceptionListener } from "../../contracts/IJmsExceptionListener.js";
import type { JmsAcknowledgementMode } from "../../contracts/IJmsMessage.js";
import { EnterpriseJmsSessionImpl } from "./EnterpriseJmsSessionImpl.js";

export class EnterpriseJmsConnectionImpl extends AbstractBaseJmsConnection {
  private static readonly DEFAULT_USERNAME = "fizzbuzz-admin";
  private static readonly DEFAULT_PASSWORD = "fizzbuzz-enterprise-secret";
  private userName: string;
  private password: string;
  private properties: Map<string, string>;

  constructor(connectionName: string, connectionVersion: string) {
    super(connectionName, connectionVersion);
    this.userName = EnterpriseJmsConnectionImpl.DEFAULT_USERNAME;
    this.password = EnterpriseJmsConnectionImpl.DEFAULT_PASSWORD;
    this.properties = new Map();
  }

  setStringProperty(name: string, value: string): void {
    this.properties.set(name, value);
  }

  override createSession(acknowledgementMode: JmsAcknowledgementMode): IJmsSession {
    const session = new EnterpriseJmsSessionImpl(
      `EnterpriseJmsSession-${this.sessions.length + 1}`,
      "1.0.0-ENTERPRISE-JMS-SESSION",
      acknowledgementMode,
      false,
    );
    this.sessions.push(session);
    return session;
  }

  override createTransactedSession(): IJmsSession {
    const session = new EnterpriseJmsSessionImpl(
      `EnterpriseJmsTransactedSession-${this.sessions.length + 1}`,
      "1.0.0-ENTERPRISE-JMS-TX-SESSION",
      "TRANSACTED",
      true,
    );
    this.sessions.push(session);
    return session;
  }
}
