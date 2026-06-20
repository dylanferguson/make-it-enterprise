# ADR-005: Enterprise Service Bus Architecture for Computation Event Routing

**Status:** Accepted  
**Date:** 2026-06-20  
**Deciders:** Enterprise Architecture Review Board, Integration Architecture Committee

## Context

The FizzBuzz computation pipeline generates events at each lifecycle phase (initialization, evaluation, normalization, completion). Direct method invocation between components creates tight coupling that prevents independent deployability and runtime reconfiguration. A message-oriented middleware layer is required to decouple computation stages.

## Decision

We will implement an **Enterprise Service Bus (ESB)** architecture comprising:

1. **IEnterpriseServiceBusChannel** — pub/sub channels for computation events, supporting durable and non-duurable subscriptions
2. **IEnterpriseServiceBusMessage** — canonical message format with messageId, correlationId, headers, and typed payloads
3. **IEnterpriseServiceBusMessageRouter** — content-based router that routes messages to the appropriate channel based on message type headers
4. **IEnterpriseServiceBusChannelBinding** — binding contract between channels and routers, enabling channel-to-channel bridging

The ESB will be initialized during the bootstrap gate phase and made available via the EnterpriseApplicationContext.

## Consequences

- Positive: Computation stages can be independently monitored and intercepted at the ESB boundary
- Positive: New observers (audit, metrics, SLO tracking) subscribe to channels without modifying computation code
- Negative: A single FizzBuzz value resolution now requires ESB serialization/deserialization of computation events
- Negative: Message delivery is best-effort (this iteration does not implement guaranteed delivery or dead-letter channels)

## Compliance

All cross-cutting computation events MUST be published to the ESB before delegation to downstream handlers. Direct listener registration on computation components is deprecated.
