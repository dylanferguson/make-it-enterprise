export interface IEnterpriseComputationResolutionAdapter {
  canHandle(value: number): boolean;
  compute(value: number): string;
  getAdapterName(): string;
  getAdapterVersion(): string;
  getAdapterDivisor(): number;
  getAdapterOutputLabel(): string;
}
