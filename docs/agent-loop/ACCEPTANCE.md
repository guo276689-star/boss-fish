# Acceptance — Godot v0.5 Playable Art Pack

## Evidence Rules

- **通过** requires actual command, deterministic check, screenshot, or recorded manual observation.
- **未验证** is mandatory when visual/manual evidence is unavailable.
- Imported assets are never final art without explicit human approval.

## Entry Gates

| Gate | Required evidence | Status |
| --- | --- | --- |
| Branch | `godot-v0.5-playable-art-pack` | 通过：observed |
| Scope | Godot/docs paths only | 通过：final Git diff/status checks showed no Electron Legacy paths |
| Art documentation | v0.5 direction, pipeline, manifest, master/Area 09, and agent-loop docs agree | 通过：updated for implemented v0.5 |
| Code approval | User confirms exact v0.5 implementation plan | 通过：user said `确认实施v0.5` |
| Release approval | User approves commit, push, main merge, and tag | 通过：user said `验收通过,允许提交push,并且合并main,打上对应标签,之后更新文档` |

## Visual Acceptance Matrix

| Requirement | Passing evidence | Status |
| --- | --- | --- |
| Cat | Clear cat silhouette, facing/movement feedback, intact collision | 部分通过：imported cat texture and cat scene load passed; visible movement observation 未验证 |
| Office props | Pond, board, shelf, desk, door, spawn recognizable and reachable | 部分通过：static props implemented and main scene starts; visible reachability observation 未验证 |
| Fish | Eight bestiary/result visual states, lock/unlock and rarity distinction | 通过：temporary Godot validation verified 8 result previews and 8 bestiary cards |
| UI | HUD/modal/button hierarchy reads as game UI at 1280×720 | 部分通过：HUD loads and dynamic UI methods pass; screenshot/manual hierarchy 未验证 |
| Fishing | Start/wait/bite/success/failure/rare feedback visibly differs | 部分通过：status icon/color paths executed; manual timing observation 未验证 |
| Boss | Pressure and inspection warning visibly differs | 部分通过：warning icon/color path executed; manual inspection observation 未验证 |
| Asset status | Manifest paths/statuses are accurate; no false final claim | 通过：manifest records imported/placeholder_plus/missing only; final count 0 |
| Regression | v0.4 loop/data/save work and Electron Legacy is unchanged | 部分通过：main start, data counts, and scoped diff checks pass; keyboard/manual save regression 未验证 |

## Required Commands

| Command | Expected result | Status |
| --- | --- | --- |
| `godot --version` | Godot 4.x recorded | 通过：`4.7.stable.official.5b4e0cb0f` |
| `godot4 --version` | Godot 4.x recorded | 通过：`4.7.stable.official.5b4e0cb0f` |
| `godot --headless --path godot --editor --quit` | Imports/scripts parse | 通过 |
| `godot --headless --path godot --quit-after 180` | Main scene starts | 通过 |
| Temporary Godot validation script | 8 fish resources/result previews/bestiary cards load | 通过；script deleted after run |
| JSON parse | 8 fish / 3 quests / 3 shop upgrades | 通过 |
| Debug marker search | No debug/TODO markers in Godot scripts/scenes | 通过 |
| Git status/diff checks | Scoped, clean whitespace diff | 通过：`git diff --check` passed; `git status --short` shows Godot/docs scope only |

## Push Gate

Gate satisfied on 2026-06-25. Release actions completed:

- Feature commit: `1f28e2b`
- Main merge commit: `04412b2`
- Tag: `godot-v0.5-stable`
- Remote: branch, `main`, and tag pushed to `origin`
