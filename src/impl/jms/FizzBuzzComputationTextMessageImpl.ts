import { AbstractBaseFizzBuzzComputationMessage } from "../../abstracts/AbstractBaseFizzBuzzComputationMessage.js";
import type { IFizzBuzzComputationMessage } from "../../contracts/IFizzBuzzComputationMessage.js";
import type { IJmsMessage } from "../../contracts/IJmsMessage.js";
import { EnterpriseJmsTextMessageImpl } from "./EnterpriseJmsTextMessageImpl.js";

export class FizzBuzzComputationTextMessageImpl extends AbstractBaseFizzBuzzComputationMessage {
  private static messageCounter = 0;
  private readonly messageId: string;

  constructor() {
    super();
    this.messageId = `FBCTM-${FizzBuzzComputationTextMessageImpl.messageCounter++}`;
  }

  getMessageId(): string { return this.messageId; }

  toJmsMessage(): IJmsMessage {
    const payload = JSON.stringify({
      computationValue: this.getComputationValue(),
      correlationGroup: this.getCorrelationGroup(),
      computationProfile: this.getComputationProfile(),
      computationResult: this.getComputationResult(),
      computed: this.isComputed(),
      timestamp: this.getTimestamp(),
      sourceApplication: this.getSourceApplication(),
    });
    const textMessage = new EnterpriseJmsTextMessageImpl(payload);
    textMessage.setStringProperty("FizzBuzzComputationMessageType", "FizzBuzzComputationTextMessage");
    textMessage.setStringProperty("FizzBuzzComputationCorrelationGroup", this.getCorrelationGroup());
    textMessage.setIntProperty("FizzBuzzComputationValue", this.getComputationValue());
    return textMessage;
  }

  static fromJmsMessage(message: IJmsMessage): IFizzBuzzComputationMessage {
    const compMessage = new FizzBuzzComputationTextMessageImpl();
    if (message instanceof EnterpriseJmsTextMessageImpl) {
      try {
        const payload = JSON.parse(message.getText());
        compMessage.setComputationValue(payload.computationValue ?? 0);
        compMessage.setCorrelationGroup(payload.correlationGroup ?? "STANDARD");
        compMessage.setComputationProfile(payload.computationProfile ?? "ENTERPRISE_FULL");
        if (payload.computationResult) {
          compMessage.setComputationResult(payload.computationResult);
        }
        compMessage.setSourceApplication(payload.sourceApplication ?? "FizzBuzzEnterpriseEdition");
      } catch {
        compMessage.setComputationValue(message.getIntProperty("FizzBuzzComputationValue") ?? 0);
      }
    } else {
      compMessage.setComputationValue(message.getIntProperty("FizzBuzzComputationValue") ?? 0);
    }
    const correlationGroup = message.getStringProperty("FizzBuzzComputationCorrelationGroup");
    if (correlationGroup !== null) {
      compMessage.setCorrelationGroup(correlationGroup);
    }
    return compMessage;
  }
}
