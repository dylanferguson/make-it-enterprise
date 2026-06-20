import { AbstractBaseEnterpriseFizzBuzzSlaMonitor } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzSlaMonitor.js";

export class StandardEnterpriseFizzBuzzSlaMonitorImpl extends AbstractBaseEnterpriseFizzBuzzSlaMonitor {
  private static readonly MONITOR_NAME = "StandardEnterpriseFizzBuzzSlaMonitor";
  private static readonly MONITOR_VERSION = "1.0.0-SLA-MONITOR";
  private static readonly DEFAULT_SLA_THRESHOLD_MS = 50;

  constructor(slaThresholdMs: number = StandardEnterpriseFizzBuzzSlaMonitorImpl.DEFAULT_SLA_THRESHOLD_MS) {
    super(slaThresholdMs);
  }

  override getMonitorName(): string {
    return StandardEnterpriseFizzBuzzSlaMonitorImpl.MONITOR_NAME;
  }

  override getMonitorVersion(): string {
    return StandardEnterpriseFizzBuzzSlaMonitorImpl.MONITOR_VERSION;
  }
}
