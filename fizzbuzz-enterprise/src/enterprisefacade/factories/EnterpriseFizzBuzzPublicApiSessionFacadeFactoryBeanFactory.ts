import { DefaultEnterpriseFizzBuzzPublicApiSessionFacadeImpl } from "../impl/DefaultEnterpriseFizzBuzzPublicApiSessionFacadeImpl.js";
import type { IEnterpriseFizzBuzzPublicApiSessionFacade } from "../contracts/IEnterpriseFizzBuzzPublicApiSessionFacade.js";

let sessionFacade: IEnterpriseFizzBuzzPublicApiSessionFacade | null = null;

export class EnterpriseFizzBuzzPublicApiSessionFacadeFactoryBeanFactory {
  static createSessionFacade(
    singleValueResolver: (value: number) => string,
    rangeResolver: (start: number, end: number) => readonly string[],
  ): IEnterpriseFizzBuzzPublicApiSessionFacade {
    if (sessionFacade === null || !sessionFacade.isSessionActive()) {
      sessionFacade = new DefaultEnterpriseFizzBuzzPublicApiSessionFacadeImpl(
        singleValueResolver,
        rangeResolver,
      );
      console.debug(
        `[PublicApiSessionFacadeFactory] Session facade created: ` +
        `facade=[${sessionFacade.getFacadeName()} v${sessionFacade.getFacadeVersion()}], ` +
        `sessionId=[${sessionFacade.getSessionId()}], ` +
        `sessionActive=[${sessionFacade.isSessionActive()}]`,
      );
    }
    return sessionFacade;
  }

  static getSessionFacade(): IEnterpriseFizzBuzzPublicApiSessionFacade | null {
    return sessionFacade;
  }

  static resetSessionFacade(): void {
    sessionFacade = null;
  }
}
