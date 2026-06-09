# 《老板鱼来了》Codex 开工整合版

> 用途：这份 Markdown 是给 Codex 开始工作的统一执行文档。  
> 它整合了原完整方案、严格边界分析、v0.1 开发范围、Codex 分步提示词、数据配置、测试标准和后续路线。  
> **Codex 开工时优先阅读本文件，不要再直接按原完整方案扩功能。**

---

# 0. 给 Codex 的第一句话

把下面这段直接粘给 Codex，作为项目总约束：

```text
你正在协助我开发一个 Windows 小窗口放置钓鱼游戏，项目名《老板鱼来了》。

请严格以当前 Markdown 文档为准。
当前只做 v0.1 严格边界版，不做完整商业版。

技术栈固定：
- Electron
- HTML
- CSS
- JavaScript
- Canvas
- JSON
- localStorage

禁止：
- 不使用 TypeScript
- 不使用 React
- 不使用 Vue
- 不使用后端
- 不使用数据库
- 不使用账号系统
- 不使用联网功能
- 不使用第三方游戏引擎
- 不使用复杂依赖
- 不主动新增未要求功能

窗口固定：
- 420×260
- 先使用系统默认窗口边框
- v0.1 不做托盘
- v0.1 不做置顶
- v0.1 不做全局快捷键
- v0.1 不做打包安装器

开发原则：
- 每次只做一个步骤
- 每次只修改和当前步骤有关的文件
- 代码要简单、可读、少依赖
- 不要为了“更完整”而主动加功能
- 如果发现需求冲突，以 v0.1 严格边界为准
```

---

# 1. 项目定位

## 1.1 最终项目名

```text
老板鱼来了
```

英文名：

```text
Boss Fish Is Coming
```

## 1.2 原始一句话定位

```text
上班挂着小窗口钓鱼，老板来了秒变日报。
```

## 1.3 v0.1 修正后定位

```text
一个能放在 Windows 桌面角落的办公室主题放置钓鱼小挂件。
```

## 1.4 为什么要修正定位

“老板来了秒变日报”有传播性，但不能作为第一商业卖点。

它的问题：

```text
容易被理解成逃避工作
可能限制传播平台
可能让游戏显得像灰色工具
容易让玩家只记住梗，不记住游戏
```

所以 v0.1 的第一卖点改成：

```text
上班间隙挂着小鱼塘，偶尔点一下，收集打工鱼。
```

“报表模式”保留，但只是副功能，不是主功能。

---

# 2. v0.1 核心目标

v0.1 不是完整游戏。  
v0.1 只验证 4 个问题：

```text
1. 小窗口挂在桌面角落是否舒服？
2. 玩家是否愿意等鱼上钩？
3. 钓到办公室主题鱼时是否有笑点？
4. 玩家是否愿意第二天再打开？
```

如果这 4 个问题没有验证成功，不允许继续加大系统。

---

# 3. v0.1 成功标准

## 3.1 功能成功标准

v0.1 完成后必须做到：

```text
能启动
能看到 420×260 小窗口
能看到鱼塘
能看到猫猫占位
能看到鱼漂浮动
能等待上钩
能点击收竿
能获得随机鱼
金币会增加
图鉴会记录
两个升级能购买
升级效果会生效
重启不丢存档
能切换报表模式
能返回游戏
```

## 3.2 体验成功标准

找 3 个朋友测试，每人只给 3 分钟。

成功标准：

```text
至少 2 人能在 1 分钟内理解玩法
至少 2 人能在 3 分钟内钓到鱼
至少 2 人愿意让它继续挂在桌面 10 分钟
至少 1 人觉得鱼名或文案有趣
没有人严重抱怨窗口挡事
没有人严重抱怨等待太久
```

## 3.3 不以什么作为成功标准

v0.1 不以这些作为成功：

```text
功能多
美术精致
音效完整
商店复杂
内容量大
能上 Steam
能赚钱
```

v0.1 只验证最小体验。

---

# 4. v0.1 绝对边界

## 4.1 必须做

| 编号 | 功能 | v0.1 是否必须 | 说明 |
|---|---:|---:|---|
| 1 | Electron 小窗口 | 必须 | 420×260 |
| 2 | Canvas 鱼塘 | 必须 | 可以先用几何图形 |
| 3 | 猫猫钓鱼员 | 必须 | v0.1 用占位图 |
| 4 | 鱼漂动画 | 必须 | 轻微上下浮动 |
| 5 | 自动等待上钩 | 必须 | 20～60 秒 |
| 6 | 点击收竿 | 必须 | 只有上钩时有效 |
| 7 | 10 种鱼 | 必须 | 不做 20 种 |
| 8 | 金币 | 必须 | 钓到鱼自动卖出 |
| 9 | 本地存档 | 必须 | localStorage |
| 10 | 简单图鉴 | 必须 | 列表即可 |
| 11 | 2 个升级 | 必须 | 上钩速度、鱼价加成 |
| 12 | 报表模式 | 必须 | 一个页面 |
| 13 | 重置存档 | 必须 | 方便测试 |

