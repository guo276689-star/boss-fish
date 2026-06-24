# Boss Fish v0.4 Asset Manifest

**Status vocabulary:** `placeholder` / `imported` / `final` / `missing`. `final` requires human art approval; no v0.4 item is final by default.

| asset_id | path | current_status | used_by | notes |
| --- | --- | --- | --- | --- |
| `character.cat_player` | `godot/assets/cat_placeholder.svg` | placeholder | `scenes/cat.tscn` | Existing SVG placeholder; replace with reviewed pixel sheet later. |
| `fish.moyu_goldfish` | `godot/assets/fish/fish_moyu_goldfish.png` | missing | fishing result, bestiary | No mapped Godot candidate. |
| `fish.badge_carp` | `godot/assets/fish/fish_badge_carp.png` | imported | fishing result preview | Copied from root `assets/images/fish/carp.png`; 96×64, Godot import completed, not art-approved. |
| `fish.coffee_loach` | `godot/assets/fish/fish_coffee_loach.png` | missing | fishing result, bestiary | Uniform placeholder required until import. |
| `fish.ppt_catfish` | `godot/assets/fish/fish_ppt_catfish.png` | imported | fishing result preview | Copied from root `assets/images/fish/catfish.png`; 96×64, Godot import completed, not art-approved. |
| `fish.meeting_jellyfish` | `godot/assets/fish/fish_meeting_jellyfish.png` | missing | fishing result, bestiary | Root `assets/images/fish/jellyfish.png` is a candidate; not imported. |
| `fish.client_octopus` | `godot/assets/fish/fish_client_octopus.png` | missing | fishing result, bestiary | Root `assets/images/fish/octopus.png` is a candidate; not imported. |
| `fish.kpi_shark` | `godot/assets/fish/fish_kpi_shark.png` | missing | fishing result, bestiary | Root `assets/images/fish/shark.png` is a candidate; not imported. |
| `fish.boss_fish` | `godot/assets/fish/fish_boss_fish.png` | missing | fishing result, bestiary | No approved mapping; do not substitute root whale/shark silently. |
| `environment.pond` | node-composed in `scenes/main.tscn` | placeholder | office map | Polygon blockout, not final tile art. |
| `environment.task_board` | `scenes/interactables/world_interactable.tscn` | placeholder | TaskBoard | Shared blockout with task accent and explicit label. |
| `environment.bestiary_shelf` | `scenes/interactables/world_interactable.tscn` | placeholder | BestiaryShelf | Shared blockout with collection accent and explicit label. |
| `environment.shop_desk` | `scenes/interactables/world_interactable.tscn` | placeholder | ShopDesk | Shared blockout with support accent and explicit label. |
| `environment.boss_door` | node-composed in `scenes/main.tscn` | placeholder | BossZone | Polygon blockout; warning language lives in HUD. |
| `ui.panel` | node style in `scenes/hud.tscn` | placeholder | HUD modal and status panels | v0.4 must use one shared panel style family. |
| `ui.button` | runtime `Button` in `scripts/hud.gd` | placeholder | quest/shop/modal actions | v0.4 must apply the shared button style. |
| `ui.fish_result_popup` | `scenes/hud.tscn` + `scripts/hud.gd` | placeholder | fishing result | Text-first result until a reviewed fish asset is imported. |
| `ui.boss_warning` | `scenes/hud.tscn` + `scripts/hud.gd` | placeholder | pressure HUD / toast | Coral state treatment; no final icon asset. |
| `fishing.bobber` | `godot/assets/ui/fishing_bobber.png` | missing | future fishing feedback | Root `assets/images/bobber.png` is a candidate only; not imported. |
| `fishing.splash` | `godot/assets/ui/fishing_splash.png` | missing | future bite feedback | Requires a normalized isolated asset. |
| `fishing.bite_indicator` | `godot/assets/ui/fishing_bite_indicator.png` | missing | current status HUD | Current text is the uniform placeholder. |

## Manifest Checks

- Every path under `godot/assets/` must have one manifest row before commit.
- Root candidates are not imported assets and must never be called final.
- A missing item must have a uniform scene/UI fallback; a placeholder must be visibly deliberate.
- v0.4 current count: `placeholder` 10, `imported` 2, `final` 0, `missing` 9.
