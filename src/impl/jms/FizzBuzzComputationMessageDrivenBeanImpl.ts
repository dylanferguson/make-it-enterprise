import { AbstractBaseMessageDrivenBean } from "../../abstracts/AbstractBaseMessageDrivenBean.js";
import type { IJmsMessage } from "../../contracts/IJmsMessage.js";
import type { IJmsMessageListener } from "../../contracts/IJmsMessageListener.js";
import type { IFizzBuzzComputationMessage } from "../../contracts/IFizzBuzzComputationMessage.js";
import { FizzBuzzComputationObjectMessageImpl } from "./FizzBuzzComputationObjectMessageImpl.js";
import { EnterpriseJmsTextMessageImpl } from "./EnterpriseJmsTextMessageImpl.js";

export class FizzBuzzComputationMessageDrivenBeanImpl extends AbstractBaseMessageDrivenBean {
  private static readonly BEAN_NAME = "FizzBuzzComputationMessageDrivenBean";
  private static readonly BEAN_VERSION = "1.0.0-FIZZBUZZ-MDB";
  private static readonly JNDI_NAME = "ejb/FizzBuzzComputationMDB";
  private static readonly FIZZ_BUZZ_COMPUTATION_MESSAGE_TYPE = "FizzBuzzComputationMessageType";

  private computationCallback: ((value: number) => string) | null;
  private messageListenerImpl: IJmsMessageListener | null;

  constructor(computationCallback?: (value: number) => string) {
    super(
      FizzBuzzComputationMessageDrivenBeanImpl.BEAN_NAME,
      FizzBuzzComputationMessageDrivenBeanImpl.BEAN_VERSION,
      FizzBuzzComputationMessageDrivenBeanImpl.JNDI_NAME,
    );
    this.computationCallback = computationCallback ?? null;
    this.messageListenerImpl = null;
  }

  setComputationCallback(callback: (value: number) => string): void {
    this.computationCallback = callback;
  }

  override ejbCreate(): void {
    this.processedMessageCount = 0;
  }

  override ejbRemove(): void {
    this.computationCallback = null;
  }

  override ejbActivate(): void {
  }

  override ejbPassivate(): void {
  }

  override onMessage(message: IJmsMessage): void {
    this.processedMessageCount++;
    if (this.computationCallback === null) {
      return;
    }

    let computationMessage: IFizzBuzzComputationMessage | null = null;

    const messageType = message.getStringProperty(FizzBuzzComputationMessageDrivenBeanImpl.FIZZ_BUZZ_COMPUTATION_MESSAGE_TYPE);
    if (messageType !== null) {
      computationMessage = FizzBuzzComputationObjectMessageImpl.fromJmsMessage(message);
    } else {
      computationMessage = new FizzBuzzComputationObjectMessageImpl();
      computationMessage.setComputationValue(message.getIntProperty("FizzBuzzComputationValue") ?? 0);
    }

    if (computationMessage !== null) {
      const value = computationMessage.getComputationValue();
      try {
        const result = this.computationCallback(value);
        computationMessage.setComputationResult(result);
      } catch {
        if (this.messageDrivenContext !== null) {
          this.messageDrivenContext.setRollbackOnly();
        }
      }
    }
  }

  getProcessedMessageCount(): number {
    return this.processedMessageCount;
  }
}