---

## 4.2 v0.1 允许但不能过度打磨

| 内容 | 限制 |
|---|---|
| UI 美化 | 只用 CSS 简单美化 |
| 像素风 | 可用 Canvas 占位，不追求最终资产 |
| 鱼类文案 | 每条不超过 30 字 |
| 报表模式 | 只做 1 个模板 |
| README | 简单说明项目和运行方法 |
| Git 提交 | 每步完成后提交一次 |

---

## 4.3 v0.1 禁止做

下面这些在 v0.1 一票否决：

```text
鱼竿系统
鱼饵系统
宝箱系统
垃圾物品系统
离线收益
稀有概率升级
宠物养成
猫猫心情
猫猫喂食
猫窝系统
地牢系统
合成系统
任务系统
每日签到
Steam 成就
Steam Cloud
排行榜
账号系统
联网
广告
内购
托盘隐藏
全局快捷键
窗口置顶
无边框拖动窗口
多场景鱼塘
多语言
完整音效系统
复杂动画
复杂教程
正式宣传视频
Steam 商店页
打包安装器
自动更新
```

开发中如果想加任何新东西，先问：

```text
这个功能是否直接帮助验证 v0.1 的核心体验？
```

如果不是，记录到“v0.2 候选”，但不实现。

---

# 5. 技术路线

## 5.1 固定技术栈

```text
Electron
HTML
CSS
JavaScript
Canvas
JSON
localStorage
```

## 5.2 暂不使用

```text
TypeScript
React
Vue
Svelte
Godot
Unity
Phaser
PixiJS
Three.js
WebGL
数据库
后端服务
云存档
复杂状态管理
```

## 5.3 为什么用 Electron

当前项目重点是：

```text
Windows 小窗口
桌面挂件感
HTML/CSS 快速做报表模式
Canvas 快速做简单游戏画面
Codex 容易生成和修改代码
不需要服务器
不需要复杂引擎
```

因此 v0.1 使用 Electron 是最现实路线。

---

# 6. v0.1 项目目录结构

Codex 必须按这个简化结构创建，不要生成多余目录：

```text
boss-fish/
├─ package.json
├─ main.js
├─ preload.js
├─ index.html
├─ README.md
├─ src/
│  ├─ renderer.js
│  ├─ game.js
│  ├─ fishing.js
│  ├─ save.js
│  ├─ shop.js
│  ├─ bestiary.js
│  └─ disguise.js
├─ styles/
│  ├─ main.css
│  └─ disguise.css
└─ data/
   ├─ fish.json
   └─ upgrades.json
```

v0.1 不创建：

```text
assets/
assets/sfx/
assets/fish/
assets/ui/
assets/sprites/
build/
dist/
```

这些放到 v0.2 之后。

---

# 7. v0.1 游戏规则

## 7.1 主循环

```text
启动游戏
↓
显示小鱼塘
↓
等待 20～60 秒
↓
鱼上钩
↓
玩家点击鱼塘
↓
获得随机鱼
↓
金币增加
↓
图鉴记录
↓
继续等待
```

## 7.2 上钩时间

初始：

```text
最短 20 秒
最长 60 秒
```

升级后：

```text
实际最短时间 = max(10, 20 - 上钩速度等级 × 2)
实际最长时间 = max(40, 60 - 上钩速度等级 × 4)
```

上钩速度最多 5 级。

| 等级 | 最短时间 | 最长时间 |
|---:|---:|---:|
| 0 | 20 秒 | 60 秒 |
| 1 | 18 秒 | 56 秒 |
| 2 | 16 秒 | 52 秒 |
| 3 | 14 秒 | 48 秒 |
| 4 | 12 秒 | 44 秒 |
| 5 | 10 秒 | 40 秒 |

不要低于这个范围，否则会变成烦人的点击器。

## 7.3 金币规则

钓到鱼后自动卖出：

```text
获得金币 = floor(鱼基础价格 × (1 + 鱼价加成等级 × 0.15))
```

鱼价加成最多 5 级。

| 等级 | 加成 |
|---:|---:|
| 0 | 0% |
| 1 | 15% |
| 2 | 30% |
| 3 | 45% |
| 4 | 60% |
| 5 | 75% |

