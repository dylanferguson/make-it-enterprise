import { AbstractBaseFizzBuzzComputationMessage } from "../../abstracts/AbstractBaseFizzBuzzComputationMessage.js";
import type { IFizzBuzzComputationMessage } from "../../contracts/IFizzBuzzComputationMessage.js";
import type { IJmsMessage } from "../../contracts/IJmsMessage.js";
import { EnterpriseJmsObjectMessageImpl } from "./EnterpriseJmsObjectMessageImpl.js";

export class FizzBuzzComputationObjectMessageImpl extends AbstractBaseFizzBuzzComputationMessage {
  private static messageCounter = 0;
  private readonly messageId: string;

  constructor() {
    super();
    this.messageId = `FBCM-${FizzBuzzComputationObjectMessageImpl.messageCounter++}`;
  }

  getMessageId(): string { return this.messageId; }

  toJmsMessage(): IJmsMessage {
    const objectMessage = new EnterpriseJmsObjectMessageImpl({
      computationValue: this.getComputationValue(),
      correlationGroup: this.getCorrelationGroup(),
      computationProfile: this.getComputationProfile(),
      computationResult: this.getComputationResult(),
      computed: this.isComputed(),
      timestamp: this.getTimestamp(),
      sourceApplication: this.getSourceApplication(),
    });
    objectMessage.setStringProperty("FizzBuzzComputationMessageType", "FizzBuzzComputationObjectMessage");
    objectMessage.setStringProperty("FizzBuzzComputationCorrelationGroup", this.getCorrelationGroup());
    objectMessage.setIntProperty("FizzBuzzComputationValue", this.getComputationValue());
    return objectMessage;
  }

  static fromJmsMessage(message: IJmsMessage): IFizzBuzzComputationMessage {
    const compMessage = new FizzBuzzComputationObjectMessageImpl();
    compMessage.setComputationValue(message.getIntProperty("FizzBuzzComputationValue") ?? 0);
    const correlationGroup = message.getStringProperty("FizzBuzzComputationCorrelationGroup");
    if (correlationGroup !== null) {
      compMessage.setCorrelationGroup(correlationGroup);
    }
    return compMessage;
  }
}
