# 《老板鱼来了》Godot Reboot GDD（v0.2）

## 产品与路线

Godot Mainline 是当前主线：1280×720 的单机 2D 像素办公室摸鱼游戏。Electron 小窗口版本保留为冻结的 Legacy；Godot 不读取或迁移 Electron JavaScript、主进程或 localStorage。

v0.2 的目标是一个可重复游玩的短局：猫咪在办公室内移动，在鱼塘完成一轮有风险的钓鱼，鱼获推进委托、图鉴和金币，再以商店升级缩短下一次摸鱼成本。连续摸鱼会提高老板压力并触发巡查。

## 十分钟循环

1. 猫咪使用 WASD 或方向键探索办公室；最近的互动点显示唯一 E 键提示。
2. 在鱼塘按 E 开始钓鱼：`idle → casting → waiting → bite → caught → result`。
3. 上钩后按 E 或 Space 收竿；成功获得数据驱动的鱼与金币，超时则鱼跑掉。
4. 鱼获自动更新图鉴数量、三类固定小委托和本地存档。
5. 在任务板领取完成奖励，在补给站购买三项升级；升级影响等待时间、稀有权重或收竿窗口。
6. 每次摸鱼增加老板压力；100% 时巡查打断钓鱼并暂时禁止再次开钓，结束后压力降回安全值。

## 场景与交互

- `scenes/main.tscn`：办公室布局、碰撞边界、鱼塘、五个互动区域和系统编排节点。
- `Cat`：`CharacterBody2D` 移动、边界碰撞、朝向标记。
- `WorldInteractable`：鱼塘、任务板、图鉴柜、补给站、老板门共用的展示和交互半径；`InteractionDirector` 只选择最近目标。
- `HUD`：金币、压力、状态、提示、鱼获、委托、图鉴、商店和老板信息面板；HUD 发出按钮意图但不处理业务规则。

场景采用低噪点色块、简单节点和占位猫咪精灵，不依赖 AI 整图背景或复杂美术、动画系统。

## 数据与系统边界

| 位置 | 职责 |
| --- | --- |
| `data/fish.json` | 8 条鱼的 id、名称、稀有度、基础价格、描述、文案和权重。 |
| `data/quests.json` | 固定的数量、金币、稀有度三类小委托模板。 |
| `data/shop_upgrades.json` | 三项升级的等级、价格上限与效果参数。 |
| `systems/game_state.gd` | 数据加载、加权抽鱼、金币、图鉴、任务、升级与状态序列化。 |
| `systems/fishing_system.gd` | 钓鱼状态机、等待、上钩、成功、逃跑和结果。 |
| `systems/boss_pressure.gd` | 压力累计、阈值巡查与结束恢复。 |
| `systems/save_service.gd` | 独立 Godot `user://` JSON 存档读写和损坏回退。 |
| `systems/interaction_director.gd` | 最近互动点选择与提示。 |

`main.gd` 仅连接系统信号、输入路由和 UI 请求，不承载静态数据或领域规则。

## 存档边界

使用 `user://boss_fish_v0_2_save.json`，保存金币、已钓鱼计数、升级等级、任务进度/领奖状态和老板压力。解析失败、文件不存在或字段不合法时回退默认状态；不使用服务器、数据库、账号或 Electron localStorage。

## 非目标

- 不做联网、排行榜、账号、后端、数据库、Steam 成就或 GodotMaker。
- 不做复杂老板 AI、战斗、潜行、宠物、地牢、合成或动画系统。
- 音效由明确的视觉状态反馈占位；正式音频包不属于 v0.2。
