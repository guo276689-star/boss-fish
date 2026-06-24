# Acceptance — Godot v0.3 MD-Driven Polish

## Evidence Rules

- **通过**: an actual command, deterministic test, or recorded manual observation supports the result.
- **失败**: the check ran and did not meet its criterion.
- **未验证**: it was not run, the environment is unavailable, or visual/manual proof is absent.
- Static inspection alone cannot prove runtime UI, input, save, or interaction behavior.

## Entry Gates

| Gate | Expected evidence | Status |
| --- | --- | --- |
| Branch | `git branch --show-current` is `godot-v0.3-md-driven-polish` | Pending |
| Scope | Git changes are limited to Godot/docs v0.3 files | Pending |
| Documentation | Master plan, all 8 area files, goal, acceptance, report, and decision log link coherently | Pending |
| Implementation approval | User confirms the pre-code plan required by BossFish skill | Pending |

## Required Command Evidence

| Command | Expected result | Status |
| --- | --- | --- |
| `git status --short` | Workspace state is explainable | Pending |
| `git branch --show-current` | Correct v0.3 branch | Pending |
| `git diff --name-status` | Only goal files are changed | Pending |
| `git diff --check` | Exit code 0; no whitespace errors | Pending |
| `godot --version` / `godot4 --version` | Actual Godot 4.x version recorded | Pending |
| `godot --headless --path godot --editor --quit` | Import/parse completes without errors | Pending |
| `godot --headless --path godot --quit-after 180` | Main scene starts without runtime errors | Pending |

## Area Acceptance Matrix

| Area | Passing condition | Evidence required |
| --- | --- | --- |
| [01 Office Map](../../godot/docs/areas/AREA_01_OFFICE_MAP.md) | Five landmarks are recognizable and reachable | Runtime/manual traversal or screenshot |
| [02 Cat Control](../../godot/docs/areas/AREA_02_CAT_CONTROL.md) | Both input schemes work; one focused target receives E | Deterministic input/selection check; visual focus observation |
| [03 Fishing Loop](../../godot/docs/areas/AREA_03_FISHING_LOOP.md) | Success/failure and result data are clear; cross-system effects persist | Deterministic fishing/state test; visual result observation |
| [04 Quest Board](../../godot/docs/areas/AREA_04_QUEST_BOARD.md) | Three quest types progress; rewards claim once | Deterministic state test; panel observation |
| [05 Bestiary](../../godot/docs/areas/AREA_05_BESTIARY.md) | Locked/unlocked states and count are correct for 8 fish | State test; panel observation |
| [06 Shop](../../godot/docs/areas/AREA_06_SHOP.md) | Success, insufficient funds, max level, and three effects work | Deterministic purchase/effect test; panel observation |
| [07 Boss Pressure](../../godot/docs/areas/AREA_07_BOSS_PRESSURE.md) | Warning, inspection interruption, and recovery work | Deterministic lifecycle test; visual observation |
| [08 Save and UI](../../godot/docs/areas/AREA_08_SAVE_AND_UI.md) | v0.2 migration/reload/fallback works; panels and help are consistent | Isolated save test; runtime observation |

## Protected v0.2 Regression Matrix

| Invariant | Required result |
| --- | --- |
| 8 fish / 3 quests / 3 upgrades JSON | All parse and expected counts remain intact |
| Coins | Catch and quest claim mutate coins correctly; purchase deducts only on success |
| Quests | Catch count, earned coins, rarity, completion, and no-double-claim work |
| Bestiary | Catches update counts; locked entries do not leak full info |
| Shop | Each upgrade affects wait, rare weight, or hook window |
| Boss | Pressure rises, inspection blocks/interrupts, then recovers |
| Godot save | Existing supported fields restore; malformed save safely defaults |
| Sound | No new sound behavior required; visual feedback remains valid |
| Mini mode / localStorage / Electron main | No behavior or file changes |

## Release Gate

- No known import or runtime error from the commands above.
- `git diff --check` passes.
- The report lists every failed or 未验证 item and all changed paths.
- Codex does not commit, push, merge, or tag. A user decision is still required after review.
