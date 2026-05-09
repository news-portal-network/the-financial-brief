# Architecture decisions — TFB

This document records architectural decisions and known workarounds.
Update when decisions change or workarounds are removed.

## esbuild override for OpenNext bundling (2026-05-02)

**Status:** Active workaround.

**Decision:** Force esbuild ≥0.27.7 in the @opennextjs/aws dependency branch via pnpm.overrides in package.json.

**Why:** @opennextjs/cloudflare 1.19.1 transitively pins @opennextjs/aws → esbuild 0.25.4. esbuild 0.25.x has a printer panic ("Unexpected expression of type <nil>" at js_printer.go:3326) triggered by large bundled chunks containing cross-module type-tag switches — exactly the shape of the chunk that holds Payload + Drizzle + Lexical + AJV. The bug is upstream esbuild, tracked in evanw/esbuild#4287 (closed, fixed in a later release). `pnpm preview` and `pnpm deploy` both fail without this override.

**Source of truth:**
- https://github.com/evanw/esbuild/issues/4287
- https://opennext.js.org/cloudflare/troubleshooting

**Trade-offs:**
- Override is scoped to one dependency branch (@opennextjs/aws), not global. Other esbuild versions in the tree (drizzle-kit, esbuild-register) are unaffected.
- No runtime impact: esbuild only runs at build time; the deployed Worker uses Cloudflare's native runtime.
- esbuild 0.27.7 was already installed via tsx, so no new download and known-compatible with the rest of the stack.

**Revisit cadence:** Re-test every 2-3 months or when bumping @opennextjs/cloudflare. To check if the workaround can be removed: temporarily delete the "@opennextjs/aws>esbuild" override from package.json, run `pnpm install && pnpm preview`. If preview succeeds without panic, drop the override permanently and remove this section.
