# AREA 06 — Shop

**Master link:** [GAME_MASTER_PLAN](../GAME_MASTER_PLAN.md) · **Acceptance:** [ACCEPTANCE](../../../docs/agent-loop/ACCEPTANCE.md)

## Area Name

Shop.

## Purpose

Make the three existing upgrades and their coin trade-offs understandable and verifiable.

## Current State

The shop renders name, level, price, description, and purchase buttons. `GameState` validates funds and max level; upgrades affect fishing timing or rare weighting.

## Problems

- The panel needs explicit state feedback for insufficient funds and max level.
- Effect descriptions should connect to fishing outcomes more directly.

## v0.3 Tasks

- Clarify effect, current level, next cost, insufficient funds, purchase success, and max-level state.
- Preserve the exact three upgrade IDs and their parameter effects.

## Forbidden Scope

- No complex economy, mass upgrade catalog, synthesis, or cross-system reward changes.

## Related Files

- `godot/data/shop_upgrades.json` — 3 static upgrade templates.
- `godot/scripts/systems/game_state.gd` — funds, level, cost, and effect rules.
- `godot/scripts/hud.gd` — shop display and purchase intent.
- `godot/scripts/systems/fishing_system.gd` — consumes timing parameters.

## Acceptance Checklist

- [ ] Successful purchase deducts coins and updates level.
- [ ] Insufficient coins cannot purchase.
- [ ] Max-level upgrade cannot purchase.
- [ ] `better_rod`, `lucky_charm`, and `focus_snack` have verifiable effects.

## Evidence Needed

- Deterministic purchase/effect validation.
- Panel state inspection, or 未验证.
