import { DivisorSpecificComputationAdapterImpl } from "../impl/DivisorSpecificComputationAdapterImpl.js";
import type { IEnterpriseComputationResolutionAdapter } from "../contracts/IEnterpriseComputationResolutionAdapter.js";

export class DivisorSpecificComputationAdapterFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "DivisorSpecificComputationAdapterFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ADAPTER-FACTORY";
  private static readonly instances: Map<string, IEnterpriseComputationResolutionAdapter> = new Map();

  static createAdapter(divisor: number, outputLabel: string): IEnterpriseComputationResolutionAdapter {
    const key = `${divisor}:${outputLabel}`;
    if (!this.instances.has(key)) {
      const adapter = new DivisorSpecificComputationAdapterImpl(divisor, outputLabel);
      this.instances.set(key, adapter);
    }
    return this.instances.get(key)!;
  }

  static getAdapter(divisor: number, outputLabel: string): IEnterpriseComputationResolutionAdapter | null {
    const key = `${divisor}:${outputLabel}`;
    return this.instances.get(key) ?? null;
  }

  static getFactoryBeanName(): string {
    return this.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return this.FACTORY_BEAN_VERSION;
  }

  static clearInstances(): void {
    this.instances.clear();
  }

  static getInstanceCount(): number {
    return this.instances.size;
  }
}
