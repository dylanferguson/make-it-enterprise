export interface IRmiRemoteInterface {
  getRemoteInterfaceName(): string;
  getRemoteInterfaceVersion(): string;
  invokeRemoteComputation(value: number): string;
}
