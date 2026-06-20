import type { ISecurityAwareResolutionFacadeDecorator } from "../contracts/index.js";
import type { ISecurityContext } from "../contracts/index.js";

export abstract class AbstractBaseSecurityAwareResolutionFacadeDecorator
  implements ISecurityAwareResolutionFacadeDecorator
{
  protected readonly decoratorName: string;
  protected readonly decoratorVersion: string;
  protected readonly wrappedFacadeName: string;
  protected readonly securityContext: ISecurityContext;
  protected readonly requiredRole: string;
  protected securityEnabled: boolean;

  constructor(
    decoratorName: string,
    decoratorVersion: string,
    wrappedFacadeName: string,
    securityContext: ISecurityContext,
    requiredRole: string = "FizzBuzzUser",
    securityEnabled: boolean = true,
  ) {
    this.decoratorName = decoratorName;
    this.decoratorVersion = decoratorVersion;
    this.wrappedFacadeName = wrappedFacadeName;
    this.securityContext = securityContext;
    this.requiredRole = requiredRole;
    this.securityEnabled = securityEnabled;
  }

  getDecoratorName(): string {
    return this.decoratorName;
  }

  getDecoratorVersion(): string {
    return this.decoratorVersion;
  }

  getWrappedFacadeName(): string {
    return this.wrappedFacadeName;
  }

  isSecurityEnabled(): boolean {
    return this.securityEnabled;
  }

  getRequiredRole(): string {
    return this.requiredRole;
  }

  getSecurityContext(): ISecurityContext {
    return this.securityContext;
  }
}
