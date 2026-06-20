import type { ICacheClusterNode } from "../../contracts/index.js";
import { AbstractBaseCacheClusterTopology } from "../../abstracts/index.js";

export class SingleNodeClusterTopologyImpl extends AbstractBaseCacheClusterTopology {
  private static readonly TOPOLOGY_NAME = "SingleNodeClusterTopology";
  private static readonly TOPOLOGY_VERSION = "1.0.0-SINGLE-NODE-TOPOLOGY";
  private readonly primaryNode: ICacheClusterNode;

  constructor(primaryNode: ICacheClusterNode) {
    super(SingleNodeClusterTopologyImpl.TOPOLOGY_NAME, SingleNodeClusterTopologyImpl.TOPOLOGY_VERSION);
    this.primaryNode = primaryNode;
  }

  override getNodeCount(): number { return 1; }
  override getNodes(): readonly ICacheClusterNode[] { return [this.primaryNode]; }
  override getPrimaryNode(): ICacheClusterNode { return this.primaryNode; }
  override getReplicaNodes(): readonly ICacheClusterNode[] { return []; }
  override isTopologyHealthy(): boolean { return this.primaryNode.isOnline(); }
  override getTopologyDescriptor(): string {
    return `SingleNodeTopology[node=${this.primaryNode.getNodeName()}, healthy=${this.isTopologyHealthy()}]`;
  }
}
