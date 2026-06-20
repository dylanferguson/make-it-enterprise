import type { IJmsMessage } from "./IJmsMessage.js";

export interface IFizzBuzzComputationMessage {
  getMessageId(): string;
  getComputationValue(): number;
  setComputationValue(value: number): void;
  getCorrelationGroup(): string;
  setCorrelationGroup(group: string): void;
  getComputationProfile(): string;
  setComputationProfile(profile: string): void;
  getComputationResult(): string | null;
  setComputationResult(result: string): void;
  isComputed(): boolean;
  getTimestamp(): number;
  setTimestamp(timestamp: number): void;
  getSourceApplication(): string;
  setSourceApplication(source: string): void;
  toJmsMessage(): IJmsMessage;
}
