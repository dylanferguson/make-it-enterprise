import { AbstractBaseJmsMessage } from "../../abstracts/AbstractBaseJmsMessage.js";
import type { JmsMessageType } from "../../contracts/IJmsMessage.js";

export class EnterpriseJmsTextMessageImpl extends AbstractBaseJmsMessage {
  private textBody: string;

  constructor(body: string) {
    super("TEXT");
    this.textBody = body;
  }

  override getType(): JmsMessageType {
    return "TEXT";
  }

  getText(): string {
    return this.textBody;
  }

  setText(text: string): void {
    this.textBody = text;
  }
}
