# Boss Fish v0.5 Asset Manifest

**Status vocabulary:** `placeholder` / `placeholder_plus` / `imported` / `final` / `missing`. `final` requires human art approval; no v0.5 item is final.

| asset_id | path | current_status | used_by | notes |
| --- | --- | --- | --- | --- |
| `character.cat_player` | `godot/assets/characters/cat_player_placeholder_plus.png` | imported | `scenes/cat.tscn` | Copied from root `assets/images/cats/idle-1.png`; 96×96, integer scale, non-final. |
| `fish.moyu_goldfish` | `godot/assets/fish/fish_moyu_goldfish.png` | imported | fishing result, bestiary | Copied from root `assets/images/fish/round.png`; 96×64, non-final. |
| `fish.badge_carp` | `godot/assets/fish/fish_badge_carp.png` | imported | fishing result, bestiary | Copied from root `assets/images/fish/carp.png`; 96×64, non-final. |
| `fish.coffee_loach` | `godot/assets/fish/fish_coffee_loach.png` | imported | fishing result, bestiary | Copied from root `assets/images/fish/eel.png`; 96×64, non-final. |
| `fish.ppt_catfish` | `godot/assets/fish/fish_ppt_catfish.png` | imported | fishing result, bestiary | Copied from root `assets/images/fish/catfish.png`; 96×64, non-final. |
| `fish.meeting_jellyfish` | `godot/assets/fish/fish_meeting_jellyfish.png` | imported | fishing result, bestiary | Copied from root `assets/images/fish/jellyfish.png`; 96×64, non-final. |
| `fish.client_octopus` | `godot/assets/fish/fish_client_octopus.png` | imported | fishing result, bestiary | Copied from root `assets/images/fish/octopus.png`; 96×64, non-final. |
| `fish.kpi_shark` | `godot/assets/fish/fish_kpi_shark.png` | imported | fishing result, bestiary | Copied from root `assets/images/fish/shark.png`; 96×64, non-final. |
| `fish.boss_fish` | `godot/assets/fish/fish_boss_fish.png` | imported | fishing result, bestiary | Copied from root `assets/images/fish/whale.png`; 96×64, non-final boss-fish stand-in. |
| `environment.pond` | node-composed in `scenes/main.tscn` | placeholder_plus | office map, fishing spot | Enhanced deck, frame, water, ripples, lily, and bobber marker. |
| `environment.cat_spawn_area` | node-composed in `scenes/main.tscn` | placeholder_plus | player spawn readability | Spawn mat and paw markers around the existing cat spawn; no collision or position change. |
| `environment.task_board` | node-composed in `scenes/main.tscn` | placeholder_plus | `TaskBoard` | Board, trim, pinned papers, pins, and paper line details. |
| `environment.bestiary_shelf` | node-composed in `scenes/main.tscn` | placeholder_plus | `BestiaryShelf` | Shelf, books, trim, and fish badge details. |
| `environment.shop_desk` | node-composed in `scenes/main.tscn` | placeholder_plus | `ShopDesk` | Desk shelves, goods, drawer, and coin marker. |
| `environment.boss_door` | node-composed in `scenes/main.tscn` | placeholder_plus | `BossZone` | Door frame, warning light, handle, and warning stripes. |
| `ui.panel` | node style in `scenes/hud.tscn` | placeholder_plus | HUD modal, status, pressure panels | Shared pixel-like panel family retained and strengthened with icon slots. |
| `ui.button` | runtime `Button` in `scripts/hud.gd` | placeholder_plus | quest/shop/modal actions | Existing shared button style remains scoped to HUD actions. |
| `ui.fish_result_popup` | `scenes/hud.tscn` + `scripts/hud.gd` | placeholder_plus | fishing result | Result modal now shows all eight imported fish previews. |
| `ui.bestiary_cards` | runtime cards in `scripts/hud.gd` | placeholder_plus | bestiary modal | 8-card grid with locked/unlocked and rarity distinction. |
| `ui.fishing_status` | `scenes/hud.tscn` + `scripts/hud.gd` | placeholder_plus | start/wait/bite/success/fail/rare feedback | Text, color, and icon feedback; no gameplay timing change. |
| `ui.boss_warning` | `scenes/hud.tscn` + `scripts/hud.gd` | placeholder_plus | pressure HUD / toast | Pressure icon changes color/symbol at warning threshold. |
| `fishing.bobber` | node-composed in `scenes/main.tscn` | placeholder_plus | pond/fishing area readability | Simple static bobber marker near the existing fishing interaction. |
| `fishing.splash` | `godot/assets/ui/fishing_splash.png` | missing | future bite feedback | Not required by v0.5; requires normalized isolated asset later. |

## Manifest Checks

- Every v0.5 imported PNG lives under `godot/assets/` and has a Godot `.import` file after editor import.
- Root source candidates were copied, not edited.
- `godot/.gitattributes` keeps image files binary via `*.png -text`.
- No asset is marked `final`.
- v0.5 current count: `imported` 9, `placeholder_plus` 13, `placeholder` 0, `final` 0, `missing` 1 future-only item.

## v0.5 Implementation Notes

- Cat collision and movement script are unchanged; only the `Sprite2D` texture changed from SVG placeholder to the imported 96×96 PNG.
- Fish data in `godot/data/fish.json` is unchanged. Visual mapping is maintained in `scripts/hud.gd`.
- Office props are static `Polygon2D`/`Label` composition in the main scene; interactable positions and collision shapes are unchanged.
- HUD visual feedback is presentation-only and does not change coins, quests, shop prices, boss pressure rules, or save data.