---

# 8. v0.1 鱼类配置

## 8.1 fish.json

Codex 创建 `data/fish.json` 时使用下面内容：

```json
[
  {
    "id": "moyu_goldfish",
    "name": "摸鱼金鱼",
    "rarity": "common",
    "basePrice": 10,
    "weight": 35,
    "description": "看起来很闲，其实很会装忙。"
  },
  {
    "id": "badge_carp",
    "name": "工牌鲤鱼",
    "rarity": "common",
    "basePrice": 14,
    "weight": 25,
    "description": "脖子上挂着工牌，比你还像正式员工。"
  },
  {
    "id": "coffee_loach",
    "name": "咖啡泥鳅",
    "rarity": "common",
    "basePrice": 18,
    "weight": 18,
    "description": "每天靠咖啡续命。"
  },
  {
    "id": "overtime_sardine",
    "name": "加班沙丁鱼",
    "rarity": "common",
    "basePrice": 22,
    "weight": 12,
    "description": "一群出现，通常意味着今晚走不了。"
  },
  {
    "id": "ppt_catfish",
    "name": "PPT 鲶鱼",
    "rarity": "rare",
    "basePrice": 60,
    "weight": 6,
    "description": "鱼鳞一片就是一页汇报。"
  },
  {
    "id": "meeting_jellyfish",
    "name": "会议水母",
    "rarity": "rare",
    "basePrice": 75,
    "weight": 4,
    "description": "透明、冗长、会后没人记得它说了什么。"
  },
  {
    "id": "todo_turtle",
    "name": "待办乌龟",
    "rarity": "rare",
    "basePrice": 90,
    "weight": 3,
    "description": "永远在路上，永远没完成。"
  },
  {
    "id": "client_octopus",
    "name": "甲方章鱼",
    "rarity": "epic",
    "basePrice": 180,
    "weight": 1.5,
    "description": "八只手同时改需求。"
  },
  {
    "id": "bug_eel",
    "name": "Bug 电鳗",
    "rarity": "epic",
    "basePrice": 220,
    "weight": 1,
    "description": "你不碰它，它自己也会报错。"
  },
  {
    "id": "boss_fish",
    "name": "老板鱼",
    "rarity": "legendary",
    "basePrice": 500,
    "weight": 0.5,
    "description": "它不是来上钩的，它是来巡逻的。"
  }
]
```

---

# 9. v0.1 升级配置

## 9.1 upgrades.json

Codex 创建 `data/upgrades.json` 时使用下面内容：

```json
[
  {
    "id": "biteSpeed",
    "name": "上钩速度",
    "baseCost": 80,
    "costMultiplier": 1.7,
    "maxLevel": 5,
    "description": "鱼更快上钩。"
  },
  {
    "id": "sellBonus",
    "name": "鱼价加成",
    "baseCost": 120,
    "costMultiplier": 1.8,
    "maxLevel": 5,
    "description": "卖鱼获得更多金币。"
  }
]
```

价格公式：

```text
价格 = floor(baseCost × costMultiplier ^ 当前等级)
```

---

# 10. 存档结构

v0.1 使用 localStorage。

key 建议：

```text
bossFishSave
```

存档结构：

```json
{
  "coins": 0,
  "totalCaught": 0,
  "ownedFish": {},
  "lastCatch": null,
  "upgrades": {
    "biteSpeed": 0,
    "sellBonus": 0
  },
  "settings": {
    "windowMode": "game"
  }
}
```

说明：

```text
coins：金币
totalCaught：总钓鱼数
ownedFish：鱼类捕获数量
lastCatch：最近钓到的鱼
upgrades：升级等级
settings：设置
```

v0.1 不做：

```text
离线收益
退出时间
鱼竿
鱼饵
音效设置
置顶设置
```

---

# 11. 界面设计

## 11.1 主窗口

尺寸：

```text
420×260
```

布局：

```text
┌────────────────────────────┐
│ 金币 1280  总数 23   报表 │
├────────────────────────────┤
│                            │
│      猫猫 + 鱼塘 + 鱼漂       │
│                            │
│          等待上钩...          │
├────────────────────────────┤
│ 图鉴   商店   重置存档        │
└────────────────────────────┘
```

## 11.2 Canvas 区域

建议：

```text
宽：420
高：190
```

底部 UI：

```text
高：70
```

Canvas 绘制内容：

```text
天空
岸边
水面
猫猫占位
鱼竿线
鱼漂
上钩提示
最近钓到的鱼
```

v0.1 可用几何图形，不需要真实素材。

