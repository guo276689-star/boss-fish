# 《老板鱼来了》

> 当前主开发方向已经切换为 **Godot 4.x 大屏 2D 像素游戏**。原 Windows 小窗口 Electron 版冻结为 **Electron Legacy 原型**，继续保留，但不再作为默认新功能开发方向。

## 项目双线状态

| 路线 | 状态 | 目录 | 定位 |
| --- | --- | --- | --- |
| Godot Mainline | 当前主线 | `godot/` | 玩家操控猫咪，在办公室鱼塘移动、互动、钓鱼、完成摸鱼任务并收集打工梗鱼 |
| Electron Legacy | 冻结原型 | 仓库根目录、`src/`、`styles/`、`data/`、`assets/` | 保留已完成的小窗口放置玩法，必要时维护，不再默认扩展 |

新功能默认进入 `godot/`。只有任务明确要求维护 Electron Legacy 时，才修改旧 Electron 代码。

## Godot Mainline

核心关键词：

- Godot 4.x、大屏 16:9、2D 像素游戏
- 可操控猫咪、办公室摸鱼、鱼塘互动
- 打工鱼收集、金币、今日小委托、图鉴、商店
- 后续加入老板巡查压力事件

Godot 版从运行时、场景和玩法结构重新实现，不迁移旧 JavaScript 代码。当前 v0.1 目标是可控猫咪、办公室鱼塘互动、一次简化钓鱼和基础 HUD；实际 Godot 运行结果 **未验证**。

路线图见 [`docs/project-roadmap.md`](docs/project-roadmap.md)，设计与验收文档见 [`godot/docs/`](godot/docs/)。

## Electron Legacy

Electron 版已经形成可保留的原型能力：

- 420×260 小窗口、迷你模式和 Canvas 鱼塘
- 钓鱼、金币、localStorage 存档
- 图鉴、商店、今日小委托
- 猫猫反应、音效、报表伪装模式
- AI 像素素材与帧动画方向尝试

Legacy 规则：

- 不删除旧代码、旧存档逻辑和已有素材。
- 除非明确维护 Legacy，不再投入 Electron Canvas 贴图优化或继续扩展旧玩法。
- Legacy 修复仍需遵守原模块分层、存档兼容和回归验收规则。

## 美术原则

Gemini / FrameRonin 产出的素材可以作为构图、题材和气氛参考，但不能直接决定 Godot 主线的最终视觉。Godot 美术需要重新统一像素尺寸、调色板、轮廓、动画帧、透明边缘和导入过滤规范；不批量提交未使用大图、失败稿或临时素材。

## 技术边界

- 不引入 GodotMaker。
- 不做后端、服务器、账号、数据库、联网、排行榜或云存档。
- 不把 Electron JavaScript 平移为 GDScript。
- 没有运行、人工观察和 Git 证据时，不得宣称功能完成；不确定项必须标记“未验证”。

## 运行入口

Godot Mainline：使用 Godot 4.x 导入 `godot/project.godot`。当前环境的 Godot 版本和运行结果 **未验证**。

Electron Legacy：

```bash
npm install
npm start
```

Electron Legacy 的 UI、声音和完整回归在本次方向文档调整中 **未验证**。

## Electron 历史版本

| 版本 | 历史状态 |
| --- | --- |
| v0.2.1 | 轻音效实现 |
| v0.2.2 | AI 像素静态素材接入 |
| v0.2.3 | 小窗口可读性优化 |
| v0.2.4 | 今日委托模板扩展 |
| v0.2.5 | 文案与体验打磨 |
| v0.3-progression-pack | 等级、图鉴详情、徽章和商店说明等进度系统尝试；未作为 Godot 主线基础 |
