# Current Goal — Godot v0.3 MD-Driven Polish

## Current Phase

Read → Plan → Write MD. Implementation has not started.

## Goal

Build a strongly linked Markdown control system, then use it to polish the Godot v0.2 playable loop into a clearer and more stable v0.3 demonstration build.

## Target Track

Godot Mainline only. Electron Legacy remains frozen and untouched.

## Required Deliverables

- [GAME_MASTER_PLAN](../../godot/docs/GAME_MASTER_PLAN.md) and eight linked area contracts.
- Scoped Godot scene, control, fishing, UI, boss-feedback, and save-compatibility polish.
- Updated [ACCEPTANCE](ACCEPTANCE.md), [CODEX_REPORT](CODEX_REPORT.md), [DECISION_LOG](DECISION_LOG.md), and [Godot validation record](../../godot/docs/VALIDATION.md).

## In Scope

- Improve existing office landmarks and navigation readability.
- Improve existing cat control, nearest-target focus, and prompt clarity.
- Improve fishing state/result feedback, panels, shop/quest/bestiary readability, and boss-pressure feedback.
- Add minimal v0.2-to-v0.3 Godot save migration and malformed-save coverage.
- Run Git checks, Godot 4.x import/start validation, deterministic validation where feasible, and documented manual observations.

## Must Remain True

- Godot starts; cat movement and five interactions work.
- Fishing can succeed or time out; catches change coins, quests, bestiary, pressure, and save.
- Three quests, three upgrades, and eight fish still load from JSON.
- Shop effects still influence fishing.
- Inspection interrupts fishing and later recovers.
- Electron Legacy is unchanged.

## Forbidden Scope

- No Electron Legacy modifications or JavaScript migration.
- No backend, server, database, account, networking, leaderboard, Steam achievement, GodotMaker, cloud save, new map, expanded fish catalog, complex TileMap, AI, combat, pet, dungeon, crafting, or complex animation system.
- No commit, push, merge, or tag without the exact user approval phrase: `验收通过，允许提交并 push`.

## Implementation Gate

The documentation pass is authorized by this goal. Before changing GDScript, scenes, data, or project settings, Codex must present the exact file plan, impact check, quality check, and validation method, then receive user confirmation as required by the BossFish skill.

## Stop Conditions

- Every acceptance item has actual evidence, or remaining unavailable checks are marked 未验证.
- A blocker requires scope expansion or user authority.
- The working tree includes unrelated changes.

## Linked Acceptance

See [ACCEPTANCE](ACCEPTANCE.md) for test criteria, [GAME_MASTER_PLAN](../../godot/docs/GAME_MASTER_PLAN.md) for dependency ownership, and [CODEX_REPORT](CODEX_REPORT.md) for executed-command evidence.
