import type { IRmiRemoteInterface } from "./IRmiRemoteInterface.js";

export interface IRmiRemoteStub {
  getStubName(): string;
  getStubVersion(): string;
  getRemoteInterface(): IRmiRemoteInterface;
  invokeRemote(value: number): string;
}
