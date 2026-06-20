export interface IFizzBuzzEnterpriseServiceFacade {
  resolveEnterpriseValue(value: number): string;
  calculateEnterpriseRange(start: number, end: number): readonly string[];
  getFacadeName(): string;
  getFacadeVersion(): string;
}
