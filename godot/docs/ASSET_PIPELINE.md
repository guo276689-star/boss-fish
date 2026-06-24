# Boss Fish v0.4 Asset Pipeline

## Purpose and Boundary

This pipeline turns reviewed source art into Godot-ready pixel assets. It applies only to `godot/assets/`; root `assets/` remains an untouched legacy/source-candidate location. Do not import a source just because it exists.

## Directory and Naming Contract

```text
godot/assets/
  characters/       # approved or imported cat sprites
  fish/              # 96x64 fish cells and fish placeholders
  environment/      # pond, board, shelf, desk, door, blockout pieces
  ui/                # panel, button, alerts, fishing feedback
```

- Lowercase `snake_case` only: `fish_moyu_goldfish.png`, `ui_boss_warning.png`.
- One asset family per directory; source files, exports, reference screenshots, and failed generations stay outside `godot/assets/`.
- `*_placeholder.*` is reserved for deliberately temporary assets. Never label a final asset as placeholder or vice versa.
- The source filename and source location belong in [ASSET_MANIFEST](ASSET_MANIFEST.md).

## Intake Flow

1. **Brief**: use [ART_DIRECTION](ART_DIRECTION.md) and specify asset ID, size, palette role, intended scene, and placeholder/final target.
2. **Create or obtain**: Pixelorama is the preferred pixel-production tool. Gemini or another generator may provide references/candidates only; human-made assets follow the same review.
3. **Normalize**: crop transparent padding, remove antialiasing, align to the target cell, ensure transparency, and name the file.
4. **Inspect before copy**: reject oversized originals, failed variants, full backgrounds, hidden text, blurred edges, and unrelated source dumps.
5. **Import into Godot**: copy only the selected normalized PNG/WebP into the appropriate `godot/assets/` folder, add a manifest entry with status `imported`, and wait for Godot import.
6. **Wire minimally**: reference the asset from its owning scene or HUD component; do not put catalog mappings into unrelated game systems.
7. **Validate**: inspect import filtering and run the game at 1280×720. Upgrade to `final` only after human art review.

## Godot Import Requirements

- Project default: `textures/canvas_textures/default_texture_filter=0` (nearest) in `project.godot`.
- `godot/.gitattributes` must mark PNG/WebP/JPEG/GIF as `-text`; binary textures must never pass through Git newline conversion.
- Texture importer: use nearest filtering; disable mipmaps for sprite/UI pixel assets unless a reviewed exception needs them.
- Keep compression/lossless settings appropriate to the accepted source; do not introduce blur to reduce file size.
- Display only at integer scale. Do not use fractional `Sprite2D.scale` or `TextureRect` stretch that blurs pixels.

### Manual Blur Check

1. Select the imported texture in Godot and open the Import dock.
2. Confirm filter is nearest/default-nearest and mipmaps are disabled for 2D pixel art.
3. Reimport, then inspect the asset in the running 1280×720 game.
4. Check outline pixels, transparent edges, and a one-pixel color transition at 100% and intended integer scale.
5. If any edge is soft, inspect for linear filtering, fractional scale, source antialiasing, or a bad import; mark the manifest item `imported` or `missing`, not `final`.

## Source and Status Recording

Every asset needs an entry in [ASSET_MANIFEST](ASSET_MANIFEST.md):

- `asset_id`, Godot destination path, `current_status`, `used_by`, and review/source notes.
- `placeholder`, `imported`, `final`, and `missing` are the only status values.
- A root candidate is still `missing` for Godot until it is copied, imported, and recorded as `imported`.

## Existing Candidate Review

The repository currently has 16 root candidates under `assets/images/fish/`, each measured at 96×64. For v0.4, only `carp.png` and `catfish.png` were copied as isolated test imports for `badge_carp` and `ppt_catfish`. Their Godot paths and source notes are recorded as `imported` in the manifest; they are not final art. The remaining root candidates are still not Godot assets.

## Tooling Reference Workflow

- **Godot official demo projects**: reference real `project.godot` and scene organization patterns; do not copy unrelated gameplay code.
- **Godot best practices**: preserve Scene/Node responsibility, small scripts, and project organization boundaries.
- **Pixelorama**: recommended for pixel production and transparent-canvas export.
- **GodotMaker**: reference only its GDD → Task → Implement → Test → Screenshot → Evaluate → Fix loop; it is not a dependency.
- **GUT / GdUnit4**: future test options; v0.4 does not add either framework.
- **Godot Export Action**: future packaging option; v0.4 does not add it.

## Rejection Rules

- Do not commit raw `.pxo`, PSD, oversized source renders, failed generations, batch dumps, or assets unused by a scene.
- Do not overwrite a reviewed asset with a candidate.
- Do not use an AI full-background image or treat generated output as final without normalization and human approval.
