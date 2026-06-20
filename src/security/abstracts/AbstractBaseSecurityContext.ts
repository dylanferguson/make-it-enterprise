import type { IJaasSubject, IJaasPrincipal } from "../contracts/index.js";
import type { ISecurityContext } from "../contracts/index.js";

export abstract class AbstractBaseSecurityContext implements ISecurityContext {
  protected readonly name: string;
  protected readonly version: string;
  protected subject: IJaasSubject;

  constructor(name: string, version: string, subject: IJaasSubject) {
    this.name = name;
    this.version = version;
    this.subject = subject;
  }

  abstract getCallerPrincipal(): IJaasPrincipal;
  abstract isCallerInRole(role: string): boolean;

  getSubject(): IJaasSubject {
    return this.subject;
  }

  getSecurityContextName(): string {
    return this.name;
  }

  getSecurityContextVersion(): string {
    return this.version;
  }
}
