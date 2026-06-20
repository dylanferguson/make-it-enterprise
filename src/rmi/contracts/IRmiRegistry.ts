export interface IRmiRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  bind(name: string, remoteObj: IRmiRemoteInterface): void;
  lookup(name: string): IRmiRemoteInterface;
  unbind(name: string): void;
  list(): readonly string[];
}

import type { IRmiRemoteInterface } from "./IRmiRemoteInterface.js";
