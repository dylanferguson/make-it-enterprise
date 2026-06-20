import type { IJmsMessage } from "./IJmsMessage.js";

export interface IJmsExceptionListener {
  onException(exception: Error): void;
}
