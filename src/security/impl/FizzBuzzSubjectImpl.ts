import { AbstractBaseJaasSubject } from "../abstracts/AbstractBaseJaasSubject.js";

export class FizzBuzzSubjectImpl extends AbstractBaseJaasSubject {
  private static readonly SUBJECT_NAME = "FizzBuzzSubject";
  private static readonly SUBJECT_VERSION = "1.0.0-JAAS-SUBJECT";

  getSubjectDescriptor(): string {
    return `${FizzBuzzSubjectImpl.SUBJECT_NAME} v${FizzBuzzSubjectImpl.SUBJECT_VERSION}: ${this.principals.length} principal(s)`;
  }

  static getSubjectName(): string {
    return FizzBuzzSubjectImpl.SUBJECT_NAME;
  }

  static getSubjectVersion(): string {
    return FizzBuzzSubjectImpl.SUBJECT_VERSION;
  }
}