## 11.3 图鉴界面

图鉴只做覆盖层，不做复杂弹窗。

显示规则：

已解锁：

```text
鱼名
稀有度
数量
描述
```

未解锁：

```text
？？？
```

示例：

```text
图鉴

✓ 摸鱼金鱼 × 3
  common
  看起来很闲，其实很会装忙。

✓ 工牌鲤鱼 × 1
  common
  脖子上挂着工牌，比你还像正式员工。

？ ？？？
？ ？？？

[关闭]
```

## 11.4 商店界面

只显示两个升级：

```text
商店

上钩速度 Lv.2 / 5
说明：鱼更快上钩。
价格：231
[购买]

鱼价加成 Lv.1 / 5
说明：卖鱼获得更多金币。
价格：216
[购买]

[关闭]
```

## 11.5 报表模式

按钮名称：

```text
报表
```

不要叫：

```text
老板来了
逃班模式
摸鱼伪装
```

报表内容：

```text
今日工作概览

项目 Alpha：进度 87%
项目 Beta：等待复核
项目 Gamma：数据同步中

今日待办：
[✓] 整理需求文档
[✓] 同步项目进度
[ ] 输出复盘记录

系统状态：正常
```

返回按钮：

```text
返回
```

v0.1 不做快捷键返回。

---

# 12. Codex 开发步骤

---

## Step 1：创建最小 Electron 项目

目标：

```text
能打开 420×260 Electron 小窗口。
```

给 Codex 的提示词：

```text
请创建一个最小 Electron 桌面应用，项目名 boss-fish。

要求：
1. 使用 JavaScript，不使用 TypeScript。
2. 不使用 React / Vue。
3. 窗口大小固定为 420×260。
4. 窗口标题为“老板鱼来了”。
5. 加载 index.html。
6. 创建以下文件：
   - package.json
   - main.js
   - preload.js
   - index.html
   - styles/main.css
   - src/renderer.js
7. package.json 中包含 start 脚本。
8. 页面中央显示：“老板鱼来了 - v0.1”。
9. 不需要后端，不需要数据库，不需要打包配置。
10. 保持 contextIsolation: true。
11. renderer 侧不要直接使用 Node API。

请直接给出完整文件内容。
```

完成标准：

```text
npm install
npm start
能看到 420×260 窗口
控制台无报错
```

建议 Git 提交：

```text
git add .
git commit -m "step1 create minimal electron app"
```

---

## Step 2：实现 Canvas 鱼塘占位画面

目标：

```text
能看到鱼塘、猫猫占位、鱼漂轻微上下浮动。
```

给 Codex 的提示词：

```text
请在当前 Electron 项目中实现 Canvas 游戏画面。

要求：
1. index.html 中加入 canvas，尺寸为 420×190。
2. 底部保留 70px UI 区域。
3. 新增 src/game.js。
4. game.js 中实现 requestAnimationFrame 游戏循环。
5. Canvas 绘制简单像素风鱼塘占位画面：
   - 天空
   - 岸边
   - 水面
   - 猫猫占位角色
   - 鱼竿线
   - 鱼漂
6. 鱼漂需要轻微上下浮动。
7. renderer.js 负责启动 game.js。
8. 不引入第三方库。
9. 不添加钓鱼逻辑。
10. 不添加金币。
11. 不添加图鉴。
12. 不添加商店。

请给出需要新增或修改的完整文件。
```

完成标准：

```text
打开窗口能看到动态鱼漂
控制台无报错
```

Git 提交：

```text
git add .
git commit -m "step2 add canvas pond scene"
```

---

## Step 3：实现上钩和收竿

目标：

```text
等待一段时间后鱼上钩，点击获得随机鱼。
```

给 Codex 的提示词：

```text
请新增 data/fish.json 和 src/fishing.js，实现 v0.1 钓鱼系统。

要求：
1. fish.json 中只包含 10 种鱼，使用本项目文档中的 v0.1 fish.json。
2. 每条鱼字段：
   - id
   - name
   - rarity
   - basePrice
   - weight
   - description
3. fishing.js 从 fish.json 读取鱼类配置。
4. 每 20～60 秒随机进入 fishBiting 状态。
5. fishBiting 状态下，game.js 让鱼漂变红，并显示“上钩了！”。
6. 玩家点击 canvas 时，如果正在上钩，就按 weight 权重随机获得一条鱼。
7. 获得鱼后触发 onCatch(fish) 回调。
8. game.js 显示最近钓到的鱼名。
9. 不做金币。
10. 不做存档。
11. 不做图鉴。
12. 不做商店。
13. 不做音效。
14. 不做任何未要求功能。

请给出完整代码。
```

