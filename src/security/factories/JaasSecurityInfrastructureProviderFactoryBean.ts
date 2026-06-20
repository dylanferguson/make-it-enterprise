import { FizzBuzzSubjectImpl } from "../impl/FizzBuzzSubjectImpl.js";
import { FizzBuzzLoginModuleImpl } from "../impl/FizzBuzzLoginModuleImpl.js";
import { StandardJaasLoginContextImpl } from "../impl/StandardJaasLoginContextImpl.js";
import { StandardJaasCallbackHandlerImpl } from "../impl/StandardJaasCallbackHandlerImpl.js";
import { StandardSecurityContextImpl } from "../impl/StandardSecurityContextImpl.js";
import type { IJaasSubject, IJaasLoginContext, ISecurityContext } from "../contracts/index.js";
import type { ISecurityInfrastructureProvider } from "../contracts/index.js";

const INFRASTRUCTURE_PROVIDER_NAME = "JaasSecurityInfrastructureProvider";
const INFRASTRUCTURE_PROVIDER_VERSION = "1.0.0-JAAS-INFRASTRUCTURE-PROVIDER";

let securityInfrastructureInitialized = false;
let cachedLoginContext: IJaasLoginContext | null = null;
let cachedSecurityContext: ISecurityContext | null = null;
let cachedSubject: IJaasSubject | null = null;

export class JaasSecurityInfrastructureProviderFactoryBean
  implements ISecurityInfrastructureProvider
{
  initializeSecurityInfrastructure(): boolean {
    if (securityInfrastructureInitialized) {
      return true;
    }
    const subject = new FizzBuzzSubjectImpl();
    const loginModule = new FizzBuzzLoginModuleImpl();
    const callbackHandler = new StandardJaasCallbackHandlerImpl();
    const loginContext = new StandardJaasLoginContextImpl(
      subject,
      [loginModule],
      callbackHandler,
    );
    loginContext.login();
    const securityContext = new StandardSecurityContextImpl(loginContext.getSubject());
    cachedSubject = loginContext.getSubject();
    cachedLoginContext = loginContext;
    cachedSecurityContext = securityContext;
    securityInfrastructureInitialized = true;
    console.debug(
      `[${INFRASTRUCTURE_PROVIDER_NAME}] JAAS security infrastructure initialized: ` +
      `subject=[${cachedSubject.getSubjectDescriptor()}], ` +
      `loginContext=[${cachedLoginContext.getLoginContextName()} v${cachedLoginContext.getLoginContextVersion()}], ` +
      `securityContext=[${cachedSecurityContext.getSecurityContextName()} v${cachedSecurityContext.getSecurityContextVersion()}], ` +
      `principals=[${cachedSubject.getPrincipals().map(p => `${p.getName()}@${p.getPrincipalType()}`).join(", ")}], ` +
      `authenticated=[${cachedLoginContext.isAuthenticated()}]`,
    );
    return true;
  }

  getProviderName(): string {
    return INFRASTRUCTURE_PROVIDER_NAME;
  }

  getProviderVersion(): string {
    return INFRASTRUCTURE_PROVIDER_VERSION;
  }

  isSecurityInfrastructureInitialized(): boolean {
    return securityInfrastructureInitialized;
  }

  getLoginContext(): IJaasLoginContext | null {
    return cachedLoginContext;
  }

  getSecurityContext(): ISecurityContext | null {
    return cachedSecurityContext;
  }

  static isInfrastructureInitialized(): boolean {
    return securityInfrastructureInitialized;
  }

  static getSecurityContext(): ISecurityContext | null {
    return cachedSecurityContext;
  }

  static getSubject(): IJaasSubject | null {
    return cachedSubject;
  }

  static getLoginContext(): IJaasLoginContext | null {
    return cachedLoginContext;
  }

  static initializeInfrastructure(): ISecurityInfrastructureProvider {
    const provider = new JaasSecurityInfrastructureProviderFactoryBean();
    provider.initializeSecurityInfrastructure();
    return provider;
  }
}
