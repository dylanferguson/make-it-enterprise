import { AbstractBaseComputationPipelineMonitoringMBean } from "../abstracts/AbstractBaseComputationPipelineMonitoringMBean.js";

export class ComputationPipelineMonitoringMBeanImpl
  extends AbstractBaseComputationPipelineMonitoringMBean
{
  private static readonly MBEAN_INSTANCE_NAME = "ComputationPipelineMonitoringMBean";
  private static readonly MBEAN_OBJECT_NAME_DESCRIPTOR =
    "FizzBuzz:type=ComputationPipelineMonitoring,name=ComputationPipelineMonitoringMBean";
  private static readonly DEFAULT_SLO_THRESHOLD_MS = 50;

  private resolutionFailures: Array<{ value: number; errorDescription: string; timestampMs: number }>;

  constructor() {
    super(
      ComputationPipelineMonitoringMBeanImpl.MBEAN_INSTANCE_NAME,
      ComputationPipelineMonitoringMBeanImpl.MBEAN_OBJECT_NAME_DESCRIPTOR,
      ComputationPipelineMonitoringMBeanImpl.DEFAULT_SLO_THRESHOLD_MS,
    );
    this.resolutionFailures = [];
  }

  override recordSingleValueResolution(value: number, durationMs: number): void {
    this.totalResolutionsAttempted++;
    this.totalResolutionsSucceeded++;
    this.totalResolutionDurationMs += durationMs;
    if (durationMs > this.sloThresholdMs) {
      this.recordSlaBreach(durationMs);
    }
  }

  override recordRangeResolution(
    start: number,
    end: number,
    durationMs: number,
    valueCount: number,
  ): void {
    this.totalResolutionsAttempted += valueCount;
    this.totalResolutionsSucceeded += valueCount;
    this.totalResolutionDurationMs += durationMs;
    if (durationMs > this.sloThresholdMs) {
      this.recordSlaBreach(durationMs);
    }
  }

  override recordCacheHit(): void {
    this.totalCacheHits++;
  }

  override recordCacheMiss(): void {
    this.totalCacheMisses++;
  }

  override recordSlaBreach(durationMs: number): void {
    this.slaBreachCount++;
  }

  override recordResolutionFailure(value: number, errorDescription: string): void {
    this.totalResolutionsAttempted++;
    this.totalResolutionsFailed++;
    this.resolutionFailures.push({
      value,
      errorDescription,
      timestampMs: Date.now(),
    });
  }

  override resetMonitoringMetrics(): void {
    this.totalResolutionsAttempted = 0;
    this.totalResolutionsSucceeded = 0;
    this.totalResolutionsFailed = 0;
    this.totalCacheHits = 0;
    this.totalCacheMisses = 0;
    this.totalResolutionDurationMs = 0;
    this.slaBreachCount = 0;
    this.resolutionFailures = [];
  }

  getResolutionFailures(): readonly typeof this.resolutionFailures[number][] {
    return this.resolutionFailures;
  }
}
