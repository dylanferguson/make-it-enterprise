import { AbstractBaseComputationRequestAdapter } from "../../abstracts/AbstractBaseComputationRequestAdapter.js";
import type { IComputationRequestPrototype } from "../../contracts/IComputationRequestPrototype.js";
import type { IComputationRequestAdapter } from "../../contracts/IComputationRequestAdapter.js";

const ADAPTER_NAME = "StandardComputationRequestAdapter";
const ADAPTER_VERSION = "1.0.0-ADAPTER";
const ADAPTER_TYPE = "PROTOTYPE_TO_RESOLUTION_BRIDGE";
const ADAPTER_CAPABILITIES: readonly string[] = [
  "SINGLE_VALUE_PROTOTYPE_ADAPTATION",
  "RANGE_REQUEST_PROTOTYPE_ADAPTATION",
  "COMPUTATION_CONTEXT_METADATA_PROPAGATION",
  "PROTOTYPE_RESOLUTION_LIFECYCLE_MANAGEMENT",
];

export class StandardComputationRequestAdapterImpl extends AbstractBaseComputationRequestAdapter {
  protected readonly adapterName: string = ADAPTER_NAME;
  protected readonly adapterVersion: string = ADAPTER_VERSION;
  protected readonly adapterType: string = ADAPTER_TYPE;
  protected readonly adapterCapabilities: readonly string[] = ADAPTER_CAPABILITIES;

  override adaptPrototypeToResolution(
    prototype: IComputationRequestPrototype<string>,
    resolutionDelegate: (value: number) => string,
  ): string {
    this.validatePrototype(prototype);
    const value = prototype.getParameterValue();
    const result = resolutionDelegate(value);
    prototype.markResolved(result);
    return result;
  }

  override adaptRangeRequest(
    start: number,
    end: number,
    resolutionDelegate: (value: number) => string,
  ): readonly string[] {
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(resolutionDelegate(i));
    }
    return results;
  }
}
