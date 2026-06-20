import type { IJaasCallbackHandler } from "../contracts/index.js";

export class StandardJaasCallbackHandlerImpl implements IJaasCallbackHandler {
  private static readonly CALLBACK_HANDLER_NAME = "StandardJaasCallbackHandler";
  private static readonly CALLBACK_HANDLER_VERSION = "1.0.0-JAAS-CALLBACK";

  handle(callbacks: unknown[]): void {
    for (const callback of callbacks) {
      if (typeof callback === "object" && callback !== null) {
        const cb = callback as Record<string, unknown>;
        if (cb.name === "NameCallback" && typeof cb.setUserName === "function") {
          (cb.setUserName as (name: string) => void)("fizzbuzz-service");
        } else if (cb.name === "PasswordCallback" && typeof cb.setPassword === "function") {
          (cb.setPassword as (pwd: string) => void)("fizzbuzz-password");
        }
      }
    }
  }

  getCallbackHandlerName(): string {
    return StandardJaasCallbackHandlerImpl.CALLBACK_HANDLER_NAME;
  }

  getCallbackHandlerVersion(): string {
    return StandardJaasCallbackHandlerImpl.CALLBACK_HANDLER_VERSION;
  }
}
