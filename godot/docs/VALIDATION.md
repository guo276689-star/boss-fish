# Godot v0.3 Validation Record

**Status:** planning and documentation pass in progress. No v0.3 runtime result is recorded as passed without direct evidence.

## Scope and Linked Contracts

- Master scope: [GAME_MASTER_PLAN](GAME_MASTER_PLAN.md)
- Goal and release gate: [CURRENT_GOAL](../../docs/agent-loop/CURRENT_GOAL.md) and [ACCEPTANCE](../../docs/agent-loop/ACCEPTANCE.md)
- Evidence report: [CODEX_REPORT](../../docs/agent-loop/CODEX_REPORT.md)
- Area contracts: [01](areas/AREA_01_OFFICE_MAP.md), [02](areas/AREA_02_CAT_CONTROL.md), [03](areas/AREA_03_FISHING_LOOP.md), [04](areas/AREA_04_QUEST_BOARD.md), [05](areas/AREA_05_BESTIARY.md), [06](areas/AREA_06_SHOP.md), [07](areas/AREA_07_BOSS_PRESSURE.md), [08](areas/AREA_08_SAVE_AND_UI.md)

## v0.2 Baseline Used for Regression

The historic v0.2 report records Godot 4.7 import/start validation, a temporary deterministic validation script, and a visible Debug scene. This is baseline context only; v0.3 must repeat relevant checks after its own changes.

| Baseline invariant | Historic state | v0.3 recheck |
| --- | --- | --- |
| Godot starts and Main scene loads | Previously recorded as passed | Pending |
| Cat movement and five interaction areas | Previously recorded as passed | Pending |
| 8 fish / 3 quests / 3 upgrades | Previously recorded as passed | Pending |
| Catch success/failure and cross-system updates | Previously recorded as passed | Pending |
| Shop effects and boss inspection | Previously recorded as passed | Pending |
| Godot save reload/fallback | Previously recorded as passed | Pending |
| Electron Legacy untouched | Previously recorded by Git scope | Pending final Git scope check |

## Required Commands

| Command | Expected outcome | v0.3 result |
| --- | --- | --- |
| `git status --short` | Explainable workspace | Pending final check |
| `git branch --show-current` | `godot-v0.3-md-driven-polish` | Observed before documentation changes |
| `git diff --name-status` | Only scoped docs/Godot paths | Pending final check |
| `git diff --check` | Exit code 0 | Observed before documentation changes; pending final check |
| `godot --version` | Actual available Godot version | Passed — `4.7.stable.official.5b4e0cb0f` |
| `godot4 --version` | Actual available Godot version, if command exists | Passed — `4.7.stable.official.5b4e0cb0f` |
| `godot --headless --path godot --editor --quit` | Import/parse with no errors | Passed — initial scan/layout completed; no error emitted |
| `godot --headless --path godot --quit-after 180` | Main scene starts with no error | Passed — command completed with no runtime error output |

## Area Validation Matrix

| Area | Automated/state evidence | Visual/manual evidence | Result |
| --- | --- | --- | --- |
| Office Map | Reachable five interactables | Screenshot or traversal recording | 未验证 |
| Cat Control | WASD/arrow and nearest-target dispatch | Focus marker and prompt change | 未验证 |
| Fishing Loop | State flow, success, failure, cross-system effects | State/result readability | 未验证 |
| Quest Board | All quest types and no duplicate claim | Status/claim button readability | 未验证 |
| Bestiary | 8 entries, lock/unlock/count behavior | Rarity and lock scanability | 未验证 |
| Shop | Purchase constraints and all effect parameters | Cost/effect/max-level readability | 未验证 |
| Boss Pressure | Warning, inspection interruption, recovery | HUD/door urgency feedback | 未验证 |
| Save and UI | v0.2 migration, reload, malformed fallback | Help and panel-close consistency | 未验证 |

## Save Compatibility Contract

The implementation must document and verify the following before marking Area 08 passed:

| Item | Required v0.3 rule |
| --- | --- |
| New path | A versioned v0.3 `user://` JSON path |
| Legacy input | Read only the existing Godot v0.2 path as fallback; never Electron `localStorage` |
| Supported fields | `coins`, `caught_counts`, `quests`, `upgrade_levels`, `boss_pressure` |
| Missing/malformed file | Use a safe default state without crash |
| Migration write | Persist the supported v0.2 state to v0.3 after successful fallback load |
| Reset behavior | No reset UI is added in v0.3; a missing or rejected file starts from defaults |

## Final Evidence Requirements

- Record exact commands and concise output in [CODEX_REPORT](../../docs/agent-loop/CODEX_REPORT.md).
- Record pass/fail/未验证 for every area above.
- Record actual Godot version and whether the project started.
- Record final `git diff --name-status`, `git diff --check`, and confirmation that no Electron Legacy path changed.
- Do not call visual UI normal without a screenshot or human observation.