完成标准：

```text
等待 20～60 秒会提示上钩
点击后获得随机鱼
最近钓到的鱼名会显示
```

Git 提交：

```text
git add .
git commit -m "step3 add fishing bite and catch"
```

---

## Step 4：实现金币与存档

目标：

```text
钓鱼后金币增加，总数增加，重启后不丢。
```

给 Codex 的提示词：

```text
请新增 src/save.js，并为当前项目加入金币和本地存档。

要求：
1. 使用 localStorage 保存数据。
2. localStorage key 使用 bossFishSave。
3. 保存字段：
   - coins
   - totalCaught
   - ownedFish
   - lastCatch
   - upgrades
   - settings
4. 钓到鱼后：
   - coins 增加 fish.basePrice
   - totalCaught +1
   - ownedFish[fish.id] +1
   - lastCatch 保存鱼 id 和鱼名
5. UI 显示：
   - 金币
   - 总钓鱼数
   - 最近钓到
6. 刷新或重启游戏后数据仍然保留。
7. 增加“重置存档”按钮。
8. 不做图鉴。
9. 不做商店。
10. 不做离线收益。
11. 不做音效。
12. 不做打包。

请给出完整修改。
```

完成标准：

```text
金币会增加
总数会增加
重启不丢数据
重置按钮可用
```

Git 提交：

```text
git add .
git commit -m "step4 add coins and local save"
```

---

## Step 5：实现简单图鉴

目标：

```text
能查看已钓到的鱼和未解锁鱼。
```

给 Codex 的提示词：

```text
请新增 src/bestiary.js，实现 v0.1 简单图鉴。

要求：
1. UI 添加“图鉴”按钮。
2. 点击后显示一个覆盖层面板。
3. 图鉴读取 fish.json 中所有鱼。
4. 如果 ownedFish 中数量大于 0：
   - 显示鱼名
   - 稀有度
   - 数量
   - 描述
5. 如果没有钓到：
   - 显示“？？？”
   - 不显示描述
6. 面板必须适配 420×260 小窗口。
7. 内容过长可以滚动。
8. 有关闭按钮。
9. 不添加鱼类图标。
10. 不添加复杂动画。
11. 不做商店。
12. 不做音效。
13. 不做任何未要求功能。

请给出完整修改。
```

完成标准：

```text
能打开图鉴
已钓到鱼显示信息
未钓到鱼显示问号
```

Git 提交：

```text
git add .
git commit -m "step5 add simple bestiary"
```

---

## Step 6：实现两个升级

目标：

```text
能购买上钩速度和鱼价加成，效果生效。
```

给 Codex 的提示词：

```text
请新增 data/upgrades.json 和 src/shop.js，实现 v0.1 商店。

要求：
1. 只做两个升级：
   - 上钩速度 biteSpeed
   - 鱼价加成 sellBonus
2. upgrades.json 使用本项目文档中的 v0.1 upgrades.json。
3. 每个升级字段：
   - id
   - name
   - baseCost
   - costMultiplier
   - maxLevel
   - description
4. 价格公式：
   floor(baseCost * costMultiplier ** currentLevel)
5. 点击购买时：
   - 如果金币足够，扣金币并升级
   - 如果金币不足，显示提示
6. 上钩速度影响 fishing.js 的等待时间：
   - 最短时间 = max(10, 20 - level * 2)
   - 最长时间 = max(40, 60 - level * 4)
7. 鱼价加成影响卖鱼金币：
   - 获得金币 = floor(basePrice * (1 + sellBonusLevel * 0.15))
8. 升级等级保存到 localStorage。
9. 不做稀有概率升级。
10. 不做鱼竿。
11. 不做鱼饵。
12. 不做离线收益。
13. 不做音效。

请给出完整修改。
```

完成标准：

```text
能购买升级
金币正确扣除
上钩速度升级生效
鱼价加成升级生效
重启后升级等级保留
```

Git 提交：

```text
git add .
git commit -m "step6 add two shop upgrades"
```

---

## Step 7：实现报表模式

目标：

```text
点击报表按钮切换成办公报表，再点击返回回到游戏。
```

给 Codex 的提示词：

```text
请新增 src/disguise.js 和 styles/disguise.css，实现 v0.1 报表模式。

要求：
1. UI 添加“报表”按钮。
2. 点击后隐藏游戏 canvas 和游戏 UI。
3. 显示一个简洁办公报表页面。
4. 报表内容包括：
   - 今日工作概览
   - 项目进度
   - 今日待办
   - 系统状态
5. 不使用真实公司 logo。
6. 不使用真实个人信息。
7. 右下角有一个“返回”按钮。
8. 点击返回后回到游戏界面。
9. 不做快捷键。
10. 不做音效。
11. 不做多个报表模板。
12. 不做隐藏窗口。
13. 不做托盘。
14. 不做任何未要求功能。

请给出完整实现。
```

