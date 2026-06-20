import type { IJaasSubject, IJaasLoginModule, IJaasCallbackHandler } from "../contracts/index.js";
import type { IJaasLoginContext } from "../contracts/index.js";

export abstract class AbstractBaseJaasLoginContext implements IJaasLoginContext {
  protected readonly name: string;
  protected readonly version: string;
  protected subject: IJaasSubject;
  protected loginModules: IJaasLoginModule[];
  protected callbackHandler: IJaasCallbackHandler | null;
  protected authenticated: boolean = false;

  constructor(
    name: string,
    version: string,
    subject: IJaasSubject,
    loginModules: IJaasLoginModule[],
    callbackHandler: IJaasCallbackHandler | null = null,
  ) {
    this.name = name;
    this.version = version;
    this.subject = subject;
    this.loginModules = loginModules;
    this.callbackHandler = callbackHandler;
  }

  abstract login(): void;
  abstract logout(): void;

  getSubject(): IJaasSubject {
    return this.subject;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getLoginContextName(): string {
    return this.name;
  }

  getLoginContextVersion(): string {
    return this.version;
  }
}
