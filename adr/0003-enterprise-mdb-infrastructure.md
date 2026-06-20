# ADR 0003: Enterprise Message-Driven Bean Infrastructure for FizzBuzz

## Status

Proposed

## Context

FizzBuzz values are computed synchronously, creating a blocking dependency
between the range iterator and the resolution facade. In an enterprise
environment, synchronous computation is an anti-pattern that prevents horizontal
scaling of divisor evaluation.

## Decision

We will introduce a JMS-based Message-Driven Bean (MDB) infrastructure:

1. **JmsConnectionFactory** — configured via administered objects bound in JNDI.
2. **JmsInfrastructureFactoryBeanFactory** — bootstraps the connection factory,
   request queue, result topic, and MDB container.
3. **EnterpriseServiceBusChannelImpl** — routes computation events through a
   message bus with channel binding.
4. **EnterpriseServiceBusMessageRouterImpl** — applies routing rules based on
   message headers (divisor, priority, SLA class).

The MDB container is deployed with an initial bean count of 10 and a maximum
of 50, with container-managed transactions (CMT) set to Required.

## Consequences

- Computation requests can be offloaded to the JMS provider for async
  processing.
- The MDB container provides automatic recovery and failover for failed
  computation messages.
- JNDI lookup may fail if the application server's naming context is not
  properly configured, causing a graceful fallback to synchronous computation.
- Developer machines without a JMS provider will see bootstrap debug messages
  indicating "N/A" for all JMS infrastructure components, which is expected
  behavior.
