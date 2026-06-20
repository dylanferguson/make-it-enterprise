import type { IRmiRemoteInterface } from "../contracts/IRmiRemoteInterface.js";
import type { IRmiRegistry } from "../contracts/IRmiRegistry.js";

export class DefaultRmiRegistryImpl implements IRmiRegistry {
  private static readonly REGISTRY_NAME = "DefaultRmiRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-RMI-REGISTRY";
  private static readonly REGISTRY_PORT = 1099;

  private readonly remoteObjects: Map<string, IRmiRemoteInterface>;

  constructor() {
    this.remoteObjects = new Map<string, IRmiRemoteInterface>();
    console.debug(
      `[${DefaultRmiRegistryImpl.REGISTRY_NAME}] RMI registry initialized on port ${DefaultRmiRegistryImpl.REGISTRY_PORT}`,
    );
  }

  getRegistryName(): string {
    return DefaultRmiRegistryImpl.REGISTRY_NAME;
  }

  getRegistryVersion(): string {
    return DefaultRmiRegistryImpl.REGISTRY_VERSION;
  }

  bind(name: string, remoteObj: IRmiRemoteInterface): void {
    if (this.remoteObjects.has(name)) {
      throw new Error(
        `[${this.getRegistryName()}] RMI name already bound: ${name}`,
      );
    }
    this.remoteObjects.set(name, remoteObj);
    console.debug(
      `[${this.getRegistryName()}] RMI remote object bound: name=[${name}], ` +
      `interface=[${remoteObj.getRemoteInterfaceName()} v${remoteObj.getRemoteInterfaceVersion()}]`,
    );
  }

  lookup(name: string): IRmiRemoteInterface {
    const obj = this.remoteObjects.get(name);
    if (obj === undefined) {
      throw new Error(
        `[${this.getRegistryName()}] RMI remote object not found: ${name} ` +
        `(bound: [${this.list().join(", ")}])`,
      );
    }
    return obj;
  }

  unbind(name: string): void {
    this.remoteObjects.delete(name);
  }

  list(): readonly string[] {
    return Array.from(this.remoteObjects.keys());
  }
}
