# AREA 02 — Cat Control

**Master link:** [GAME_MASTER_PLAN](../GAME_MASTER_PLAN.md) · **Acceptance:** [ACCEPTANCE](../../../docs/agent-loop/ACCEPTANCE.md)

## Area Name

Cat Control.

## Purpose

Provide reliable WASD/arrow movement and exactly one obvious nearby interaction target.

## Current State

`PlayerCat` moves with `CharacterBody2D`; `InteractionDirector` selects the nearest interaction; HUD displays the prompt. The cat has a lightweight facing marker.

## Problems

- The current active interactable does not have a strong world-space focus indicator.
- Prompt clarity depends on the HUD alone when points sit near each other.

## v0.3 Tasks

- Keep movement speed at a readable office scale.
- Visually distinguish the nearest interaction target while preserving one-target-only E handling.
- Keep HUD prompt synchronized with the nearest selected target and lightweight direction feedback.

## Forbidden Scope

- No complex animation, collision overhaul, pet system, or multi-target interaction menu.

## Related Files

- `godot/scripts/cat.gd` and `godot/scenes/cat.tscn` — movement and facing feedback.
- `godot/scripts/systems/interaction_director.gd` — nearest-target ownership.
- `godot/scripts/interactables/world_interactable.gd` and scene — target focus visual.
- `godot/scripts/main.gd`, `godot/scripts/hud.gd` — input routing and prompt display.

## Acceptance Checklist

- [ ] WASD and arrow keys move the cat.
- [ ] Moving near different objects changes the prompt and focus.
- [ ] One E press dispatches only the current nearest object's action.

## Evidence Needed

- Godot runtime validation of movement and nearest selection.
- Manual/screenshot evidence for focus feedback; otherwise mark 未验证.
