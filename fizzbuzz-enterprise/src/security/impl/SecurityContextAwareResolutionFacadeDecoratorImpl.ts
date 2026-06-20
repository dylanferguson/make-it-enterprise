import { AbstractBaseSecurityAwareResolutionFacadeDecorator } from "../abstracts/AbstractBaseSecurityAwareResolutionFacadeDecorator.js";
import type { ISecurityContext } from "../contracts/index.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

const DECORATOR_NAME = "SecurityContextAwareResolutionFacadeDecorator";
const DECORATOR_VERSION = "1.0.0-SECURITY-AWARE-DECORATOR";
const REQUIRED_ROLE = "FizzBuzzUser";

export class SecurityContextAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseSecurityAwareResolutionFacadeDecorator
  implements IFizzBuzzSingleValueResolutionFacade
{
  private readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  private totalResolutionsAuthorized: number = 0;
  private totalResolutionsDenied: number = 0;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    securityContext: ISecurityContext,
    securityEnabled: boolean = true,
  ) {
    super(
      DECORATOR_NAME,
      DECORATOR_VERSION,
      wrappedFacade.getFacadeName(),
      securityContext,
      REQUIRED_ROLE,
      securityEnabled,
    );
    this.wrappedFacade = wrappedFacade;
  }

  resolveValue(value: number): string {
    this.authorizeComputation(value);
    return this.wrappedFacade.resolveValue(value);
  }

  resolveRange(start: number, end: number): readonly string[] {
    for (let i = start; i <= end; i++) {
      this.authorizeComputation(i);
    }
    return this.wrappedFacade.resolveRange(start, end);
  }

  getFacadeName(): string {
    return this.wrappedFacade.getFacadeName();
  }

  getFacadeVersion(): string {
    return this.wrappedFacade.getFacadeVersion();
  }

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getTotalResolutionsAuthorized(): number {
    return this.totalResolutionsAuthorized;
  }

  getTotalResolutionsDenied(): number {
    return this.totalResolutionsDenied;
  }

  private authorizeComputation(value: number): void {
    if (!this.securityEnabled) {
      return;
    }
    const callerPrincipal = this.securityContext.getCallerPrincipal();
    const isAuthorized = this.securityContext.isCallerInRole(this.requiredRole);
    if (!isAuthorized) {
      this.totalResolutionsDenied++;
      throw new Error(
        `[${DECORATOR_NAME}] Authorization denied: caller=[${callerPrincipal.getName()}], ` +
        `requiredRole=[${this.requiredRole}], value=[${value}]`,
      );
    }
    this.totalResolutionsAuthorized++;
    console.debug(
      `[${DECORATOR_NAME}] Authorization granted: caller=[${callerPrincipal.getName()}], ` +
      `role=[${this.requiredRole}], value=[${value}], ` +
      `authorizedCount=[${this.totalResolutionsAuthorized}]`,
    );
  }
}
