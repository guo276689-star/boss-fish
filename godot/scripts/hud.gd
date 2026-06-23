class_name GameHUD
extends CanvasLayer

signal quest_claim_requested(quest_id: String)
signal shop_purchase_requested(upgrade_id: String)
signal modal_closed

@onready var coin_label: Label = $CoinPanel/CoinLabel
@onready var prompt_label: Label = $PromptPanel/PromptLabel
@onready var pressure_label: Label = $PressurePanel/PressureLabel
@onready var status_label: Label = $StatusPanel/StatusLabel
@onready var modal: PanelContainer = $Modal
@onready var modal_title: Label = $Modal/Margin/VBox/Title
@onready var modal_body: RichTextLabel = $Modal/Margin/VBox/Body
@onready var modal_actions: VBoxContainer = $Modal/Margin/VBox/Actions
@onready var toast_label: Label = $Toast
@onready var toast_timer: Timer = $ToastTimer

var _world_prompt := "探索办公室，寻找可互动的区域。"
var _status := ""


func _ready() -> void:
	toast_timer.timeout.connect(_hide_toast)
	_refresh_prompt()


func set_coins(value: int) -> void:
	coin_label.text = "金币：%d" % value


func set_world_prompt(message: String) -> void:
	_world_prompt = message
	_refresh_prompt()


func set_status(message: String) -> void:
	_status = message
	status_label.text = message
	status_label.visible = not message.is_empty()
	_refresh_prompt()


func set_pressure(value: int, message: String) -> void:
	pressure_label.text = "老板压力：%d%% · %s" % [value, message]
	pressure_label.modulate = Color(1.0, 0.56, 0.42) if value >= 60 else Color(0.8, 0.86, 0.75)


func show_fishing_result(fish: Dictionary, reward: int) -> void:
	if fish.is_empty():
		_open_modal("鱼跑掉了", "这次没有鱼获。调整站位后再试一次。")
	else:
		var body := "%s\n稀有度：%s\n获得：%d 金币\n\n%s" % [fish.get("name", "未知鱼"), fish.get("rarity", "common"), reward, fish.get("flavor_text", "")]
		_open_modal("鱼获结果", body)
	_add_close_action()


func show_quests(quests: Array[Dictionary]) -> void:
	var lines: Array[String] = []
	_open_modal("今日小委托", "")
	for quest in quests:
		lines.append(_format_quest(quest))
		if bool(quest.get("completed", false)) and not bool(quest.get("claimed", false)):
			_add_claim_action(str(quest.get("id", "")), "领取：%s" % quest.get("title", "委托奖励"))
	modal_body.text = "\n\n".join(lines)
	_add_close_action()


func show_bestiary(catalog: Array[Dictionary], caught_counts: Dictionary) -> void:
	var lines: Array[String] = []
	for fish in catalog:
		var fish_id := str(fish.get("id", ""))
		var count := int(caught_counts.get(fish_id, 0))
		if count > 0:
			lines.append("%s · %s · %d 条\n%s" % [fish.get("name", fish_id), fish.get("rarity", "common"), count, fish.get("description", "")])
		else:
			lines.append("??? · 锁定\n还没有摸到这条办公室鱼。")
	_open_modal("办公室图鉴（8 条）", "\n\n".join(lines))
	_add_close_action()


func show_shop(items: Array[Dictionary], coins: int) -> void:
	var lines: Array[String] = ["当前金币：%d" % coins]
	_open_modal("摸鱼补给站", "")
	for item in items:
		lines.append(_format_shop_item(item))
		if int(item.get("level", 0)) < int(item.get("max_level", 0)):
			_add_purchase_action(str(item.get("id", "")), "购买：%s（%d 金币）" % [item.get("name", "升级"), int(item.get("current_cost", 0))])
	modal_body.text = "\n\n".join(lines)
	_add_close_action()


func show_boss_info(pressure: int, inspecting: bool) -> void:
	var body := "当前压力：%d%%\n" % pressure
	if inspecting:
		body += "巡查中：停止摸鱼并离开鱼塘。"
	else:
		body += "连续摸鱼会提高压力；达到 100%% 会触发巡查。"
	_open_modal("老板门", body)
	_add_close_action()


func show_toast(message: String) -> void:
	toast_label.text = message
	toast_label.visible = true
	toast_timer.start(2.4)


func is_modal_open() -> bool:
	return modal.visible


func close_modal() -> void:
	if not modal.visible:
		return
	modal.visible = false
	modal_closed.emit()


func _refresh_prompt() -> void:
	prompt_label.text = _status if not _status.is_empty() else _world_prompt


func _open_modal(title: String, body: String) -> void:
	modal.visible = true
	modal_title.text = title
	modal_body.text = body
	for child in modal_actions.get_children():
		child.queue_free()


func _format_quest(quest: Dictionary) -> String:
	var status := "进行中"
	if bool(quest.get("claimed", false)):
		status = "已领取"
	elif bool(quest.get("completed", false)):
		status = "可领奖"
	return "%s · %s\n%s\n进度：%d / %d · 奖励：%d 金币" % [quest.get("title", "委托"), status, quest.get("description", ""), int(quest.get("progress", 0)), int(quest.get("target", 0)), int(quest.get("reward_coins", 0))]


func _format_shop_item(item: Dictionary) -> String:
	return "%s · Lv.%d / %d\n%s\n下一次价格：%d 金币" % [item.get("name", "升级"), int(item.get("level", 0)), int(item.get("max_level", 0)), item.get("description", ""), int(item.get("current_cost", 0))]


func _add_claim_action(quest_id: String, label: String) -> void:
	_add_action(label, Callable(self, "_emit_claim").bind(quest_id))


func _add_purchase_action(upgrade_id: String, label: String) -> void:
	_add_action(label, Callable(self, "_emit_purchase").bind(upgrade_id))


func _add_close_action() -> void:
	_add_action("关闭（Esc）", Callable(self, "close_modal"))


func _add_action(label: String, callback: Callable) -> void:
	var button := Button.new()
	button.text = label
	button.custom_minimum_size = Vector2(0, 34)
	button.pressed.connect(callback)
	modal_actions.add_child(button)


func _emit_claim(quest_id: String) -> void:
	quest_claim_requested.emit(quest_id)


func _emit_purchase(upgrade_id: String) -> void:
	shop_purchase_requested.emit(upgrade_id)


func _hide_toast() -> void:
	toast_label.visible = false
