import { AbstractBaseRmiRemoteObject } from "../abstracts/AbstractBaseRmiRemoteObject.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export class FizzBuzzComputationRmiRemoteImpl extends AbstractBaseRmiRemoteObject {
  private static readonly REMOTE_OBJECT_NAME = "FizzBuzzComputationRmiRemote";
  private static readonly REMOTE_OBJECT_VERSION = "1.0.0-RMI-REMOTE";

  private readonly resolutionFacade: IFizzBuzzSingleValueResolutionFacade;

  constructor(resolutionFacade: IFizzBuzzSingleValueResolutionFacade) {
    super(
      FizzBuzzComputationRmiRemoteImpl.REMOTE_OBJECT_NAME,
      FizzBuzzComputationRmiRemoteImpl.REMOTE_OBJECT_VERSION,
    );
    this.resolutionFacade = resolutionFacade;
  }

  override invokeRemoteComputation(value: number): string {
    console.debug(
      `[${this.getRemoteInterfaceName()}] RMI remote invocation received: value=[${value}], ` +
      `facade=[${this.resolutionFacade.getFacadeName()}]`,
    );
    const result = this.resolutionFacade.resolveValue(value);
    console.debug(
      `[${this.getRemoteInterfaceName()}] RMI remote invocation complete: value=[${value}], result=[${result}]`,
    );
    return result;
  }

  getResolutionFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.resolutionFacade;
  }
}
