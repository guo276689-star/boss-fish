# Decision Log

> 本文件按时间追加项目方向和人工审查决策。历史记录不得覆盖。Codex 可以记录用户已明确作出的决定，但不能自行批准提交、合并或 tag。

## Initial Decisions — 2026-06-22

1. **Electron Legacy**：Electron 小窗口版本冻结为 Legacy，旧代码、localStorage 和已有素材继续保留，必要时维护。
2. **Godot Mainline**：Godot 4.x 大屏 2D 像素版成为当前主线。
3. **默认开发目录**：新功能默认进入 `godot/`，除非 Goal 明确要求维护 Electron Legacy。
4. **Electron Canvas**：不再继续投入 Electron Canvas 贴图优化，明确的 Legacy 修复除外。
5. **GodotMaker 边界**：GodotMaker 只作为工作流参考，不作为项目依赖，不接入仓库。
6. **Agent Loop**：`docs/agent-loop/` 作为后续 Codex 工作协议，固定使用 Read → Plan → Implement → Run → Review → Fix → Report → Decision。
7. **Git 权限**：Codex 不自动合并 `main`，不自动打 tag；commit、push、merge 和 tag 均由用户决定。
8. **产品禁区**：不做后端、账号、数据库、联网或排行榜。

## Reference Principles

- Scene/Node 按 Godot 官方最佳实践保持职责清晰；Autoload 必须有明确全局生命周期和稳定边界。
- 使用真实 `project.godot` 和小型可运行 demo 学习结构，不复制无关系统。
- 参考 GodotMaker 的 GDD → Task → Implement → Test → Screenshot → Evaluate → Fix 循环，但由 BossFish Agent Loop 文档和人工决策落地。
- GUT / GdUnit4 作为后期测试候选，Godot reboot v0.1 不强制接入。
- Godot Export Action 作为后期导出候选，Godot reboot v0.1 不接入。

## Decision States

- `APPROVED`：用户批准本轮结果；不等于已经提交或合并。
- `REVISION_REQUIRED`：需要修复失败项或补充证据。
- `REJECTED`：本轮方案或结果不接受。
- `STOPPED`：本轮终止。
- `PENDING`：等待报告、截图、人工体验或用户决定。

## Append Template

```text
### Decision YYYY-MM-DD-序号

- Goal：...
- Current Branch：...
- Reviewer：ChatGPT 项目大脑 / 用户
- Codex Report：...
- Screenshot / Manual Feedback：... / 未验证
- Decision：APPROVED / REVISION_REQUIRED / REJECTED / STOPPED / PENDING
- Reason：...
- Failed Items：...
- Unverified Items：...
- Approve Commit：是 / 否 / 未决定
- Approve Push：是 / 否 / 未决定
- Approve Merge Main：是 / 否 / 未决定
- Approve Tag：是 / 否 / 未决定
- Next Step：...
- Next Goal：... / 未定义
```

### Decision 2026-06-24-01

- Goal：Godot v0.3 MD-driven polish — linked planning system followed by scoped playable polish.
- Current Branch：`godot-v0.3-md-driven-polish`
- Reviewer：用户
- Codex Report：[v0.3 report](CODEX_REPORT.md)
- Screenshot / Manual Feedback：未验证
- Decision：PENDING
- Reason：用户已下发 Goal；文档控制体系正在建立，代码实现必须先经过 BossFish 预修改方案确认。
- Failed Items：无；运行时验证尚未开始。
- Unverified Items：Godot 导入、运行、视觉交互、存档迁移与全量回归。
- Approve Commit：否
- Approve Push：否
- Approve Merge Main：否
- Approve Tag：否
- Next Step：完成文档交叉链接，输出精确实现方案并等待确认。
- Next Goal：未定义

### Decision 2026-06-24-02

