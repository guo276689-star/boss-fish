# Godot 重启线参考映射（v0.2）

## 不迁移原则

Godot v0.2 只保留主题和玩法概念，不移动 Electron 源码。Godot 项目不调用 Legacy 的 HTML、Canvas、Electron IPC、`main.js`、`preload.js`、`src/` 模块或 localStorage 键。

| Legacy 概念 | Godot v0.2 处理 | 边界 |
| --- | --- | --- |
| 办公室摸鱼、猫咪、鱼塘 | 重新实现 | Godot Scene/Node 与 GDScript。 |
| 鱼类文案与办公室梗 | 重新整理 | `godot/data/fish.json`，不读取 Legacy 数据。 |
| 钓鱼和金币 | 重新实现 | `FishingSystem` 与 `GameState`。 |
| 今日小委托、图鉴、商店 | 重新实现 | 独立数据和状态方法，不复制 JS 模块。 |
| 老板压力 | 轻量重做 | 定时巡查，无 AI、战斗或潜行系统。 |
| 存档 | 独立实现 | Godot `user://` JSON，不兼容也不读取 localStorage。 |
| Canvas、迷你窗口、报表模式 | 保留 Legacy | 不进入 Godot 主线。 |

## Electron Legacy 保护

本里程碑不修改根目录 Electron 入口、`src/`、`styles/`、`data/`、`assets/` 或 localStorage。任何后续 Legacy 维护必须作为明确独立任务处理。
