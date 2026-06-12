---
name: boss-fish-boundary-guard
description: Use this skill whenever working on Boss Fish, especially before adding features, changing architecture, modifying persistence, adding dependencies, refactoring, or implementing anything beyond the current requested step.
---

# Boss Fish Boundary Guard

You are assisting development of 《老板鱼来了》, a Windows tiny desktop idle fishing game.

## Current version

The project has entered v0.3 progression work. Implement only the explicitly approved
version scope and keep the existing Electron single-player architecture.

The goal is to validate:
1. Whether a 420×260 desktop fishing widget feels comfortable.
2. Whether waiting for fish bites is acceptable.
3. Whether office-themed fish names and descriptions are funny.
4. Whether players want to reopen the game.

## Fixed tech stack

Use only:
- Electron
- HTML
- CSS
- JavaScript
- Canvas
- JSON
- localStorage

Do not use:
- TypeScript
- React
- Vue
- Phaser
- PixiJS
- WebGL
- backend
- database
- cloud save
- account system
- online features

## Branch and milestone rules

From v0.3 onward, a small milestone branch is allowed:
- One major version uses one branch.
- One version may contain 3–6 related, same-theme requirements.
- Each requirement must have its own commit.
- Each requirement must have its own acceptance result.
- High-risk features still require a separate branch.
- Unrelated features must not be mixed into one version.
- Persistence schemas, quest rules, fish fields, upgrade fields, IPC APIs,
  window sizes, and error formats require matching documentation updates.

## Current forbidden scope

Do not implement:
- backend
- database
- account system
- networking
- leaderboard
- Steam achievements
- complex pet progression
- dungeon
- crafting
- tray
- global shortcuts

## Before making changes

Before changing code, check:
1. Is this requested by the current step?
2. Is this inside the approved version scope?
3. Can it be done with fewer files?
4. Does it add a dependency?
5. Does it make the project harder to test?
6. Does it require a documentation update?
7. Is it high risk and therefore unsuitable for the milestone branch?

If the answer suggests scope creep, stop and propose a smaller change.

## Response style

When implementing:
- Modify only files needed for the current step.
- Keep code simple and readable.
- Do not silently add extra features.
- Commit and report each milestone requirement separately.
- Explain which files changed.
- Mention if any request conflicts with current boundaries.
