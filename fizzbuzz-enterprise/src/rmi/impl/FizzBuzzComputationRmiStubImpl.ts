import type { IRmiRemoteStub } from "../contracts/IRmiRemoteStub.js";
import type { IRmiRemoteInterface } from "../contracts/IRmiRemoteInterface.js";

export class FizzBuzzComputationRmiStubImpl implements IRmiRemoteStub {
  private static readonly STUB_NAME = "FizzBuzzComputationRmiStub";
  private static readonly STUB_VERSION = "1.0.0-RMI-STUB";
  private static readonly STUB_ID = "RMI:Stub:FizzBuzzComputationRmiStub[_JNDI:ejb/fizzbuzz/ComputationEJB]";

  private readonly remoteInterface: IRmiRemoteInterface;
  private invocationCount: number;

  constructor(remoteInterface: IRmiRemoteInterface) {
    this.remoteInterface = remoteInterface;
    this.invocationCount = 0;
  }

  getStubName(): string {
    return FizzBuzzComputationRmiStubImpl.STUB_NAME;
  }

  getStubVersion(): string {
    return FizzBuzzComputationRmiStubImpl.STUB_VERSION;
  }

  getRemoteInterface(): IRmiRemoteInterface {
    return this.remoteInterface;
  }

  invokeRemote(value: number): string {
    this.invocationCount++;
    console.debug(
      `[${this.getStubName()}] RMI stub marshalling remote invocation: ` +
      `invocation=[#${this.invocationCount}], stubId=[${FizzBuzzComputationRmiStubImpl.STUB_ID}], ` +
      `value=[${value}], marshalFormat=[JavaObjectOutputStream]`,
    );
    const result = this.remoteInterface.invokeRemoteComputation(value);
    console.debug(
      `[${this.getStubName()}] RMI stub unmarshalling remote result: result=[${result}]`,
    );
    return result;
  }

  getInvocationCount(): number {
    return this.invocationCount;
  }
}
