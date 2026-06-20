import { AbstractBaseJmsMessageListener } from "../../abstracts/AbstractBaseJmsMessageListener.js";
import type { IJmsMessage } from "../../contracts/IJmsMessage.js";

export class EnterpriseJmsMessageListenerImpl extends AbstractBaseJmsMessageListener {
  private lastReceivedMessage: IJmsMessage | null;
  private lastReceivedTimestamp: number;

  constructor() {
    super("EnterpriseJmsMessageListener", "1.0.0-ENTERPRISE-JMS-LISTENER");
    this.lastReceivedMessage = null;
    this.lastReceivedTimestamp = 0;
  }

  override onMessage(message: IJmsMessage): void {
    this.incrementInvocationCount();
    this.lastReceivedMessage = message;
    this.lastReceivedTimestamp = Date.now();
  }

  getLastReceivedMessage(): IJmsMessage | null { return this.lastReceivedMessage; }
  getLastReceivedTimestamp(): number { return this.lastReceivedTimestamp; }
}
