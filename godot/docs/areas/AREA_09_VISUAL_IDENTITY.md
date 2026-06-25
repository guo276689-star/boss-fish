# AREA 09 — Visual Identity and Asset Pipeline

**Master dependency:** [GAME_MASTER_PLAN](../GAME_MASTER_PLAN.md) · **Art direction:** [ART_DIRECTION](../ART_DIRECTION.md) · **Pipeline:** [ASSET_PIPELINE](../ASSET_PIPELINE.md) · **Manifest:** [ASSET_MANIFEST](../ASSET_MANIFEST.md)

## Area Name

Visual Identity and Asset Pipeline.

## Purpose

Turn the functional Godot mainline into a cohesive playable visual demonstration without claiming final hand-drawn art.

## Current State

- Office and HUD use palette-aligned node compositions and shared panel/button styles.
- `godot/assets/` contains one imported 96×96 cat candidate and eight imported 96×64 fish candidates; all are non-final.
- Bestiary and result UI now use 8-fish visual states with locked/unlocked and rarity treatment.
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

## v0.5 Playable Art Pack Tasks

- Replace the cat SVG with an imported 96×96 cat source or documented `placeholder_plus` cat composition.
- Upgrade pond, task board, bestiary shelf, shop desk, boss door, and spawn mat silhouettes without moving collisions or interaction points.
- Provide all eight fish with imported previews or unified `placeholder_plus` badges in fish results and bestiary states.
- Add compact visual feedback for fishing phases and boss inspection while preserving existing state-machine ownership.
- Update the manifest and verify binary texture attributes, nearest filtering, and import paths.

## v0.5 Acceptance

- [ ] Cat reads as a cat and preserves movement/interaction.
- [ ] Six core office landmarks read without depending on text labels.
- [ ] All eight fish have result/bestiary visual states with rarity and lock distinction.
- [ ] HUD, panels, buttons, fishing states, and boss warning share one visual vocabulary.
- [ ] Every non-final asset is marked `placeholder`, `placeholder_plus`, or `imported`.
- [ ] Godot imports/runs and v0.4 gameplay regression remains intact.

## v0.5 Evidence Update

- Implemented: imported cat candidate, eight imported fish previews, enhanced office props, bestiary card grid, result preview coverage, fishing-state icon/color feedback, and pressure warning icon state.
- Automated: Godot editor import passed; Godot main start passed; temporary Godot validation script verified 8 fish resources, result previews, bestiary grid, and cat/main scene loading, then was deleted.
- Screenshot/manual visual observation at 1280×720: **未验证**.
