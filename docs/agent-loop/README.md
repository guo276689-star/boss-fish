# 《老板鱼来了》Agent Loop 工作协议

## 目的

本目录把后续开发固定为可审查、可验证、可追踪的闭环：

```text
目标下发 → Codex 执行 → 运行验收 → 写报告 → 人工审查 → 下一轮
```

每轮只处理一个明确 Goal。Goal、验收标准、执行报告和人工决策分别记录，任何角色都不能用口头判断替代证据。

## 角色分工

### ChatGPT 项目大脑

- 定义版本目标和本轮唯一 Goal。
- 拆分范围、交付物和里程碑。
- 规定禁止事项、风险边界和验收标准。
- 审查 `CODEX_REPORT.md` 中的命令、证据、失败项和未验证项。
- 根据报告与用户反馈，决定是否建议进入下一轮。
- 不代替用户批准提交、合并或发布。

### Codex 执行者

- 每轮先读取仓库根目录 `AGENTS.md`。
- 再读取 `CURRENT_GOAL.md` 和 `ACCEPTANCE.md`。
- 严格在 Goal 范围内修改代码或文档。
- 运行与改动对应的测试、静态检查和项目。
- 在范围内修复失败项；无法修复时停止扩大修改并报告。
- 按模板填写 `CODEX_REPORT.md`，附实际命令和 Git 证据。
- 不自我批准，不替用户决定提交或合并。

### 用户

- 审查目标、验收结果和实际体验。
- 决定本轮是否批准。
- 决定是否执行 commit。
- 决定是否合并 `main`。
- 提供截图、声音、操作手感或其他人工体验反馈。

## 标准循环

1. **目标下发**：ChatGPT 项目大脑更新 `CURRENT_GOAL.md`，并在 `ACCEPTANCE.md` 写入本轮可执行标准。
2. **Codex 执行**：Codex 读取规则和目标，先声明修改范围，再执行最小必要变更。
3. **运行验收**：Codex 运行规定命令和项目，逐项记录通过、失败与未验证。
4. **写报告**：Codex 完整填写 `CODEX_REPORT.md`，不得省略失败输出或 Git 状态。
5. **人工审查**：ChatGPT 项目大脑审查报告；用户结合人工体验决定批准、退回或终止。
6. **下一轮**：审查结论追加到 `DECISION_LOG.md`。只有批准后才能定义下一轮 Goal；提交、合并和 tag 仍需用户单独决定。

## 每轮读取顺序

1. `AGENTS.md`
2. `.codex/skills/bossfish/SKILL.md`
3. `docs/agent-loop/CURRENT_GOAL.md`
4. `docs/agent-loop/ACCEPTANCE.md`
5. 与 Goal 直接相关的设计和代码文件

## 硬规则

- Codex 不自动合并 `main`。
- Codex 不自动打 tag。
- Codex 不擅自扩大 Goal。
- 没有证据不能写“完成”或“测试通过”。
- 未验证项必须明确写“未验证”。
- 新功能默认进入 `godot/` 主线。
- Electron 版只作为 Legacy 保留；只有明确维护任务才修改。
- 不做后端、账号、数据库、联网或排行榜。
- 不引入 GodotMaker。
- 不迁移 Electron JavaScript 到 Godot。
- 失败项不得隐藏；修复若需要超出 Goal，必须交回项目大脑重新下发。

## 文件职责

- `CURRENT_GOAL.md`：当前唯一 Goal、范围、禁止项和交付物。
- `ACCEPTANCE.md`：本轮验收项目、命令、期望结果和证据要求。
- `CODEX_REPORT.md`：Codex 实际执行与验证报告。
- `DECISION_LOG.md`：人工审查结论和后续授权记录。
- `README.md`：长期有效的 Agent Loop 总协议。

## 状态约定

- `WAITING`：没有可执行 Goal。
- `READY`：Goal 和验收标准已明确，可以执行。
- `IN_PROGRESS`：Codex 正在修改或验证。
- `REVIEW`：报告已写，等待人工审查。
- `APPROVED`：用户批准本轮结果；不等于已经 commit 或合并。
- `REVISION_REQUIRED`：存在必须修复或补证据的项目。
- `STOPPED`：Goal 取消或因边界问题终止。

协议建立后，当前具体功能、项目运行效果和 UI 状态仍需按各轮报告验证；没有证据的内容统一标记“未验证”。
