import { AbstractBaseEnterpriseRemainderComputationProtocolLayer } from "../../abstracts/AbstractBaseEnterpriseRemainderComputationProtocolLayer.js";
import type { IComputationProtocolContext } from "../../contracts/IComputationProtocolContext.js";

export class NetworkLayerComputationProtocolImpl extends AbstractBaseEnterpriseRemainderComputationProtocolLayer {
  private static readonly LAYER_NUMBER = 3;
  private static readonly LAYER_IDENTIFIER = "NetworkLayer";
  private static readonly LAYER_DESCRIPTION = "Network layer: routes computation to the correct strategy resolver";

  private readonly divisorRoutingTable: Map<number, string>;

  constructor(divisorRoutingTable?: Map<number, string>) {
    super();
    this.divisorRoutingTable = divisorRoutingTable ?? new Map([
      [3, "FIZZ_ROUTE"],
      [5, "BUZZ_ROUTE"],
      [15, "FIZZBUZZ_ROUTE"],
    ]);
  }

  override getLayerIdentifier(): string {
    return NetworkLayerComputationProtocolImpl.LAYER_IDENTIFIER;
  }

  override getLayerNumber(): number {
    return NetworkLayerComputationProtocolImpl.LAYER_NUMBER;
  }

  override getLayerDescription(): string {
    return NetworkLayerComputationProtocolImpl.LAYER_DESCRIPTION;
  }

  override processLayer(dividend: number, divisor: number, context: IComputationProtocolContext): number {
    return this.templateMethodProcessLayer(dividend, divisor, context);
  }

  protected override preProcessLayer(
    _dividend: number,
    divisor: number,
    context: IComputationProtocolContext,
  ): void {
    const route = this.divisorRoutingTable.get(divisor) ?? "DEFAULT_ROUTE";
    context.setAttribute("networkLayer.routedDivisor", divisor);
    context.setAttribute("networkLayer.selectedRoute", route);
  }

  protected override executeLayerComputation(
    dividend: number,
    divisor: number,
    context: IComputationProtocolContext,
  ): number {
    return this.proceedToNextLayer(dividend, divisor, context);
  }

  registerRoute(divisor: number, route: string): void {
    this.divisorRoutingTable.set(divisor, route);
  }
}
