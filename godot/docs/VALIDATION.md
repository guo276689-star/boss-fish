# Godot v0.2 验收与验证记录

## 实际环境

- Godot：`4.7.stable.official.5b4e0cb0f`。
- 分支：`godot-v0.2-core-gameplay-loop`。
- 路线：Godot Mainline；Electron Legacy 未改动。

## 已执行证据

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| `godot --version`、`godot4 --version` | 通过 | 两个命令均输出 Godot 4.7 stable。 |
| `godot --headless --path godot --editor --quit` | 通过 | 最终导入无 GDScript 解析错误。首次发现交互距离变量类型推断错误，已修复并复跑通过。 |
| `godot --headless --path godot --quit-after 180` | 通过 | 主场景启动约 3 秒，无运行错误输出。 |
| 临时隔离 v0.2 validation test | 通过 | 输出 `V0_2_VALIDATION_PASS`；覆盖 WASD/方向键移动、5 个最近互动点、任务/图鉴/商店/老板面板、钓鱼成功与超时、巡查中断、8 条鱼、任务推进/防重复领奖、升级效果与存档重载。测试脚本已清理，真实 `user://` 存档已恢复。 |
| Godot 编辑器与 Debug 窗口 | 通过 | 已导入项目、可见办公室、鱼塘、任务板、图鉴柜、补给站、老板门、猫咪与 HUD；编辑器输出计数为 0 错误。 |
| `git diff --check` | 见最终报告 | 需要在提交前以仓库最终差异复跑。 |

## 功能验收矩阵

| 项目 | 状态 | 证据 / 边界 |
| --- | --- | --- |
| 办公室、鱼塘、任务板、图鉴柜、补给站、老板门布局 | 通过 | Debug 可见。 |
| 猫咪移动与朝向 | 通过（自动验证） | 临时验证脚本覆盖 WASD 和方向键回退；嵌入式 Debug 持续按键人工观察未验证。 |
| 最近互动点与差异提示 | 通过（自动验证） | 5 个 `WorldInteractable`、最近选择和对应 action 均由验证脚本覆盖；逐点人工按键观察未验证。 |
| 钓鱼状态、超时逃跑、收竿成功 | 通过（自动验证） | 验证脚本覆盖 `bite → result → idle` 及超时失败。 |
| 8 条鱼、加权稀有度、鱼获金币 | 通过（自动验证） | fish 数据与加权选择由验证脚本覆盖。 |
| 任务、领奖、防重复领取 | 通过（自动验证） | 三类委托、完成、重复领取拒绝均由验证脚本覆盖。 |
| 图鉴锁定与数量显示 | 通过（代码/场景验证） | HUD 从鱼目录和计数渲染；实际面板点击未验证。 |
| 商店与钓鱼参数效果 | 通过（自动验证） | 升级购买和 `wait_seconds_reduction` 在验证脚本中通过；实际面板点击未验证。 |
| 老板压力与钓鱼中断 | 通过（自动验证） | 阈值进入巡查与钓鱼中断均由验证脚本覆盖；实际完整四次钓鱼人工演示未验证。 |
| `user://` 存档与损坏回退 | 通过（自动验证） | 隔离重载验证金币、图鉴、升级、领奖状态；损坏文件人工演示未验证。 |
| 音效 | 未验证 | v0.2 采用视觉提示占位，未接入音频资源。 |
| Electron Legacy 回归运行 | 未验证 | 未启动 Legacy；Git 范围检查证明其路径未改。 |

## 提交前复验

```powershell
git status --short
git branch --show-current
git diff --name-status
git diff --check
godot --headless --path godot --editor --quit
godot --headless --path godot --quit-after 180
```

在有可稳定捕获持续按键的桌面环境中，应再人工执行：移动至每个互动点、完成一条成功钓鱼和一次超时、领一次任务奖励、买一次升级、重启后核对存档、连续钓鱼触发一次巡查。
