import type { IJaasSubject } from "../contracts/index.js";
import type { IJaasLoginModule } from "../contracts/index.js";

export abstract class AbstractBaseJaasLoginModule implements IJaasLoginModule {
  protected subject: IJaasSubject | null = null;
  protected options: Record<string, string> = {};
  protected loginSucceeded: boolean = false;
  protected commitSucceeded: boolean = false;

  initialize(subject: IJaasSubject, options: Record<string, string>): void {
    this.subject = subject;
    this.options = { ...options };
    this.loginSucceeded = false;
    this.commitSucceeded = false;
  }

  abstract login(): boolean;
  abstract commit(): boolean;
  abstract abort(): boolean;
  abstract logout(): boolean;
  abstract getLoginModuleName(): string;
  abstract getLoginModuleVersion(): string;

  protected getOption(key: string, defaultValue: string = ""): string {
    return this.options[key] ?? defaultValue;
  }
}
