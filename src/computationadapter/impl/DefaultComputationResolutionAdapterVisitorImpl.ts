import type { IEnterpriseComputationResolutionAdapter } from "../contracts/IEnterpriseComputationResolutionAdapter.js";
import { AbstractBaseEnterpriseComputationResolutionAdapterVisitor } from "../abstracts/AbstractBaseEnterpriseComputationResolutionAdapterVisitor.js";

export class DefaultComputationResolutionAdapterVisitorImpl extends AbstractBaseEnterpriseComputationResolutionAdapterVisitor {
  private static readonly VISITOR_NAME = "DefaultComputationResolutionAdapterVisitorImpl";
  private static readonly VISITOR_VERSION = "1.0.0-VISITOR";
  private static readonly VISITOR_DESCRIPTION = "Iterates computation adapters and delegates to canHandle/accept";

  constructor() {
    super(
      DefaultComputationResolutionAdapterVisitorImpl.VISITOR_NAME,
      DefaultComputationResolutionAdapterVisitorImpl.VISITOR_VERSION,
      DefaultComputationResolutionAdapterVisitorImpl.VISITOR_DESCRIPTION,
    );
  }

  visitAdapter(adapter: IEnterpriseComputationResolutionAdapter, value: number): string | null {
    this.visitCount++;
    if (adapter.canHandle(value)) {
      return adapter.compute(value);
    }
    return null;
  }
}
