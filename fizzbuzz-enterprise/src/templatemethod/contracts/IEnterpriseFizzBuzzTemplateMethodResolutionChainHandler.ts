export interface IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler {
  executeTemplateResolution(
    value: number,
    innerResolver: (value: number) => string,
    templateContext: string | null,
  ): string;
  getTemplateMethodName(): string;
  getTemplateMethodVersion(): string;
  getTemplateMethodDescriptor(): string;
}
