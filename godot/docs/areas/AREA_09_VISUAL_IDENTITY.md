# AREA 09 — Visual Identity and Asset Pipeline

**Master dependency:** [GAME_MASTER_PLAN](../GAME_MASTER_PLAN.md) · **Art direction:** [ART_DIRECTION](../ART_DIRECTION.md) · **Pipeline:** [ASSET_PIPELINE](../ASSET_PIPELINE.md) · **Manifest:** [ASSET_MANIFEST](../ASSET_MANIFEST.md)

## Area Name

Visual Identity and Asset Pipeline.

## Purpose

Turn the v0.3 functional blockout into a cohesive v0.4 visual demonstration without claiming final hand-drawn art.

## Current State

- Office and HUD now use palette-aligned node blockouts and shared panel/button styles.
- `godot/assets/` contains `cat_placeholder.svg` plus two 96×64 imported fish candidates; all other required assets remain explicitly missing or placeholder.
- Project default canvas filtering is nearest-friendly.

## Problems

- Placeholders lack a documented contract and manifest.
- HUD/modal surfaces do not yet share one explicit style resource.
- Interactable silhouettes are functional but too visually generic.

## v0.4 Tasks

- Apply the art direction palette and depth bands to the office blockout while preserving collision and interaction positions.
- Introduce shared scene-owned style resources for HUD panels and buttons.
- Make placeholder identity deliberate through a shared marker, labels, and manifest state.
- Verify import defaults and only attempt candidate fish integration after validating source size, mapping, and filter.

## Forbidden Scope

- No full-screen AI background, final-art claim, complex TileMap, complex animation system, mass fish import, or Electron Legacy change.

## Related Files

- `godot/scenes/main.tscn` — office blockout and visual hierarchy.
- `godot/scenes/hud.tscn`, `godot/scripts/hud.gd` — UI style and modal action rendering.
- `godot/scenes/interactables/world_interactable.tscn`, `godot/scripts/interactables/world_interactable.gd` — reusable placeholder landmark visual.
- `godot/project.godot` — project-wide texture filtering only.
- `godot/assets/` — reviewed Godot-ready assets only.

## Acceptance Checklist

- [ ] Art direction, asset pipeline, and manifest exist and agree on status values.
- [ ] Office landmarks, pond, desk, and door use one low-noise blockout vocabulary.
- [ ] HUD and every modal use one panel/button style family.
- [ ] Placeholders are deliberate and listed; no candidate is called final without approval.
- [ ] Project imports and runs with nearest-friendly settings.
- [ ] Core v0.3 interactions, state changes, and save behavior remain intact.
- [ ] Git diff contains no Electron Legacy path and no generated/failure art.

## Evidence Needed

- Godot editor import/run output.
- Screenshot or manual visual observation at 1280×720; otherwise visual acceptance is 未验证.
- Manifest/path audit and Git scope check.

## v0.4 Evidence Update

- Implemented: node-composed office landmarks, shared `StyleBoxFlat` panel surfaces, styled runtime buttons, action-specific placeholders, and two imported test fish previews.
- Automated: Godot import/start and `V0_3_V0_4_VALIDATION_PASS` passed; default project texture filtering remains nearest-friendly.
- Human visual consistency, blur, and 1280×720 screenshot evidence: **未验证** because Windows application control was unavailable and the headless renderer cannot capture a viewport texture.