完成标准：

```text
能进入报表模式
能返回游戏
界面不突兀
```

Git 提交：

```text
git add .
git commit -m "step7 add report mode"
```

---

## Step 8：整理 README

目标：

```text
项目有清晰运行说明。
```

给 Codex 的提示词：

```text
请为当前 v0.1 项目生成 README.md。

要求：
1. 项目名：《老板鱼来了》
2. 简介：Windows 桌面角落放置钓鱼小挂件。
3. 写清楚当前 v0.1 功能：
   - 小窗口
   - 钓鱼
   - 金币
   - 图鉴
   - 两个升级
   - 报表模式
   - 本地存档
4. 写清楚暂不包含：
   - 联网
   - 排行榜
   - Steam 成就
   - 宠物系统
   - 地牢系统
   - 音效系统
   - 托盘隐藏
   - 全局快捷键
5. 写清楚运行方式：
   - npm install
   - npm start
6. 写清楚这是早期测试版本。
7. 不写 Steam 发售。
8. 不夸大内容量。

请给出完整 README.md。
```

完成标准：

```text
README 能让别人知道怎么运行
README 没有夸大功能
```

Git 提交：

```text
git add .
git commit -m "step8 add readme"
```

---

# 13. 每天开发流程

## 13.1 每天开始前问 Codex

```text
请基于当前项目文件结构，先阅读 package.json、main.js、index.html、src 目录和 data 目录。
不要修改代码。
请总结：
1. 当前项目已经完成了哪些功能？
2. 当前项目还缺哪些 v0.1 功能？
3. 今天最应该完成的 1 个步骤是什么？
4. 是否发现了超出 v0.1 边界的功能？
```

## 13.2 让 Codex 修 bug 的模板

```text
当前问题：
{描述 bug}

复现步骤：
1. {步骤 1}
2. {步骤 2}
3. {步骤 3}

期望结果：
{应该发生什么}

实际结果：
{现在发生什么}

限制：
- 只定位这个 bug
- 只做最小修改
- 不重构整个项目
- 不新增功能
- 不修改 v0.1 边界之外的内容

请先说明原因，再给出最小修复代码。
```

## 13.3 每天结束前问 Codex

```text
请检查当前项目是否存在：
1. 明显 bug
2. 未使用文件
3. 命名混乱
4. 重复代码
5. 超出 v0.1 范围的功能
6. 可以简化的地方

要求：
- 只列出问题和建议
- 不直接修改代码
- 不新增功能
```

---

# 14. v0.1 测试清单

## 14.1 功能测试

```text
[ ] npm start 能启动
[ ] 窗口大小是 420×260
[ ] Canvas 正常显示
[ ] 鱼塘正常显示
[ ] 猫猫占位正常显示
[ ] 鱼漂有动画
[ ] 20～60 秒内会上钩
[ ] 上钩后点击能获得鱼
[ ] 不上钩时点击不会乱加鱼
[ ] 金币增加正确
[ ] 总钓鱼数增加正确
[ ] 最近钓到显示正确
[ ] 图鉴解锁正确
[ ] 未解锁鱼显示问号
[ ] 商店扣钱正确
[ ] 金币不足时不能购买
[ ] 满级后不能继续购买
[ ] 上钩速度升级生效
[ ] 鱼价加成升级生效
[ ] 报表模式能进入
[ ] 报表模式能返回
[ ] 重启游戏后金币保留
[ ] 重启游戏后图鉴保留
[ ] 重启游戏后升级保留
[ ] 重置存档可用
[ ] 控制台没有明显报错
```

## 14.2 体验测试

```text
[ ] 第一次打开是否知道点哪里
[ ] 上钩等待是否太久
[ ] 上钩提示是否明显
[ ] 鱼类文案是否有趣
[ ] 图鉴是否看得懂
[ ] 商店是否看得懂
[ ] 金币增长是否太慢
[ ] 窗口是否太小
[ ] 窗口是否挡事
[ ] 报表模式是否太假
[ ] 报表模式是否过于突出“摸鱼”
```

## 14.3 朋友测试问题

发给朋友时只问这 8 个问题：

