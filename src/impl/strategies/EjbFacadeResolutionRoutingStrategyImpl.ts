import type { IEjbFacadeResolutionRoutingStrategy } from "../../contracts/IEjbFacadeResolutionRoutingStrategy.js";
import type { IEjbHome } from "../../ejb/contracts/IEjbHome.js";
import type { IEjbObject } from "../../ejb/contracts/IEjbObject.js";

export class EjbFacadeResolutionRoutingStrategyImpl implements IEjbFacadeResolutionRoutingStrategy {
  private static readonly STRATEGY_NAME = "EjbFacadeResolutionRoutingStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-EJB-ROUTING";

  private readonly ejbHome: IEjbHome;

  constructor(ejbHome: IEjbHome) {
    this.ejbHome = ejbHome;
  }

  getRoutingStrategyName(): string {
    return EjbFacadeResolutionRoutingStrategyImpl.STRATEGY_NAME;
  }

  getRoutingStrategyVersion(): string {
    return EjbFacadeResolutionRoutingStrategyImpl.STRATEGY_VERSION;
  }

  routeThroughEjb(value: number, _inner: (v: number) => string): string {
    const ejbObject: IEjbObject = this.ejbHome.create();
    try {
      console.debug(
        `[${this.getRoutingStrategyName()}] Routing value through EJB: ` +
        `value=[${value}], home=[${this.ejbHome.getHomeName()} v${this.ejbHome.getHomeVersion()}], ` +
        `beanHandle=[${ejbObject.getEjbHandle()}], jndiBinding=[${this.ejbHome.getJndiBindingName()}]`,
      );
      const result = ejbObject.invokeComputation(value);
      return result;
    } finally {
      this.ejbHome.remove(ejbObject.getEjbHandle());
    }
  }
}
