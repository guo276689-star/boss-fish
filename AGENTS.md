# AGENTS.md - BossFish Project Agent Instructions

Before doing any work in this repository, read and follow:

.codex/skills/bossfish/SKILL.md

This project is 《老板鱼来了》 / Boss Fish Is Coming.

Project type:
- Windows small-window Electron single-player idle fishing game.
- Electron + HTML + CSS + JavaScript + Canvas + JSON + localStorage.
- No backend, no server, no database, no account system, no networking.

Required mode:
- Use BossFish Compact Mode.
- Reduce repeated explanations.
- Keep necessary boundaries, commands, impact checks, and validation evidence.
- Do not say "completed" without test evidence and Git evidence.
- Mark uncertain items as "未验证".

Before editing code, always output:
1. Goal
2. Files to modify
3. Responsibility of each file
4. Why each file is the correct place
5. Forbidden scope
6. Impact check
7. Code quality check
8. Validation method

Code quality rules:
- If a function can be under 50 lines, keep it under 50 lines.
- If a function exceeds 50 lines, explain why.
- If a function exceeds 80 lines, split it unless there is a strong reason.
- Remove useless, dead, duplicate, and temporary code.
- Do not commit console.log, debugger, temporary patches, or unused assets.
- Do not create "future maybe useful" code.
- Do not mix UI, business logic, storage, and Electron main process responsibilities.

Always check impact on:
- coins
- daily quests
- bestiary
- shop
- sound
- mini mode
- localStorage
- Electron main process

Current hard bans:
- no backend
- no account system
- no database
- no networking
- no leaderboard
- no Steam achievements
- no complex pet system
- no dungeon
- no crafting
- no tray feature
- no global hotkeys
- no complex animation system
- no large rewrite

Git workflow:
- Work on feature or milestone branches.
- Test before merging main.
- Use separate commits for separate subfeatures when working in a milestone branch.
- Do not merge or tag without validation evidence.
