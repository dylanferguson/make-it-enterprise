FROM node:24-bookworm

ARG OPENCODE_VERSION=1.17.8
ARG PNPM_VERSION=11.2.2

RUN apt-get update \
  && apt-get install --yes --no-install-recommends git ripgrep \
  && rm -rf /var/lib/apt/lists/* \
  && npm install --global \
    "opencode-ai@${OPENCODE_VERSION}" \
    "pnpm@${PNPM_VERSION}"

RUN useradd --create-home --shell /bin/bash --uid 10001 agent \
  && mkdir -p \
    /home/agent/.cache \
    /home/agent/.config/opencode \
    /home/agent/.local/share/opencode \
    /home/agent/.local/state/opencode \
    /opt/seed \
    /workspace \
  && chown -R agent:agent /home/agent /opt/seed /workspace

COPY --chown=agent:agent seed/ /opt/seed
COPY --chown=root:root docker/entrypoint.sh /usr/local/bin/sandbox-entrypoint
COPY --chown=root:root docker/enterprise-loop.sh /usr/local/bin/enterprise-loop

RUN chmod 0755 /usr/local/bin/sandbox-entrypoint /usr/local/bin/enterprise-loop

USER agent
WORKDIR /workspace

ENV HOME=/home/agent
ENV PNPM_STORE_DIR=/home/agent/.cache/pnpm
ENV XDG_CACHE_HOME=/home/agent/.cache
ENV XDG_CONFIG_HOME=/home/agent/.config
ENV XDG_DATA_HOME=/home/agent/.local/share
ENV XDG_STATE_HOME=/home/agent/.local/state

ENTRYPOINT ["sandbox-entrypoint"]
CMD ["opencode", "/workspace"]
