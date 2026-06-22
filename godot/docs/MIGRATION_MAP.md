# Godot 重启线参考映射

## 原则

这是主题、数据经验和玩法概念的参考映射，不是 JavaScript 代码迁移计划。Godot 子项目不调用 Electron 页面、渲染进程、主进程或 localStorage，不把旧模块逐文件翻译为 GDScript。

| Electron 现有内容 | 决策 | Godot 处理方式 |
| --- | --- | --- |
| 《老板鱼来了》、办公室摸鱼、猫咪、鱼塘 | 保留 | 作为主线主题与世界观基础 |
| 办公室梗鱼名称与文案经验 | 保留并整理 | 重新建立 Godot 数据结构和统一命名 |
| 钓鱼、金币、今日小委托、图鉴、商店概念 | 分版本重做 | 按 v0.2～v0.4 的新交互和系统边界实现 |
| 老板压力主题 | 重做 | v0.5 设计为可读、可规避的巡查事件 |
| 猫咪视觉设定 | 重做 | 使用 Godot 角色控制、统一像素规格和正式动画 |
| Canvas 鱼塘、DOM UI、迷你窗口和报表模式 | 暂停 | 不迁移到 Godot v0.1，不作为新主线约束 |
| Electron 数值与存档 | 参考后重做 | 不直接复制经济数值，不读取 localStorage |
| Electron JavaScript、main/preload 和渲染模块 | 不迁移 | Godot 重新划分 Scene、Node、GDScript 和数据职责 |
| AI 像素图与帧动画尝试 | 仅作参考 | Gemini / FrameRonin 输出需重新统一像素规范后逐项评估 |

## 目录边界

- `godot/`：Godot 4.x 项目、场景、GDScript、数据与文档。
- 仓库根目录现有 Electron 文件：作为 Legacy 保持原状，只有明确维护任务才修改。
- 旧 `assets/` 与 `boss_fish_pixel_assets/`：本版本不复制、不批量导入。正式复用前需要逐项确认许可、尺寸、透明边缘和实际使用场景。

新功能默认进入 `godot/`。不再继续投入 Electron Canvas 贴图优化，除非任务明确属于 Legacy 维护。

## 存档边界

v0.1 金币只在运行时内存中存在。未来若增加 Godot 存档，应使用 Godot 用户目录中的独立版本化文件，不复用 Electron localStorage 键，也不假设旧存档结构兼容。

## 明确禁止

- 不删除 Electron Legacy。
- 不引入 GodotMaker。
- 不增加后端、账号、数据库、联网或排行榜。
- 不提交未使用大图、失败素材或临时转换文件。
- 没有验证证据不得声明迁移或重做完成；不确定项写“未验证”。
