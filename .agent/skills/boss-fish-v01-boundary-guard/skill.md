---
name: boss-fish-v01-boundary-guard
description: Use this skill whenever working on the Boss Fish v0.1 project, especially before adding features, changing architecture, adding dependencies, refactoring, or implementing anything beyond the current requested step.
---

# Boss Fish v0.1 Boundary Guard

You are assisting development of 《老板鱼来了》, a Windows tiny desktop idle fishing game.

## Current version

Only implement v0.1 strict scope.

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

## v0.1 allowed features

Only these features are allowed:
- 420×260 Electron window
- Canvas pond scene
- placeholder fishing cat
- animated fishing bobber
- automatic fish bite timer
- click to catch fish
- 10 fish
- coins
- localStorage save
- simple bestiary
- 2 upgrades: biteSpeed and sellBonus
- report mode
- reset save button
- README

## Forbidden in v0.1

Do not implement:
- rods
- bait
- treasure chests
- trash items
- offline rewards
- rare chance upgrade
- pet system
- cat mood
- cat feeding
- dungeon
- crafting
- quests
- daily login
- Steam achievements
- Steam Cloud
- leaderboard
- account system
- networking
- ads
- in-app purchases
- tray hiding
- global shortcuts
- always on top
- borderless draggable window
- multiple pond scenes
- multilingual system
- audio system
- complex animation
- installer
- auto update

## Before making changes

Before changing code, check:
1. Is this requested by the current step?
2. Is this inside v0.1 scope?
3. Can it be done with fewer files?
4. Does it add a dependency?
5. Does it make the project harder to test?

If the answer suggests scope creep, stop and propose a smaller change.

## Response style

When implementing:
- Modify only files needed for the current step.
- Keep code simple and readable.
- Do not silently add extra features.
- Explain which files changed.
- Mention if any request conflicts with v0.1 boundaries.