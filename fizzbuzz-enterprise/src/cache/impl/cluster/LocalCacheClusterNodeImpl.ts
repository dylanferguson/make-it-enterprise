import { AbstractBaseCacheClusterNode } from "../../abstracts/index.js";

export class LocalCacheClusterNodeImpl extends AbstractBaseCacheClusterNode {
  private static readonly DEFAULT_NODE_NAME = "LocalCacheClusterNode";
  private static readonly DEFAULT_NODE_ID = "node-001-localhost";
  private static readonly DEFAULT_NODE_VERSION = "1.0.0-LOCAL-CLUSTER-NODE";

  private readonly registeredLevelDescriptors: string[] = [];

  constructor() {
    super(
      LocalCacheClusterNodeImpl.DEFAULT_NODE_NAME,
      LocalCacheClusterNodeImpl.DEFAULT_NODE_ID,
      LocalCacheClusterNodeImpl.DEFAULT_NODE_VERSION,
    );
  }

  override isOnline(): boolean { return true; }

  override getRegisteredCacheLevelDescriptors(): readonly string[] {
    return this.registeredLevelDescriptors;
  }

  registerCacheLevelDescriptor(descriptor: string): void {
    if (!this.registeredLevelDescriptors.includes(descriptor)) {
      this.registeredLevelDescriptors.push(descriptor);
    }
  }

  override synchronize(): boolean { return true; }

  override getNodeDescriptor(): string {
    return `LocalCacheClusterNode[nodeName=${this.getNodeName()}, ` +
      `nodeId=${this.getNodeId()}, online=${this.isOnline()}, ` +
      `levels=[${this.registeredLevelDescriptors.join(", ")}]]`;
  }
}
