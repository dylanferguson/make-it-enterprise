import type { IJmsMessageListener } from "../contracts/IJmsMessageListener.js";
import type { IJmsMessage } from "../contracts/IJmsMessage.js";

export abstract class AbstractBaseJmsMessageListener implements IJmsMessageListener {
  private readonly listenerName: string;
  private readonly listenerVersion: string;
  private invocationCount: number;

  constructor(listenerName: string, listenerVersion: string) {
    this.listenerName = listenerName;
    this.listenerVersion = listenerVersion;
    this.invocationCount = 0;
  }

  abstract onMessage(message: IJmsMessage): void;

  getListenerName(): string { return this.listenerName; }
  getListenerVersion(): string { return this.listenerVersion; }
  getInvocationCount(): number { return this.invocationCount; }

  protected incrementInvocationCount(): void {
    this.invocationCount++;
  }
}
