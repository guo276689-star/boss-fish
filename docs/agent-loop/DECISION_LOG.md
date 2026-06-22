# Decision Log

> 本文件记录 ChatGPT 项目大脑审查意见和用户最终决策。按时间追加，不覆盖历史结论。Codex 可以根据明确审查结果代为写入记录，但不能替用户作出批准、提交、合并或 tag 决策。

## 决策权限

### ChatGPT 项目大脑

- 审查 Goal 是否守边界。
- 审查 `ACCEPTANCE.md` 和 `CODEX_REPORT.md` 的证据是否充分。
- 提出批准、补测、修订或停止建议。
- 定义获批后的下一轮 Goal。

### 用户

- 作出批准或退回的最终决定。
- 决定是否 commit、push、合并 `main` 或打 tag。
- 提供截图和人工体验结论。

### Codex

- 不自我批准。
- 不自动 commit、push、合并 `main` 或打 tag。
- 只执行用户明确授权且仍在 Goal 范围内的 Git 操作。

## 决策状态

- `APPROVED`：本轮结果获得用户批准；不代表已经提交或合并。
- `REVISION_REQUIRED`：需要修复失败项或补充证据。
- `REJECTED`：本轮方案或结果不接受。
- `STOPPED`：本轮终止，不再继续修复。
- `PENDING`：等待报告、人工体验或用户决定。

## 决策记录

当前无已批准决策。

## 追加模板

```text
### Decision YYYY-MM-DD-序号

- 时间：YYYY-MM-DD HH:mm，Asia/Shanghai
- Goal ID：...
- 当前分支：...
- 审查者：ChatGPT 项目大脑 / 用户
- CODEX_REPORT 状态：...
- 人工体验证据：... / 未验证
- 决策：APPROVED / REVISION_REQUIRED / REJECTED / STOPPED / PENDING
- 决策理由：...
- 失败项处理：...
- 未验证项处理：...
- 是否批准 commit：是 / 否 / 未决定
- 是否批准 push：是 / 否 / 未决定
- 是否批准合并 main：是 / 否 / 未决定
- 是否批准打 tag：是 / 否 / 未决定
- 下一步：...
- 下一轮 Goal：... / 未定义
```

## 进入下一轮的条件

1. 当前 `CODEX_REPORT.md` 已完成并包含 Git 证据。
2. 必须验收项已经通过，或未验证项已由用户明确接受。
3. 用户已经记录批准、退回或终止决定。
4. 下一轮 Goal 不隐式继承本轮未批准的扩大范围。
5. 新一轮开始前重新填写 `CURRENT_GOAL.md` 和 `ACCEPTANCE.md`。