- Goal：Godot v0.4 visual identity and art pipeline.
- Current Branch：`godot-v0.4-visual-identity`
- Reviewer：用户
- Codex Report：[v0.4 report](CODEX_REPORT.md)
- Screenshot / Manual Feedback：未验证
- Decision：PENDING
- Reason：用户要求以低噪点 blockout、资产清单、import 规则和 UI 统一推进视觉方向；最终手绘美术不在本轮范围。
- Failed Items：无；实现和运行验证尚未开始。
- Unverified Items：Godot 运行、视觉观察、v0.3 回归、候选鱼素材导入与 filter 检查。
- Approve Commit：否
- Approve Push：否
- Approve Merge Main：否
- Approve Tag：否
- Next Step：完成 Art MD 交叉检查，输出精确场景/UI实现方案并等待确认。
- Next Goal：未定义

### Decision 2026-06-24-03

- Goal：在 v0.4 分支补齐未实施的 v0.3 runtime polish，并同时完成 v0.4 视觉统一。
- Current Branch：`godot-v0.4-visual-identity`
- Reviewer：用户
- Codex Report：[combined v0.3/v0.4 report](CODEX_REPORT.md)
- Screenshot / Manual Feedback：未验证；Windows app-control native pipe unavailable。
- Decision：PENDING
- Reason：自动导入、启动和核心回归已通过；需要用户在真实窗口验收视觉层级、输入、面板和存档体验。
- Failed Items：headless viewport capture 不可用（dummy renderer 无可读纹理）；非游戏运行失败。
- Unverified Items：人工视觉、实时键盘、所有面板点击、物理损坏存档、音效。
- Approve Commit：否
- Approve Push：否
- Approve Merge Main：否
- Approve Tag：否
- Next Step：用户执行手动验收；通过后使用 Push Gate 口令。
- Next Goal：未定义

### Decision 2026-06-25-01

- Goal：Combined Godot v0.3 runtime recovery and v0.4 visual identity pipeline.
- Current Branch：`godot-v0.4-visual-identity`
- Reviewer：用户
- Codex Report：[combined v0.3/v0.4 report](CODEX_REPORT.md)
- Screenshot / Manual Feedback：用户验收通过；Codex 截图未归档。
- Decision：APPROVED
- Reason：用户已确认场景、UI、互动、钓鱼、任务、商店、巡查和存档体验通过，并授权提交推送。
- Failed Items：无已知阻塞项。
- Unverified Items：物理损坏存档演示、音效；不阻塞本轮用户验收。
- Approve Commit：是
- Approve Push：是
- Approve Merge Main：否
- Approve Tag：否
- Next Step：执行 Git 缓存检查、提交并推送当前分支。
- Next Goal：未定义

### Decision 2026-06-25-02

- Goal：Combined Godot v0.3 runtime recovery and v0.4 visual identity pipeline.
- Current Branch：`godot-v0.4-visual-identity`
- Reviewer：用户
- Codex Report：[combined v0.3/v0.4 report](CODEX_REPORT.md)
- Screenshot / Manual Feedback：用户验收通过；Codex 截图未归档。
- Decision：APPROVED
- Reason：功能提交 `958f76a` 已推送至目标分支。
- Failed Items：无。
- Unverified Items：物理损坏存档演示、音效；不阻塞用户验收。
- Approve Commit：已执行
- Approve Push：已执行
- Approve Merge Main：否
- Approve Tag：否
- Next Step：等待后续 Goal。
- Next Goal：未定义

### Decision 2026-06-25-03

- Goal：Correct mainline PNG Git attributes before the approved merge/tag push.
- Current Branch：`main`
- Reviewer：Codex validation evidence
- Codex Report：[combined v0.3/v0.4 report](CODEX_REPORT.md)
- Screenshot / Manual Feedback：不适用。
- Decision：REVISION_REQUIRED
- Reason：mainline verification exposed ASCII conversion of PNG files under `godot/.gitattributes`; Godot could not preload fish assets.
- Failed Items：PNG import and HUD script compilation before correction。
- Unverified Items：无新增功能验收项。
- Approve Commit：用户已授权
- Approve Push：用户已授权
- Approve Merge Main：已执行本地合并
- Approve Tag：等待修复验证后执行
- Next Step：提交二进制属性和重新导入元数据修复，复跑 Godot，再推送 main 和标签。
- Next Goal：未定义
