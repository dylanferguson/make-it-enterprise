import type { IEnterpriseComputationResolutionAdapter } from "../contracts/IEnterpriseComputationResolutionAdapter.js";
import type { IEnterpriseComputationResolutionAdapterChainHandler } from "../contracts/IEnterpriseComputationResolutionAdapterChainHandler.js";
import { AbstractBaseEnterpriseComputationResolutionAdapterChainHandler } from "../abstracts/AbstractBaseEnterpriseComputationResolutionAdapterChainHandler.js";

export class DefaultComputationResolutionAdapterChainHandlerImpl extends AbstractBaseEnterpriseComputationResolutionAdapterChainHandler {
  private static readonly HANDLER_NAME = "DefaultComputationResolutionAdapterChainHandlerImpl";
  private static readonly HANDLER_VERSION = "1.0.0-CHAIN-HANDLER";
  private static readonly HANDLER_ORDER = 0;

  constructor() {
    super(
      DefaultComputationResolutionAdapterChainHandlerImpl.HANDLER_NAME,
      DefaultComputationResolutionAdapterChainHandlerImpl.HANDLER_VERSION,
      DefaultComputationResolutionAdapterChainHandlerImpl.HANDLER_ORDER,
    );
  }

  handleResolution(
    value: number,
    adapters: readonly IEnterpriseComputationResolutionAdapter[],
  ): string | null {
    for (const adapter of adapters) {
      if (adapter.canHandle(value)) {
        return adapter.compute(value);
      }
    }
    const next = this.getNextHandler();
    if (next !== null) {
      return next.handleResolution(value, adapters);
    }
    return null;
  }
}

export class FallbackComputationResolutionAdapterChainHandlerImpl extends AbstractBaseEnterpriseComputationResolutionAdapterChainHandler {
  private static readonly FALLBACK_HANDLER_NAME = "FallbackComputationResolutionAdapterChainHandlerImpl";
  private static readonly FALLBACK_HANDLER_VERSION = "1.0.0-CHAIN-FALLBACK";
  private static readonly FALLBACK_HANDLER_ORDER = 999;

  constructor() {
    super(
      FallbackComputationResolutionAdapterChainHandlerImpl.FALLBACK_HANDLER_NAME,
      FallbackComputationResolutionAdapterChainHandlerImpl.FALLBACK_HANDLER_VERSION,
      FallbackComputationResolutionAdapterChainHandlerImpl.FALLBACK_HANDLER_ORDER,
    );
  }

  handleResolution(
    value: number,
    _adapters: readonly IEnterpriseComputationResolutionAdapter[],
  ): string | null {
    return String(value);
  }
}