```text
1. 你第一次打开后，知道怎么玩吗？
2. 你等鱼上钩时会不会觉得烦？
3. 你愿意让它挂在桌面角落 10 分钟吗？
4. 你觉得哪条鱼的名字或文案最好笑？
5. 你觉得窗口大小合适吗？
6. 你觉得报表模式有必要吗？
7. 如果这个游戏继续更新，你希望加什么？
8. 你会不会第二天再打开？
```

不要问：

```text
你觉得我还应该加什么系统？
```

这个问题会引导玩家给你提出一堆会拖死项目的大系统。

---

# 15. 常见错误与处理

## 15.1 Codex 主动加了功能

处理方式：

```text
要求 Codex 删除新增功能，恢复到 v0.1 范围。
```

提示词：

```text
你刚才新增了 v0.1 文档中没有要求的功能：{功能名}。
请删除它，只保留当前步骤明确要求的内容。
不要重构其他部分。
```

## 15.2 项目跑不起来

提示词：

```text
当前项目 npm start 报错。
错误信息如下：

{粘贴完整报错}

请只定位启动失败原因。
要求：
1. 不新增功能
2. 不重构项目
3. 不修改无关文件
4. 给出最小修复方案
```

## 15.3 功能能跑但代码太乱

提示词：

```text
当前功能可以运行，但代码开始变乱。
请只做轻量整理：
1. 不改变功能
2. 不新增功能
3. 不改变文件结构
4. 只整理命名、重复代码和明显可读性问题
5. 修改前说明会改哪些文件
```

## 15.4 数值不好玩

不要急着加系统。  
只改这几个数：

```text
上钩最短时间
上钩最长时间
鱼类权重
鱼基础价格
升级价格
升级倍率
```

---

# 16. 美术边界

## 16.1 v0.1 不做正式美术

v0.1 可以全部使用：

```text
Canvas 几何图形
纯色块
简单猫猫占位
简单鱼漂
文字图鉴
```

不要在 v0.1 阶段卡在美术。

## 16.2 v0.2 才开始做第一批美术

v0.2 可做：

```text
猫猫钓鱼员 sprite
鱼塘背景
鱼漂图标
10～20 个鱼类图标
像素按钮
图鉴 UI
```

## 16.3 AI 美术统一风格提示词

通用提示词：

```text
pixel art game asset, 16-bit style, cute cozy office theme, low saturation color palette, clean silhouette, minimal details, readable at small size, transparent background, no text, no watermark
```

负面提示词：

```text
realistic, 3d render, oil painting, blurry, too detailed, noisy background, text, watermark, logo, complex lighting, anime illustration, large canvas
```

猫猫钓鱼员：

```text
cute pixel art office cat fishing character, wearing tiny employee badge, sitting by a small pond, 16-bit game sprite, side view, cozy desktop widget game, clean silhouette, simple shapes, low saturation, transparent background, no text, no watermark
```

鱼塘背景：

```text
small cozy pixel art pond background for a desktop widget game, 16-bit style, office break theme, tiny pond, simple grass edge, soft water ripples, low saturation, clean composition, 420x220 game background, no characters, no text, no watermark
```

鱼漂：

```text
pixel art fishing bobber icon, red and white, tiny game asset, 16-bit style, transparent background, clean silhouette, no text, no watermark
```

老板鱼：

```text
cute pixel art boss fish wearing tiny suit and tie, serious expression, 16-bit game item icon, transparent background, clean silhouette, no text, no watermark
```

## 16.4 美术处理流程

```text
AI 生成大图
↓
挑选风格统一版本
↓
用 Aseprite 缩放到目标尺寸
↓
手动清理边缘
↓
限制调色板
↓
导出 PNG
↓
放入 assets 目录
```

v0.1 不走这个流程。  
v0.2 再走。

---

# 17. 音效边界

## 17.1 v0.1 不做音效

原因：

```text
默认静音场景
工作环境不适合突然出声
音效会增加测试面
缺音效不会影响核心验证
```

## 17.2 v0.2 音效原则

```text
短
轻
不刺耳
默认静音
不突然吓人
不含人声大叫
```

## 17.3 v0.2 第一批音效

| 文件名 | 用途 | 时长 |
|---|---|---|
| bite.wav | 鱼上钩提示 | 0.3～0.8 秒 |
| catch.wav | 收竿成功 | 0.5～1 秒 |
| coin.wav | 金币增加 | 0.2～0.5 秒 |
| button.wav | 点击按钮 | 0.1～0.3 秒 |
| disguise.wav | 进入报表模式 | 0.3～0.7 秒 |

---

# 18. 发布边界

## 18.1 v0.1 不发布公开版

v0.1 只做：

```text
本地运行
给朋友测试
收反馈
修 bug
```

