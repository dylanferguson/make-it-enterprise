import { AbstractBaseEnterpriseComputationResolutionAdapter } from "../abstracts/AbstractBaseEnterpriseComputationResolutionAdapter.js";

export class DivisorSpecificComputationAdapterImpl extends AbstractBaseEnterpriseComputationResolutionAdapter {
  constructor(divisor: number, outputLabel: string) {
    const adapterName = `DivisorSpecificComputationAdapterImpl[divisor=${divisor}, label=${outputLabel}]`;
    const adapterVersion = `1.0.0-ADAPTER-D${divisor}`;
    super(adapterName, adapterVersion, divisor, outputLabel);
  }

  canHandle(value: number): boolean {
    return value % this.divisor === 0;
  }
}
