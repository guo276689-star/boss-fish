# AREA 05 — Bestiary

**Master link:** [GAME_MASTER_PLAN](../GAME_MASTER_PLAN.md) · **Acceptance:** [ACCEPTANCE](../../../docs/agent-loop/ACCEPTANCE.md)

## Area Name

Bestiary.

## Purpose

Make the 8-fish collection understandable without exposing information for fish not yet caught.

## Current State

HUD renders caught fish with name, rarity, description, and count; uncaught fish render as `??? · 锁定`.

## Problems

- Unlocked information hierarchy and rarity distinction need polish.

## v0.3 Tasks

- Improve unlocked/locked scanability and rarity wording/color without changing catalog data.
- Keep close behavior and no-leak rules intact.

## Forbidden Scope

- No filters, pagination, new fish, or complete 32-fish expansion.

## Related Files

- `godot/data/fish.json` — 8 static fish records.
- `godot/scripts/systems/game_state.gd` — caught counts.
- `godot/scripts/hud.gd` — collection display.

## Acceptance Checklist

- [ ] All 8 catalog entries are represented.
- [ ] Catching a fish updates its unlocked state and count.
- [ ] Uncaught entries do not reveal full information.
- [ ] Panel can close consistently.

## Evidence Needed

- State validation and Godot panel inspection; visual details are 未验证 without a screenshot/manual observation.

## v0.3 Evidence Update

- Implemented: no catalog data or unlock rule changed; the fish-result preview only uses explicitly imported candidate IDs.
- Automated: catches update saved bestiary counts in `V0_3_V0_4_VALIDATION_PASS`.
- Eight-entry panel scanability and locked-state observation: **未验证**.