## 18.2 v0.2 才考虑 itch.io

v0.2 条件：

```text
20 种鱼
基础美术
基础音效
可下载 zip
README 完整
至少 3 个朋友测试通过
```

## 18.3 v0.3 才考虑 Steam

v0.3 条件：

```text
公开 Demo 有真实下载
有有效反馈
有持续更新计划
内容量至少 50+ 鱼
猫猫有基础动画
图鉴和商店体验完整
页面素材准备好
```

---

# 19. 经济边界

## 19.1 v0.1

```text
平台：本地 / 朋友测试
价格：免费
目标：验证核心体验
```

## 19.2 v0.2

```text
平台：itch.io
价格：免费 / 自愿打赏 / $1.99
目标：验证陌生人反馈
```

## 19.3 v0.3

```text
平台：itch.io 公开 + 准备 Steam
价格：$2.99～$4.99
目标：验证付费意愿
```

当前不要先买 Steam Direct。  
等有用户反馈后再决定。

---

# 20. 后续版本路线

## v0.1：核心钓鱼

```text
小窗口
钓鱼循环
金币
简单图鉴
本地存档
两个升级
报表模式
```

## v0.2：办公室摸鱼 Demo

```text
20 种鱼
正式鱼类图标
猫猫像素图
鱼塘背景
静音开关
轻音效
置顶开关
最小化按钮
itch.io 页面
```

## v0.3：治愈陪伴版

```text
猫猫动画
猫猫心情
简单猫窝
离线收益
随机办公室事件
更多鱼类
更完整图鉴
```

## v0.4：轻度收集成长版

```text
重复鱼分解
材料合成
特殊鱼饵
特殊鱼竿
更多稀有鱼
```

## v0.5：扩展玩法版

```text
轻地牢联动
自动小冒险
装备掉落
老板龙
```

注意：

```text
v0.2 之前不要碰 v0.3
v0.3 之前不要碰 v0.4
v0.4 之前不要碰 v0.5
```

---

# 21. 原完整方案中需要保留的内容

原方案中以下内容保留为长期参考：

```text
Windows 小窗口
像素风
放置钓鱼
图鉴收集
轻量成长
报表模式
可长期更新
Electron + HTML/CSS/JS + Canvas
本地 JSON 配置
AI 美术生成
默认静音
itch.io 先发 Demo
Steam 后置
```

---

# 22. 原完整方案中需要延后的内容

原方案中这些内容延后到 v0.2 或更晚：

```text
20 种鱼
完整美术资产
音效系统
隐藏 / 最小化
置顶
快捷键
离线收益
宝箱
鱼竿
鱼饵
Steam 页面
Steam 成就
打包 Windows portable exe
正式宣传视频
```

---

# 23. 当前立刻要做的事

现在不要继续讨论功能。  
不要继续生成设定。  
不要开始画美术。  
不要先做 Steam。  
不要先做宣传图。

现在只做：

```text
Step 1：创建最小 Electron 项目
Step 2：实现 Canvas 鱼塘占位
Step 3：实现上钩和点击收竿
```

前三步完成之前，其他内容全部暂停。

---

# 24. 给自己的立项提醒

每天打开项目先读这一段：

```text
先做钓鱼，不做大系统。
先做 10 条鱼，不做 100 条鱼。
先做 1 个报表模式，不做 5 个模板。
先让朋友愿意打开第二次，再考虑 Steam。
Codex 主动加功能，要删。
朋友提的大系统，先记，不做。
```

---

# 25. v0.1 最终验收标准

当下面全部打勾，v0.1 才算完成：

```text
[ ] 项目能 npm install
[ ] 项目能 npm start
[ ] 窗口是 420×260
[ ] 有鱼塘画面
[ ] 有猫猫占位
[ ] 有鱼漂动画
[ ] 能自动上钩
[ ] 能点击收竿
[ ] 能随机获得 10 种鱼之一
[ ] 能增加金币
[ ] 能记录总钓鱼数
[ ] 能保存图鉴
[ ] 能打开图鉴
[ ] 能购买上钩速度
[ ] 能购买鱼价加成
[ ] 升级效果生效
[ ] 重启存档不丢
[ ] 能重置存档
[ ] 能进入报表模式
[ ] 能返回游戏
[ ] README 写清楚运行方式
[ ] 没有 v0.1 禁止功能
[ ] 给 3 个朋友测试过
[ ] 至少 2 个朋友愿意挂 10 分钟
```

---

# 26. 最后一句

```text
v0.1 的目标不是证明你能做很多功能。
v0.1 的目标是证明这个小窗口钓鱼体验值得继续做。
```
