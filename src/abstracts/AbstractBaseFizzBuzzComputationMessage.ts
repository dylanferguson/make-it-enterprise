import type { IFizzBuzzComputationMessage } from "../contracts/IFizzBuzzComputationMessage.js";
import type { IJmsMessage } from "../contracts/IJmsMessage.js";

export abstract class AbstractBaseFizzBuzzComputationMessage implements IFizzBuzzComputationMessage {
  private computationValue: number;
  private correlationGroup: string;
  private computationProfile: string;
  private computationResult: string | null;
  private computed: boolean;
  private timestamp: number;
  private sourceApplication: string;

  constructor() {
    this.computationValue = 0;
    this.correlationGroup = "STANDARD";
    this.computationProfile = "ENTERPRISE_FULL";
    this.computationResult = null;
    this.computed = false;
    this.timestamp = Date.now();
    this.sourceApplication = "FizzBuzzEnterpriseEdition";
  }

  abstract getMessageId(): string;
  abstract toJmsMessage(): IJmsMessage;

  getComputationValue(): number { return this.computationValue; }
  setComputationValue(value: number): void { this.computationValue = value; }
  getCorrelationGroup(): string { return this.correlationGroup; }
  setCorrelationGroup(group: string): void { this.correlationGroup = group; }
  getComputationProfile(): string { return this.computationProfile; }
  setComputationProfile(profile: string): void { this.computationProfile = profile; }
  getComputationResult(): string | null { return this.computationResult; }
  setComputationResult(result: string): void { this.computationResult = result; this.computed = true; }
  isComputed(): boolean { return this.computed; }
  getTimestamp(): number { return this.timestamp; }
  setTimestamp(timestamp: number): void { this.timestamp = timestamp; }
  getSourceApplication(): string { return this.sourceApplication; }
  setSourceApplication(source: string): void { this.sourceApplication = source; }
}
