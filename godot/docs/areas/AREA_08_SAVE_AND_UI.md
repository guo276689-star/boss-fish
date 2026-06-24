# AREA 08 — Save and UI

**Master link:** [GAME_MASTER_PLAN](../GAME_MASTER_PLAN.md) · **Acceptance:** [ACCEPTANCE](../../../docs/agent-loop/ACCEPTANCE.md)

## Area Name

Save and UI.

## Purpose

Keep the Godot-only save safe and make HUD/panel controls consistent and self-explanatory.

## Current State

`SaveService` persists `coins`, caught counts, quests, upgrades, and boss pressure in `user://boss_fish_v0_2_save.json`; invalid JSON falls back to defaults. HUD provides help text, modal panels, Escape close, and a result acknowledgement path.

## Problems

- Save filename/versioning should identify v0.3 compatibility clearly.
- Modal closing, result acknowledgement, and help text need one consistent contract.

## v0.3 Tasks

- Use a versioned Godot v0.3 save path with v0.2 fallback migration.
- Keep malformed/missing save fallback safe.
- Make all panels close consistently and present concise movement/interact/fishing help.

## Forbidden Scope

- No account, cloud save, database, networking, or Electron `localStorage` read/write.

## Related Files

- `godot/scripts/systems/save_service.gd` — file paths, safe load, migration, and write.
- `godot/scripts/systems/game_state.gd` — serializable domain state only.
- `godot/scripts/hud.gd`, `godot/scenes/hud.tscn`, `godot/scripts/main.gd` — panel and input consistency.

## Acceptance Checklist

- [ ] Coins, bestiary, shop, quest, and pressure persist through reload.
- [ ] Missing or malformed save does not crash and falls back safely.
- [ ] v0.2 save migrates to the v0.3 path without losing supported fields.
- [ ] Every modal can close through its visible button and Esc.
- [ ] HUD explains movement, interaction, and fishing.

## Evidence Needed

- Isolated save/reload/malformed-file validation.
- Runtime panel close and help-text inspection; otherwise mark 未验证.
