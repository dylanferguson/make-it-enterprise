import { AbstractBaseJaasLoginModule } from "../abstracts/AbstractBaseJaasLoginModule.js";
import { FizzBuzzPrincipalImpl } from "./FizzBuzzPrincipalImpl.js";

export class FizzBuzzLoginModuleImpl extends AbstractBaseJaasLoginModule {
  private static readonly LOGIN_MODULE_NAME = "FizzBuzzLoginModule";
  private static readonly LOGIN_MODULE_VERSION = "1.0.0-JAAS-LOGIN-MODULE";

  private static readonly DEFAULT_USERNAME = "fizzbuzz-service";
  private static readonly DEFAULT_ROLES = ["FizzBuzzUser", "FizzBuzzAdministrator"];

  login(): boolean {
    const username = this.getOption("principal.name", FizzBuzzLoginModuleImpl.DEFAULT_USERNAME);
    const rolesStr = this.getOption("principal.roles", FizzBuzzLoginModuleImpl.DEFAULT_ROLES.join(","));
    const roles = rolesStr.split(",").map(r => r.trim()).filter(r => r.length > 0);

    console.debug(
      `[${FizzBuzzLoginModuleImpl.LOGIN_MODULE_NAME}] Authenticating principal: ${username} with roles: [${roles.join(", ")}]`,
    );
    this.loginSucceeded = true;
    return true;
  }

  commit(): boolean {
    if (!this.loginSucceeded || this.subject === null) {
      this.commitSucceeded = false;
      return false;
    }
    const username = this.getOption("principal.name", FizzBuzzLoginModuleImpl.DEFAULT_USERNAME);
    const rolesStr = this.getOption("principal.roles", FizzBuzzLoginModuleImpl.DEFAULT_ROLES.join(","));
    const roles = rolesStr.split(",").map(r => r.trim()).filter(r => r.length > 0);

    const userPrincipal = new FizzBuzzPrincipalImpl(username, "FizzBuzzUser");
    this.subject.addPrincipal(userPrincipal);
    for (const role of roles) {
      const rolePrincipal = new FizzBuzzPrincipalImpl(role, "FizzBuzzRole");
      this.subject.addPrincipal(rolePrincipal);
    }
    this.commitSucceeded = true;
    return true;
  }

  abort(): boolean {
    this.loginSucceeded = false;
    this.commitSucceeded = false;
    return true;
  }

  logout(): boolean {
    this.loginSucceeded = false;
    this.commitSucceeded = false;
    if (this.subject !== null) {
      const principals = this.subject.getPrincipals();
      for (const p of [...principals]) {
        this.subject.removePrincipal(p);
      }
    }
    return true;
  }

  getLoginModuleName(): string {
    return FizzBuzzLoginModuleImpl.LOGIN_MODULE_NAME;
  }

  getLoginModuleVersion(): string {
    return FizzBuzzLoginModuleImpl.LOGIN_MODULE_VERSION;
  }
}
