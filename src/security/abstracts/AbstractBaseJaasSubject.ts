import type { IJaasSubject, IJaasPrincipal } from "../contracts/index.js";

export abstract class AbstractBaseJaasSubject implements IJaasSubject {
  protected readonly principals: IJaasPrincipal[] = [];
  protected readOnly: boolean = false;

  getPrincipals(): readonly IJaasPrincipal[] {
    return [...this.principals];
  }

  addPrincipal(principal: IJaasPrincipal): void {
    if (this.readOnly) {
      throw new Error(`[AbstractBaseJaasSubject] Cannot add principal to read-only subject: ${principal.getName()}`);
    }
    this.principals.push(principal);
  }

  removePrincipal(principal: IJaasPrincipal): boolean {
    if (this.readOnly) {
      throw new Error(`[AbstractBaseJaasSubject] Cannot remove principal from read-only subject: ${principal.getName()}`);
    }
    const index = this.principals.indexOf(principal);
    if (index !== -1) {
      this.principals.splice(index, 1);
      return true;
    }
    return false;
  }

  hasPrincipal(type: string, name: string): boolean {
    return this.principals.some(p => p.getPrincipalType() === type && p.getName() === name);
  }

  isSubjectReadOnly(): boolean {
    return this.readOnly;
  }

  setReadOnly(): void {
    this.readOnly = true;
  }

  abstract getSubjectDescriptor(): string;
}
