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
