import { AbstractBaseSecurityContext } from "../abstracts/AbstractBaseSecurityContext.js";
import type { IJaasSubject, IJaasPrincipal } from "../contracts/index.js";

export class StandardSecurityContextImpl extends AbstractBaseSecurityContext {
  private static readonly SECURITY_CONTEXT_NAME = "StandardSecurityContext";
  private static readonly SECURITY_CONTEXT_VERSION = "1.0.0-JAAS-CONTEXT";

  constructor(subject: IJaasSubject) {
    super(
      StandardSecurityContextImpl.SECURITY_CONTEXT_NAME,
      StandardSecurityContextImpl.SECURITY_CONTEXT_VERSION,
      subject,
    );
  }

  getCallerPrincipal(): IJaasPrincipal {
    const userPrincipals = this.subject
      .getPrincipals()
      .filter(p => p.getPrincipalType() === "FizzBuzzUser");
    if (userPrincipals.length === 0) {
      throw new Error(`[${StandardSecurityContextImpl.SECURITY_CONTEXT_NAME}] No caller principal found in subject`);
    }
    return userPrincipals[0] as IJaasPrincipal;
  }

  isCallerInRole(role: string): boolean {
    return this.subject.getPrincipals().some(
      p => p.getPrincipalType() === "FizzBuzzRole" && p.getName() === role,
    );
  }
}
