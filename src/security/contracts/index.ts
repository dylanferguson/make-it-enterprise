export interface IJaasPrincipal {
  getName(): string;
  getPrincipalType(): string;
  implies(another: IJaasPrincipal): boolean;
}

export interface IJaasSubject {
  getPrincipals(): readonly IJaasPrincipal[];
  addPrincipal(principal: IJaasPrincipal): void;
  removePrincipal(principal: IJaasPrincipal): boolean;
  hasPrincipal(type: string, name: string): boolean;
  isSubjectReadOnly(): boolean;
  setReadOnly(): void;
  getSubjectDescriptor(): string;
}

export interface IJaasLoginModule {
  initialize(subject: IJaasSubject, options: Record<string, string>): void;
  login(): boolean;
  commit(): boolean;
  abort(): boolean;
  logout(): boolean;
  getLoginModuleName(): string;
  getLoginModuleVersion(): string;
}

export interface IJaasLoginContext {
  login(): void;
  logout(): void;
  getSubject(): IJaasSubject;
  isAuthenticated(): boolean;
  getLoginContextName(): string;
  getLoginContextVersion(): string;
}

export interface IJaasCallbackHandler {
  handle(callbacks: unknown[]): void;
  getCallbackHandlerName(): string;
  getCallbackHandlerVersion(): string;
}

export interface ISecurityContext {
  getSubject(): IJaasSubject;
  getCallerPrincipal(): IJaasPrincipal;
  isCallerInRole(role: string): boolean;
  getSecurityContextName(): string;
  getSecurityContextVersion(): string;
}

export interface ISecurityAwareResolutionFacadeDecorator {
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getWrappedFacadeName(): string;
  isSecurityEnabled(): boolean;
  getRequiredRole(): string;
  getSecurityContext(): ISecurityContext;
}

export interface ISecurityInfrastructureProvider {
  getProviderName(): string;
  getProviderVersion(): string;
  isSecurityInfrastructureInitialized(): boolean;
  getLoginContext(): IJaasLoginContext | null;
  getSecurityContext(): ISecurityContext | null;
}
