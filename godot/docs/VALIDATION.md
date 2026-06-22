# Godot v0.1 验收标准

## 完成门槛

只有以下项目都有对应证据时，Godot v0.1 才能声明完成：

1. Godot 4.x 可以导入 `godot/project.godot`，无脚本解析或资源导入错误。
2. 主场景可以运行并保持 16:9 显示。
3. 猫咪可以使用 WASD 和方向键移动，碰撞行为符合场景边界。
4. 猫咪靠近鱼塘互动点后，HUD 显示可交互提示。
5. 按 E 可以触发至少一次简化钓鱼，并获得明确鱼类结果。
6. HUD 显示金币、当前提示和钓鱼结果，金币结算与数据一致。
7. 停止并重新运行后的状态符合 v0.1“无持久化存档”边界。
8. Electron Legacy 文件、启动入口、localStorage 结构和现有素材未被破坏。

## 必需证据

- Godot 版本号与项目导入结果。
- 实际运行日志或人工验收记录。
- 猫咪移动、FishingSpot 互动、一次钓鱼和 HUD 更新的逐项结果。
- `git diff --name-status` 与 `git diff --check` 输出。
- 差异范围检查，证明没有无关 Electron Legacy 修改。

没有运行证据时，不得写“测试通过”或“完成”；对应项目必须标记 **未验证**。没有截图或人工观察时，不得声称 UI 正常。

## 建议验收步骤

1. 执行 `godot --version` 或 `godot4 --version`，记录实际命令和版本。
2. 用 Godot 4.x 项目管理器导入 `godot/project.godot`。
3. 确认主场景为 `res://scenes/main.tscn`，检查输出面板无解析错误。
4. 运行项目，观察办公室、鱼塘、猫咪、金币和提示 HUD。
5. 分别使用 WASD 与方向键移动，检查边界和鱼塘碰撞。
6. 靠近 FishingSpot，确认提示出现；按 E，确认产生鱼类结果和金币变化。
7. 离开互动范围，确认提示恢复；重新运行，确认金币按 v0.1 规则重置。
8. 单独启动 Electron Legacy 并执行相关回归；若本里程碑未执行，则明确标记 **未验证**。

## 静态检查

在仓库根目录执行：

```powershell
Get-Content -Raw -Encoding UTF8 .\godot\data\fish.json | ConvertFrom-Json
git diff --name-status
git diff --check
git status --short --branch
```

同时检查：

- 差异是否符合当前里程碑与目标路线。
- 是否意外修改 Electron Legacy。
- 是否包含调试输出、断点语句、临时补丁、失败素材或无用大图。
- Scene/Node/GDScript 是否保持职责分离。

## 当前验证状态

本仓库现有记录显示当前环境未找到 `godot` 与 `godot4` 命令。Godot 项目导入、实际运行、猫咪移动、鱼塘互动、简化钓鱼与 HUD 视觉结果均为 **未验证**，需要在安装 Godot 4.x 的环境按上述步骤复验。
