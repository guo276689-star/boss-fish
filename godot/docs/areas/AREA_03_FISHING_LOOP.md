# AREA 03 — Fishing Loop

**Master link:** [GAME_MASTER_PLAN](../GAME_MASTER_PLAN.md) · **Acceptance:** [ACCEPTANCE](../../../docs/agent-loop/ACCEPTANCE.md)

## Area Name

Fishing Loop.

## Purpose

Make the existing cast, wait, bite, reel, success, and failure flow clear without adding QTE complexity.

## Current State

`FishingSystem` uses `idle → casting → waiting → bite → caught → result`; `GameState` awards fish and coins; HUD displays a result modal. Shop effects already modify wait, rare weight, and hook window. Boss inspection can interrupt fishing.

## Problems

- State wording and priority can be clearer during casting and result acknowledgement.
- Rare-fish feedback needs a stronger but lightweight distinction.

## v0.3 Tasks

- Present every existing state with explicit player-facing wording.
- Make success, escape, fish name, rarity, and coin reward visually distinct.
- Preserve shop parameter effects and boss interruption behavior.

## Forbidden Scope

- No new fish, complex QTE, complex animation, or new fishing subsystem.

## Related Files

- `godot/scripts/systems/fishing_system.gd` — fishing state machine.
- `godot/scripts/systems/game_state.gd` — weighted draw, rewards, and upgrade effects.
- `godot/scripts/systems/boss_pressure.gd` — interruption dependency.
- `godot/scripts/hud.gd` and `godot/scenes/hud.tscn` — state/result feedback.
- `godot/scripts/main.gd` — signal routing only.

## Acceptance Checklist

- [ ] Successful and timeout failure paths run.
- [ ] Result identifies fish name, rarity, and coins; rare feedback is distinguishable.
- [ ] Coin, quest, bestiary, pressure, and save updates still occur after a catch.
- [ ] Shop effects and boss pressure continue to influence the loop.

## Evidence Needed

- Headless deterministic fishing validation.
- Runtime/manual visual result evidence; otherwise mark 未验证.

## v0.3 Evidence Update

- Implemented: explicit prepare, wait, bite, success, and escape status copy; result modal now renders the fish rarity in Chinese and can show an imported test preview.
- Automated: waiting, bite/reel success, result acknowledgement, and timeout failure passed in `V0_3_V0_4_VALIDATION_PASS`.
- Live result rhythm and rarity visual feedback: **未验证**.
