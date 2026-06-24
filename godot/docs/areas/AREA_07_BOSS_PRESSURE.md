# AREA 07 — Boss Pressure

**Master link:** [GAME_MASTER_PLAN](../GAME_MASTER_PLAN.md) · **Acceptance:** [ACCEPTANCE](../../../docs/agent-loop/ACCEPTANCE.md)

## Area Name

Boss Pressure.

## Purpose

Make the title theme visible: repeated fishing escalates pressure, a high-pressure warning appears, inspection interrupts fishing, and play resumes afterwards.

## Current State

Fishing starts and successful catches add pressure; `BossPressure` warns at 60, starts a timed inspection at 100, interrupts fishing, then resets to 25.

## Problems

- Pressure severity and inspection state need stronger HUD/world feedback.
- Boss-zone panel must still open while inspection is active.

## v0.3 Tasks

- Strengthen normal, warning, and inspection feedback with lightweight text/color/blockout cues.
- Ensure inspection messaging and boss information remain accessible and recovery is explicit.

## Forbidden Scope

- No complex AI, combat, stealth system, or persistent punitive economy.

## Related Files

- `godot/scripts/systems/boss_pressure.gd` — pressure thresholds and inspection lifecycle.
- `godot/scripts/systems/fishing_system.gd` — interruption dependency.
- `godot/scripts/main.gd` — routes pressure signals.
- `godot/scripts/hud.gd`, `godot/scenes/hud.tscn`, `godot/scenes/main.tscn` — feedback only.

## Acceptance Checklist

- [ ] Repeated fishing raises pressure and reaches warning/inspection states.
- [ ] Inspection interrupts or prevents fishing.
- [ ] After inspection ends, fishing can resume.
- [ ] HUD and boss door text reflect the active pressure state.

## Evidence Needed

- Headless inspection lifecycle validation.
- Godot visual inspection of warning/inspection feedback, or 未验证.
