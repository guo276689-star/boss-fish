# Godot v0.5 Playable Art Pack Validation

**Status:** implemented and automatically validated. Human 1280×720 visual acceptance remains **未验证** until the user observes or provides a screenshot.

## Linked Contracts

- [ART_DIRECTION](ART_DIRECTION.md), [ASSET_PIPELINE](ASSET_PIPELINE.md), [ASSET_MANIFEST](ASSET_MANIFEST.md), [GAME_MASTER_PLAN](GAME_MASTER_PLAN.md), and [Area 09](areas/AREA_09_VISUAL_IDENTITY.md)
- [Current goal](../../docs/agent-loop/CURRENT_GOAL.md), [acceptance](../../docs/agent-loop/ACCEPTANCE.md), and [report](../../docs/agent-loop/CODEX_REPORT.md)

## Baseline Preserved

- Existing Godot v0.4 mainline behavior remains the baseline: 8 fish, 3 quests, 3 upgrades, movement, five interactions, fishing, quests, bestiary, shop, boss pressure, and save behavior.
- v0.5 changed presentation only: assets, scene decoration, HUD/result/bestiary visual treatment, and docs.
- No `godot/data/*.json`, save schema, Electron Legacy, backend, networking, export, merge, tag, commit, or push is part of the implementation.

## v0.5 Validation Results

| Area | Required proof | Status |
| --- | --- | --- |
| Cat | Scene/runtime cat visual plus movement/collision check | 部分通过：cat scene load and texture import pass; visible movement/collision observation 未验证 |
| Office props | Screenshot/manual observation and five-area reachability | 部分通过：main scene starts and static prop nodes exist; manual reachability 未验证 |
| Fish | Eight visual mappings; locked/unlocked bestiary and result preview | 通过：temporary Godot validation script verified 8 IDs, resources, result previews, and bestiary cards |
| HUD / panel | Screenshot/manual observation of hierarchy and close buttons | 部分通过：HUD scene loads and dynamic modal methods pass; screenshot/manual hierarchy 未验证 |
| Fishing / boss | State-specific visual feedback and unchanged logic | 部分通过：status and pressure UI paths executed; manual state timing 未验证 |
| Import | Nearest-friendly project/import settings and no blurred scaling | 部分通过：Godot import passes and PNGs have binary attributes; manual blur check 未验证 |
| Regression | v0.4 behavior/data/save checks | 部分通过：main start and data counts pass; keyboard/manual save regression 未验证 |
| Git scope | No Electron Legacy path; `git diff --check` passes | 通过：final diff/check scope is Godot/docs only |

## Commands Run

- `godot --version` → `4.7.stable.official.5b4e0cb0f`
- `godot4 --version` → `4.7.stable.official.5b4e0cb0f`
- `godot --headless --path godot --editor --quit` → passed
- `godot --headless --path godot --quit-after 180` → passed
- `godot --headless --path godot --script res://tests/tmp_v0_5_validation.gd` → `[v0.5-validation] PASS`; temporary script deleted after run
- JSON parse check → 8 fish, 3 quests, 3 shop upgrades
- Debug marker search in `godot/scripts` and `godot/scenes` → no matches
- `git diff --check` → passed, with expected CRLF warnings for `docs/agent-loop/*.md`
- `git status --short` → Godot/docs scope only; no Electron Legacy paths

## Asset Status Rule

All v0.5 non-final assets are `placeholder_plus`, `imported`, or future-only `missing` in the manifest. `final` is prohibited without human art approval; current final count is 0.

## Remaining Manual Checks

- Observe 1280×720 visual readability in a visible Godot window.
- Move the cat through the office and confirm no prop decoration obscures interactions.
- Trigger fishing start/wait/bite/success/fail/rare states and boss warning in a visible run.
- Open bestiary/shop/tasks and confirm modal hierarchy visually matches the art direction.
