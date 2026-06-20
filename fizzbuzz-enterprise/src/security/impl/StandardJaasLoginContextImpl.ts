import { AbstractBaseJaasLoginContext } from "../abstracts/AbstractBaseJaasLoginContext.js";
import type { IJaasSubject, IJaasLoginModule, IJaasCallbackHandler } from "../contracts/index.js";

export class StandardJaasLoginContextImpl extends AbstractBaseJaasLoginContext {
  private static readonly CONTEXT_NAME = "StandardJaasLoginContext";
  private static readonly CONTEXT_VERSION = "1.0.0-JAAS-CONTEXT";

  constructor(
    subject: IJaasSubject,
    loginModules: IJaasLoginModule[],
    callbackHandler: IJaasCallbackHandler | null = null,
  ) {
    super(
      StandardJaasLoginContextImpl.CONTEXT_NAME,
      StandardJaasLoginContextImpl.CONTEXT_VERSION,
      subject,
      loginModules,
      callbackHandler,
    );
  }

  override login(): void {
    const startTime = performance.now();
    try {
      for (const module of this.loginModules) {
        module.initialize(this.subject, {
          "principal.name": "fizzbuzz-service",
          "principal.roles": "FizzBuzzUser,FizzBuzzAdministrator",
        });
        const loginResult = module.login();
        if (loginResult) {
          const commitResult = module.commit();
          if (!commitResult) {
            module.abort();
            throw new Error(`[${StandardJaasLoginContextImpl.CONTEXT_NAME}] Login module commit failed: ${module.getLoginModuleName()}`);
          }
        }
      }
      this.authenticated = true;
      const durationMs = performance.now() - startTime;
      console.debug(
        `[${StandardJaasLoginContextImpl.CONTEXT_NAME}] JAAS login completed in ${durationMs.toFixed(2)}ms: ` +
        `subject=[${this.subject.getSubjectDescriptor()}], ` +
        `modules=[${this.loginModules.map(m => m.getLoginModuleName()).join(", ")}]`,
      );
    } catch (error) {
      this.authenticated = false;
      for (const module of this.loginModules) {
        try { module.abort(); } catch { /* cleanup */ }
      }
      throw new Error(
        `[${StandardJaasLoginContextImpl.CONTEXT_NAME}] JAAS login failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  override logout(): void {
    this.authenticated = false;
    for (const module of this.loginModules) {
      try { module.logout(); } catch { /* cleanup */ }
    }
    console.debug(
      `[${StandardJaasLoginContextImpl.CONTEXT_NAME}] JAAS logout completed for subject: ${this.subject.getSubjectDescriptor()}`,
    );
  }
}
