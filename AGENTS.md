# AGENTS.md - BossFish Project Agent Instructions

Before doing any work in this repository, read and follow:

`.codex/skills/bossfish/SKILL.md`

This project is 《老板鱼来了》 / Boss Fish Is Coming.

## Project tracks

The repository has two explicit tracks:

- **Godot Mainline**: the current product direction. It is a Godot 4.x large-screen 2D pixel game under `godot/`.
- **Electron Legacy**: the frozen Windows small-window idle fishing prototype in the repository root and existing Electron directories.

Before editing, always identify the target track:

1. If the request explicitly names Electron, Legacy, the old small-window prototype, or an existing Electron bug, use Electron Legacy rules.
2. Otherwise, new game features default to Godot Mainline under `godot/`.
3. Documentation tasks may describe both tracks but must keep their status and boundaries explicit.
4. Never move old JavaScript into Godot as a code migration.

Electron Legacy must not be deleted. Do not continue Electron Canvas texture optimization unless the request explicitly asks for Legacy maintenance.

## Required mode

Use BossFish Compact Mode:

- Reduce repeated explanations.
- Keep necessary boundaries, commands, impact checks, and validation evidence.
- Do not say "completed" without test evidence and Git evidence.
- Mark uncertain items as "未验证".

Before editing code, always output:

1. Goal
2. Target track
3. Files to modify
4. Responsibility of each file
5. Why each file is the correct place
6. Forbidden scope
7. Impact check
8. Code quality check
9. Validation method

## Directory responsibilities

### Godot Mainline

- `godot/project.godot`: project, display, input and rendering settings; no game rules.
- `godot/scenes/`: scene composition and clear Node ownership; no oversized all-purpose main scene.
- `godot/scripts/`: GDScript behavior and system coordination; keep UI, gameplay, data and persistence responsibilities separate.
- `godot/data/`: static game data; do not hard-code large catalogs in Node scripts.
- `godot/assets/`: production-ready Godot assets only; no failed art, raw dumps or unused temporary files.
- `godot/docs/`: Godot design, migration boundaries and validation evidence.

### Electron Legacy

- `main.js`: Electron main process and window/IPC ownership only.
- `preload.js`: allowlisted security bridge only.
- `index.html`, `mini.html`, `styles/`: Legacy page structure and presentation.
- `src/`: existing Legacy renderer, gameplay, save, quest, bestiary, shop, sound and mini-mode modules; preserve current separation.
- `data/`, `assets/`: Legacy static data and assets.

## Code quality rules

- Keep functions under 50 lines when practical; explain functions over 50 lines and split functions over 80 lines unless strongly justified.
- Keep Scene/Node responsibilities clear.
- Do not put unrelated business systems into the main scene or one main script.
- Do not hard-code large static datasets across Node scripts.
- Remove dead, duplicate and temporary code.
- Do not commit debug output, breakpoints, temporary patches or unused assets.
- Do not create speculative code for possible future use.
- Do not mix UI, gameplay rules, persistence and platform-process responsibilities.

## Impact checks

Always check impact on:

- coins
- daily quests
- bestiary
- shop
- sound
- mini mode
- localStorage and future Godot saves
- Electron main process
- Godot project settings, scenes and data

## Hard bans

- no backend, server, account system, database or networking
- no leaderboard or Steam achievements
- no GodotMaker
- no complex pet system, dungeon or crafting
- no tray feature or global hotkeys
- no complex animation system without an approved milestone
- no large rewrite outside the requested track
- no automatic reuse of Gemini / FrameRonin output as final art; references must be normalized to one Godot pixel-art specification

## Validation and Git workflow

- Work on feature or milestone branches, never directly on `main`.
- Validate the affected track before merging.
- Godot work requires Godot 4.x import/run evidence plus relevant manual checks; unavailable checks are "未验证".
- Electron Legacy work requires relevant npm/manual regression and storage compatibility evidence.
- Documentation-only work must prove that protected code paths were not changed.
- Use separate commits for separate subfeatures.
- Do not merge, tag or claim completion without validation evidence.
