import type { IRmiRemoteInterface } from "../contracts/IRmiRemoteInterface.js";

export abstract class AbstractBaseRmiRemoteObject implements IRmiRemoteInterface {
  private readonly remoteObjectName: string;
  private readonly remoteObjectVersion: string;

  constructor(remoteObjectName: string, remoteObjectVersion: string) {
    this.remoteObjectName = remoteObjectName;
    this.remoteObjectVersion = remoteObjectVersion;
  }

  getRemoteInterfaceName(): string {
    return this.remoteObjectName;
  }

  getRemoteInterfaceVersion(): string {
    return this.remoteObjectVersion;
  }

  abstract invokeRemoteComputation(value: number): string;
}
