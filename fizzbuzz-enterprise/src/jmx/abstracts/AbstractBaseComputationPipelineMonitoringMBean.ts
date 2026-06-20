import type { IComputationPipelineMonitoringMBean } from "../contracts/IComputationPipelineMonitoringMBean.js";

export abstract class AbstractBaseComputationPipelineMonitoringMBean
  implements IComputationPipelineMonitoringMBean
{
  private static readonly MBEAN_BASE_NAME = "AbstractBaseComputationPipelineMonitoringMBean";
  private static readonly MBEAN_BASE_VERSION = "1.0.0-PIPELINE-MONITORING";

  protected readonly mbeanName: string;
  protected readonly mbeanObjectNameDescriptor: string;
  protected readonly sloThresholdMs: number;

  protected totalResolutionsAttempted: number = 0;
  protected totalResolutionsSucceeded: number = 0;
  protected totalResolutionsFailed: number = 0;
  protected totalCacheHits: number = 0;
  protected totalCacheMisses: number = 0;
  protected totalResolutionDurationMs: number = 0;
  protected slaBreachCount: number = 0;

  constructor(mbeanName: string, mbeanObjectNameDescriptor: string, sloThresholdMs: number) {
    this.mbeanName = mbeanName;
    this.mbeanObjectNameDescriptor = mbeanObjectNameDescriptor;
    this.sloThresholdMs = sloThresholdMs;
  }

  getMBeanName(): string {
    return this.mbeanName;
  }

  getMBeanObjectNameDescriptor(): string {
    return this.mbeanObjectNameDescriptor;
  }

  getSloThresholdMs(): number {
    return this.sloThresholdMs;
  }

  getTotalResolutionsAttempted(): number {
    return this.totalResolutionsAttempted;
  }

  getTotalResolutionsSucceeded(): number {
    return this.totalResolutionsSucceeded;
  }

  getTotalResolutionsFailed(): number {
    return this.totalResolutionsFailed;
  }

  getTotalCacheHits(): number {
    return this.totalCacheHits;
  }

  getTotalCacheMisses(): number {
    return this.totalCacheMisses;
  }

  getAverageResolutionDurationMs(): number {
    if (this.totalResolutionsAttempted === 0) return 0;
    return this.totalResolutionDurationMs / this.totalResolutionsAttempted;
  }

  getSlaBreachCount(): number {
    return this.slaBreachCount;
  }

  getSlaCompliancePercentage(): number {
    if (this.totalResolutionsAttempted === 0) return 100;
    const compliant = this.totalResolutionsAttempted - this.slaBreachCount;
    return (compliant / this.totalResolutionsAttempted) * 100;
  }

  abstract recordSingleValueResolution(value: number, durationMs: number): void;
  abstract recordRangeResolution(start: number, end: number, durationMs: number, valueCount: number): void;
  abstract recordCacheHit(): void;
  abstract recordCacheMiss(): void;
  abstract recordSlaBreach(durationMs: number): void;
  abstract recordResolutionFailure(value: number, errorDescription: string): void;
  abstract resetMonitoringMetrics(): void;
}
