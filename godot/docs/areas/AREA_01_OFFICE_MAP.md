# AREA 01 — Office Map

**Master link:** [GAME_MASTER_PLAN](../GAME_MASTER_PLAN.md) · **Acceptance:** [ACCEPTANCE](../../../docs/agent-loop/ACCEPTANCE.md)

## Area Name

Office Map.

## Purpose

Make the existing office a readable low-noise pixel blockout in which each gameplay zone and travel route is obvious.

## Current State

`main.tscn` contains the fish pond, task board, bestiary shelf, shop desk, boss door, a central carpet, desk row, and a cat spawn near the middle of the room.

## Problems

- Functional zones share a generic interactable visual and need stronger landmark separation.
- Area names and travel intent must remain readable without relying only on proximity prompts.

## v0.3 Tasks

- Give fish pond, task board, bestiary shelf, shop desk, and boss door distinct low-pixel blockout landmarks and visible names.
- Keep the spawn point and open walking lanes clear.
- Retain all existing interaction positions and collision constraints unless a minimal layout adjustment is required for reachability.

## Forbidden Scope

- No new map, large art asset, full AI background, complex TileMap, or new interaction type.

## Related Files

- `godot/scenes/main.tscn` — office composition, landmarks, boundaries, and interaction placement.
- `godot/scenes/interactables/world_interactable.tscn` — reusable interaction marker visual.
- `godot/scripts/systems/interaction_director.gd` — reachability selection; not map styling.

## Acceptance Checklist

- [ ] Five functional areas are recognizable before interaction.
- [ ] Cat can walk from spawn to each interaction point without obstruction.
- [ ] Existing fish pond, task, bestiary, shop, and boss actions remain available.

## Evidence Needed

- Godot visual inspection or screenshot of the office.
- Functional traversal/interaction evidence recorded in `VALIDATION.md`.

## v0.3 Evidence Update

- Implemented: office floor, landmark trims, task-board, bestiary-shelf, shop, pond, and boss-door blockouts now use the shared v0.4 low-noise palette.
- Automated: the temporary validation instantiated the scene's interaction components and verified current-target switching.
- Visual readability, spawn-to-zone walking observation, and screenshot evidence: **未验证**.
