import type {
  IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator,
} from "../../contracts/IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEjbFacadeResolutionRoutingStrategy } from "../../contracts/IEjbFacadeResolutionRoutingStrategy.js";

export class EnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecoratorImpl
  implements IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "EnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-JNDI-EJB-DECORATOR";
  private static readonly JNDI_LOOKUP_PATH = "java:comp/env/ejb/fizzbuzz/ComputationEJB";

  private readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly routingStrategy: IEjbFacadeResolutionRoutingStrategy;
  private readonly ejbRoutingEnabled: boolean;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    routingStrategy: IEjbFacadeResolutionRoutingStrategy,
    ejbRoutingEnabled: boolean,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.routingStrategy = routingStrategy;
    this.ejbRoutingEnabled = ejbRoutingEnabled;
  }

  getDecoratorName(): string {
    return EnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  getDecoratorVersion(): string {
    return EnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getFacadeName(): string {
    return this.getDecoratorName();
  }

  getFacadeVersion(): string {
    return this.getDecoratorVersion();
  }

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getJndiLookupPath(): string {
    return EnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecoratorImpl.JNDI_LOOKUP_PATH;
  }

  isEjbRoutingEnabled(): boolean {
    return this.ejbRoutingEnabled;
  }

  resolveValue(value: number): string {
    if (this.ejbRoutingEnabled) {
      console.debug(
        `[${this.getDecoratorName()}] Routing through EJB layer: ` +
        `value=[${value}], jndiLookup=[${this.getJndiLookupPath()}], ` +
        `strategy=[${this.routingStrategy.getRoutingStrategyName()}]`,
      );
      return this.routingStrategy.routeThroughEjb(value, (v: number) =>
        this.wrappedFacade.resolveValue(v)
      );
    }
    return this.wrappedFacade.resolveValue(value);
  }

  resolveRange(start: number, end: number): readonly string[] {
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveValue(i));
    }
    return results;
  }
}
