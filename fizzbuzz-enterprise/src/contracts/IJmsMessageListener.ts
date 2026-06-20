import type { IJmsMessage } from "./IJmsMessage.js";

export interface IJmsMessageListener {
  getListenerName(): string;
  getListenerVersion(): string;
  onMessage(message: IJmsMessage): void;
}
