# BossFish Agent Loop

## BossFish Agent Loop 是什么

BossFish Agent Loop 是《老板鱼来了》的固定开发工作协议。它把每轮工作拆成目标、计划、实现、运行、审查、修复、报告和决策，确保 Codex 只在明确范围内执行，并用可复查证据交付结果。

Agent Loop 不替代 `AGENTS.md` 或 `.codex/skills/bossfish/SKILL.md`。每轮开始时仍必须先读取仓库规则，再读取本目录中的当前 Goal 和验收标准。

## 角色分工

### ChatGPT 项目大脑

- 定义版本目标和本轮 Goal。
- 拆分修改范围、交付物和禁止事项。
- 在执行前确定验收标准和证据要求。
- 审查 `CODEX_REPORT.md` 的通过项、失败项、未验证项和 Git 证据。
- 根据报告与用户反馈决定是否进入下一轮。

### Codex 执行者

- 读取 `AGENTS.md`、项目 Skill、`CURRENT_GOAL.md` 和 `ACCEPTANCE.md`。
- 在 Goal 范围内修改代码或文档，不擅自扩大需求。
- 运行测试、项目和静态检查，保留实际命令与输出摘要。
- 在允许范围内修复失败项；越界修复必须停止并报告。
- 填写 `CODEX_REPORT.md`，明确通过、失败与未验证项。

### 用户

- 审查 Codex 报告和实际产品体验。
- 决定是否批准本轮结果和是否提交。
- 决定是否 push、合并 `main` 或打 tag。
- 提供截图、声音、操作手感和其他人工体验反馈。

## Loop 流程

1. **Read**：读取仓库规则、当前 Goal、验收标准和直接相关文件。
2. **Plan**：声明目标路线、修改文件、职责、风险、禁止范围和验证方法。
3. **Implement**：执行最小必要修改，不顺手扩展功能或重构无关模块。
4. **Run**：运行任务规定的测试、项目、静态检查和 Git 命令。
5. **Review**：对照 Acceptance 逐项审查输出、差异、模块边界和影响。
6. **Fix**：只修复 Goal 内失败项；需要扩大范围时停止并请求新 Goal。
7. **Report**：填写 CODEX_REPORT，记录命令、证据、失败和未验证项。
8. **Decision**：ChatGPT 项目大脑审查，用户决定批准、提交、合并或进入下一轮。

## 硬规则

- Codex 不自动合并 `main`。
- Codex 不自动打 tag。
- Codex 不擅自扩大 Goal。
- 没有测试、运行、人工观察或 Git 证据时，不能写“完成”或“测试通过”。
- 所有未验证项必须显式写“未验证”。
- 新功能默认进入 `godot/` 主线。
- Electron 版只作为 Legacy 保留；只有明确维护任务才修改。
- 不做后端、账号、数据库、联网或排行榜。
- 不引入 GodotMaker。
- 不把 Electron JavaScript 平移为 Godot GDScript。

GodotMaker 只作为“自动工作流如何串联 GDD、任务、实现、测试、截图、评估和修复”的参考，不作为项目依赖，不安装到仓库，也不决定 BossFish 的代码结构。

## 参考工作流原则

这些来源只提供方法参考，不构成项目依赖：

- **Godot 官方最佳实践**：Scene/Node 保持单一清晰职责；目录按场景、脚本、数据和资源组织；Autoload 只用于确实需要跨场景共享、生命周期全局且边界稳定的服务，不能当万能状态容器。
- **Godot 官方 demo 项目**：优先从真实 `project.godot`、输入映射、主场景和小型 demo 场景学习结构，用可运行示例验证理解，不复制与本 Goal 无关的系统。
- **GodotMaker**：参考 `GDD → Task → Implement → Test → Screenshot → Evaluate → Fix` 的闭环思想；BossFish 使用本目录文档实现自己的人工可审查 Loop。
- **GUT / GdUnit4**：作为后期 GDScript 自动测试候选；Godot reboot v0.1 不强制接入，不提前增加依赖。
- **Godot Export Action**：作为后期持续导出 Windows 构建的参考；v0.1 不接入 CI 导出。

## 每轮读取顺序

1. `AGENTS.md`
2. `.codex/skills/bossfish/SKILL.md`
3. `docs/agent-loop/CURRENT_GOAL.md`
4. `docs/agent-loop/ACCEPTANCE.md`
5. 与 Goal 直接相关的设计、代码和数据文件

## 文件职责

- `README.md`：长期有效的 Agent Loop 总协议。
- `CURRENT_GOAL.md`：当前阶段、唯一 Goal、范围和禁止项。
- `ACCEPTANCE.md`：本轮验收清单与证据标准。
- `CODEX_REPORT.md`：Codex 每轮填写的执行报告模板。
- `DECISION_LOG.md`：长期保留的项目方向和人工决策记录。
