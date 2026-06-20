import { AbstractBaseEjbSessionBean } from "../abstracts/AbstractBaseEjbSessionBean.js";
import type { IRmiRemoteStub } from "../../rmi/contracts/IRmiRemoteStub.js";

export class FizzBuzzComputationEjbSessionBeanImpl extends AbstractBaseEjbSessionBean {
  private static readonly EJB_NAME = "FizzBuzzComputationEjbSessionBean";
  private static readonly EJB_VERSION = "1.0.0-EJB-SESSION-BEAN";
  private static NEXT_HANDLE_SEQUENCE = 1000;

  private readonly rmiStub: IRmiRemoteStub;
  private readonly divisor: number;

  constructor(rmiStub: IRmiRemoteStub, divisor: number) {
    const handle = `EJB:handle:FizzBuzzComputationSessionBean[${FizzBuzzComputationEjbSessionBeanImpl.NEXT_HANDLE_SEQUENCE++}]`;
    super(
      FizzBuzzComputationEjbSessionBeanImpl.EJB_NAME,
      FizzBuzzComputationEjbSessionBeanImpl.EJB_VERSION,
      handle,
    );
    this.rmiStub = rmiStub;
    this.divisor = divisor;
  }

  override invokeComputation(value: number): string {
    this.assertNotRemoved();
    console.debug(
      `[${this.getEjbObjectName()}] EJB session bean invocation: ` +
      `handle=[${this.getEjbHandle()}], value=[${value}], divisor=[${this.divisor}], ` +
      `stub=[${this.rmiStub.getStubName()} v${this.rmiStub.getStubVersion()}]`,
    );
    const result = this.rmiStub.invokeRemote(value);
    return result;
  }

  getDivisor(): number {
    return this.divisor;
  }

  getRmiStub(): IRmiRemoteStub {
    return this.rmiStub;
  }
}
