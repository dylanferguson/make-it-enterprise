import type { ICorbaObjectReference } from "../contracts/ICorbaObjectReference.js";

export class StandardCorbaObjectReferenceImpl implements ICorbaObjectReference {
  private static readonly REFERENCE_NAME = "StandardCorbaObjectReference";
  private static readonly REFERENCE_VERSION = "1.0.0-CORBA-OBJREF";
  private static readonly IIOP_PROFILE = "IIOP:1.2";
  private static readonly HOST = "localhost";
  private static readonly PORT = 1050;

  private readonly repositoryId: string;
  private readonly objectKey: string;
  private readonly target: unknown;

  constructor(repositoryId: string, objectKey: string, target: unknown) {
    this.repositoryId = repositoryId;
    this.objectKey = objectKey;
    this.target = target;
  }

  getReferenceName(): string {
    return StandardCorbaObjectReferenceImpl.REFERENCE_NAME;
  }

  getReferenceVersion(): string {
    return StandardCorbaObjectReferenceImpl.REFERENCE_VERSION;
  }

  getRepositoryId(): string {
    return this.repositoryId;
  }

  getObjectKey(): string {
    return this.objectKey;
  }

  narrow<T>(_target: new (...args: unknown[]) => T): T {
    return this.target as T;
  }

  toIorString(): string {
    return `IOR:${Buffer.from(
      `CORBA:${this.repositoryId}:${StandardCorbaObjectReferenceImpl.IIOP_PROFILE}:` +
      `${StandardCorbaObjectReferenceImpl.HOST}:${StandardCorbaObjectReferenceImpl.PORT}:${this.objectKey}`,
    ).toString("base64")}`;
  }
}
