# AREA 04 — Quest Board

**Master link:** [GAME_MASTER_PLAN](../GAME_MASTER_PLAN.md) · **Acceptance:** [ACCEPTANCE](../../../docs/agent-loop/ACCEPTANCE.md)

## Area Name

Quest Board.

## Purpose

Make the fixed three daily-style requests legible: title, progress, reward, claimable state, and claimed state.

## Current State

`GameState` advances `catch_count`, `earn_coins`, and `catch_rarity`; HUD lists quests and creates buttons for completed unclaimed entries.

## Problems

- Status hierarchy and reward availability need stronger visual wording.

## v0.3 Tasks

- Clarify in-progress, claimable, and claimed text in the panel.
- Preserve the existing one-time claim guard and refresh after catches/claims.

## Forbidden Scope

- No real daily refresh, weekly quest, quest chain, or new quest catalog.

## Related Files

- `godot/data/quests.json` — fixed quest templates; no catalog expansion.
- `godot/scripts/systems/game_state.gd` — progress and claim rule ownership.
- `godot/scripts/hud.gd` — panel formatting and claim intent only.
- `godot/scripts/main.gd` — routes claimed intent.

## Acceptance Checklist

- [ ] Count, coin, and rarity quests progress after catches.
- [ ] Completed quest can be claimed once and awards coins.
- [ ] Claimed quest cannot be claimed again.

## Evidence Needed

- Deterministic state validation for all three quest types and duplicate claim rejection.
- Panel visual inspection, or 未验证.
