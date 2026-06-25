# Boss Fish Godot v0.3 — MD-Driven Polish Master Plan

## Version Positioning

**Godot v0.3 MD-driven polish version**. This release turns the v0.2 playable loop into a clearer, more stable demonstration build. It improves readability, control feedback, and validation evidence without adding a new gameplay pillar.

## Master Goal

- Make the office layout and five existing interaction areas immediately recognizable.
- Make player state, fishing state, rewards, pressure, and panel actions legible at the moment they matter.
- Keep the v0.2 loop intact: movement, fishing success/failure, coins, quests, bestiary, shop, boss pressure, and Godot save/reload.
- Drive every change and acceptance result from the linked area documents below.

## Linked Area Ownership

| Area | Responsible scope | v0.3 result | Owner documents |
| --- | --- | --- | --- |
| 01 | Office map | Named, readable zones and clear travel paths | [AREA_01_OFFICE_MAP](areas/AREA_01_OFFICE_MAP.md) |
| 02 | Cat control | Single nearest target, readable prompt, responsive movement | [AREA_02_CAT_CONTROL](areas/AREA_02_CAT_CONTROL.md) |
| 03 | Fishing loop | Explicit state and result feedback | [AREA_03_FISHING_LOOP](areas/AREA_03_FISHING_LOOP.md) |
| 04 | Quest board | Clear progress, claimability, and claim lock | [AREA_04_QUEST_BOARD](areas/AREA_04_QUEST_BOARD.md) |
| 05 | Bestiary | Clear locked/unlocked collection reading | [AREA_05_BESTIARY](areas/AREA_05_BESTIARY.md) |
| 06 | Shop | Explicit cost, effect, insufficient-funds, and max-level states | [AREA_06_SHOP](areas/AREA_06_SHOP.md) |
| 07 | Boss pressure | Visible escalating pressure and recoverable inspection | [AREA_07_BOSS_PRESSURE](areas/AREA_07_BOSS_PRESSURE.md) |
| 08 | Save and UI | Robust save fallback, coherent panels, and control help | [AREA_08_SAVE_AND_UI](areas/AREA_08_SAVE_AND_UI.md) |

The goal, approval gates, and recorded evidence are maintained in [CURRENT_GOAL](../../docs/agent-loop/CURRENT_GOAL.md), [ACCEPTANCE](../../docs/agent-loop/ACCEPTANCE.md), [CODEX_REPORT](../../docs/agent-loop/CODEX_REPORT.md), and [VALIDATION](VALIDATION.md).

## System Dependencies

```text
CatControl ──> InteractionDirector ──> Main input routing ──> HUD prompt
                                          │
                                          ├──> FishingLoop ──> GameState ──> coins / quests / bestiary / save
                                          │        │                │
                                          │        └──> BossPressure ┘
                                          │
                                          ├──> QuestBoard <─────────┘
                                          ├──> Bestiary <───────────┘
                                          └──> Shop ──> FishingLoop parameters

SaveAndUI spans GameState, BossPressure, FishingLoop results, all panels, and help text.
```

## Delivery Order

1. **Read and plan**: inspect v0.2 code, record this master plan and area contracts.
2. **Implement**: make only the scoped scene/UI/control polish required by an area contract.
3. **Run**: import and start Godot 4.x, then run deterministic validation where feasible.
4. **Review and fix**: compare results with every area checklist; make minimal corrections only.
5. **Report and stop**: update the linked reports with actual evidence, unresolved items, and Git state. Do not commit, push, merge, or tag.

## v0.3 Implementation Update

The original v0.3 commit contained this Markdown control system but no runtime polish files. The missing scoped implementation is now present in the v0.4 working tree and is validated by the temporary `V0_3_V0_4_VALIDATION_PASS` run:

- nearest-target focus marker and action-specific interaction labels;
- explicit cast, wait, bite, success, and failure wording;
- consistent quest/shop/modal feedback and a boss panel that opens during inspection;
- v0.2 Godot save fallback migration to `user://boss_fish_v0_3_save.json`.

The visual portions of the v0.3 acceptance still require a runnable-screen observation and remain **未验证** until the user reviews them.

## v0.5 Playable Art Pack Extension

v0.5 does not add gameplay. It upgrades the cat, core office props, fish presentation, HUD/panels, fishing feedback, and boss warning through imported source candidates and `placeholder_plus` node compositions. Area 09 owns visual consistency; Areas 01–08 retain gameplay responsibilities and must pass regression validation.

Implementation status: the v0.5 art pack is implemented on `godot-v0.5-playable-art-pack` with one imported cat candidate, eight imported fish previews, node-composed office prop upgrades, and presentation-only HUD feedback. No fish data, economy rules, quests, shop rules, save structure, Electron Legacy path, backend, networking, export, merge, tag, or Git submission is part of this milestone before user acceptance.

## Scope Guardrails

- No Electron Legacy changes, including `src/`, `main.js`, `preload.js`, root `data/`, or root `assets/`.
- No backend, account, database, networking, leaderboard, Steam achievement, GodotMaker, new map, new fish catalog, complex TileMap, AI, combat, pet, dungeon, crafting, or complex animation system.
- Preserve the current static catalog: 8 fish, 3 quests, 3 upgrades.
- Keep `main.gd` as orchestration only; state, fishing, pressure, interaction, save, and HUD remain separate.

## Cross-Area Acceptance

| Invariant | Required proof |
| --- | --- |
| Five interactions remain reachable and singular | Area 01 + Area 02 validation |
| Fishing changes coins, quests, bestiary, pressure, and save correctly | Area 03 + Areas 04, 05, 07, 08 validation |
| Shop effects still reach fishing parameters | Area 03 + Area 06 validation |
| Inspection interrupts and later permits fishing | Area 03 + Area 07 validation |
| Existing save data remains loadable and malformed data falls back safely | Area 08 validation |
| Electron Legacy remains untouched | Git diff path evidence |

## Push Gate

Codex must not run `git commit`, `git push`, `git merge`, or `git tag` unless the user explicitly enters:

> 验收通过，允许提交并 push

Even after that phrase, Git checks must first confirm the working tree contains only this goal's changes.
