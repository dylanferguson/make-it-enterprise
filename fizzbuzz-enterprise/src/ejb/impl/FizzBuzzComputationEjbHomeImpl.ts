import { AbstractBaseEjbHome } from "../abstracts/AbstractBaseEjbHome.js";
import type { IEjbObject } from "../contracts/IEjbObject.js";
import { FizzBuzzComputationEjbSessionBeanImpl } from "./FizzBuzzComputationEjbSessionBeanImpl.js";
import type { IRmiRemoteStub } from "../../rmi/contracts/IRmiRemoteStub.js";

export class FizzBuzzComputationEjbHomeImpl extends AbstractBaseEjbHome {
  private static readonly HOME_NAME = "FizzBuzzComputationEjbHome";
  private static readonly HOME_VERSION = "1.0.0-EJB-HOME";
  private static readonly JNDI_BINDING = "ejb/fizzbuzz/ComputationEJB";

  private readonly rmiStub: IRmiRemoteStub;
  private readonly divisor: number;
  private readonly activeBeans: Map<string, IEjbObject>;

  constructor(rmiStub: IRmiRemoteStub, divisor: number) {
    super(
      FizzBuzzComputationEjbHomeImpl.HOME_NAME,
      FizzBuzzComputationEjbHomeImpl.HOME_VERSION,
      FizzBuzzComputationEjbHomeImpl.JNDI_BINDING,
    );
    this.rmiStub = rmiStub;
    this.divisor = divisor;
    this.activeBeans = new Map<string, IEjbObject>();
  }

  override create(): IEjbObject {
    const bean = new FizzBuzzComputationEjbSessionBeanImpl(this.rmiStub, this.divisor);
    this.activeBeans.set(bean.getEjbHandle(), bean);
    console.debug(
      `[${this.getHomeName()}] EJB created via home: ` +
      `handle=[${bean.getEjbHandle()}], homeBinding=[${this.getJndiBindingName()}], ` +
      `activeBeanCount=[${this.activeBeans.size}]`,
    );
    return bean;
  }

  override remove(handle: string): void {
    const bean = this.activeBeans.get(handle);
    if (bean !== undefined) {
      bean.ejbRemove();
      this.activeBeans.delete(handle);
    }
  }

  getActiveBeanCount(): number {
    return this.activeBeans.size;
  }

  getActiveBeanHandles(): readonly string[] {
    return Array.from(this.activeBeans.keys());
  }
}
