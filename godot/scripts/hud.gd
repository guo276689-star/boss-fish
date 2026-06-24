class_name GameHUD
extends CanvasLayer

signal quest_claim_requested(quest_id: String)
signal shop_purchase_requested(upgrade_id: String)
signal modal_closed

const FISH_PREVIEW_TEXTURES := {
	"badge_carp": preload("res://assets/fish/fish_badge_carp.png"),
	"ppt_catfish": preload("res://assets/fish/fish_ppt_catfish.png"),
}

@onready var coin_label: Label = $CoinPanel/CoinLabel
@onready var prompt_label: Label = $PromptPanel/PromptLabel
@onready var pressure_label: Label = $PressurePanel/PressureLabel
@onready var status_label: Label = $StatusPanel/StatusLabel
@onready var modal: PanelContainer = $Modal
@onready var modal_title: Label = $Modal/Margin/VBox/Title
@onready var modal_body: RichTextLabel = $Modal/Margin/VBox/Body
@onready var fish_preview_center: CenterContainer = $Modal/Margin/VBox/FishPreviewCenter
@onready var fish_preview: TextureRect = $Modal/Margin/VBox/FishPreviewCenter/FishPreview
@onready var modal_actions: VBoxContainer = $Modal/Margin/VBox/Actions
@onready var toast_label: Label = $Toast
@onready var toast_timer: Timer = $ToastTimer

var _world_prompt := "探索办公室，寻找可互动的区域。"
var _status := ""
var _button_styles: Dictionary = {}


func _ready() -> void:
	toast_timer.timeout.connect(_hide_toast)
	_build_button_styles()
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
		modal_title.modulate = Color(1.0, 0.58, 0.44, 1.0)
	else:
		var rarity := str(fish.get("rarity", "common"))
		var body := "%s\n稀有度：%s\n获得：%d 金币\n\n%s" % [fish.get("name", "未知鱼"), _format_rarity(rarity), reward, fish.get("flavor_text", "")]
		_open_modal("鱼获结果", body)
		modal_title.modulate = _get_rarity_color(rarity)
		_set_fish_preview(str(fish.get("id", "")))
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
	modal_title.modulate = Color(1.0, 0.58, 0.44, 1.0) if inspecting else Color(1.0, 0.86, 0.4, 1.0)
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
	_clear_fish_preview()
	modal_closed.emit()


func _refresh_prompt() -> void:
	prompt_label.text = _status if not _status.is_empty() else _world_prompt


func _open_modal(title: String, body: String) -> void:
	modal.visible = true
	modal_title.text = title
	modal_title.modulate = Color.WHITE
	modal_body.text = body
	_clear_fish_preview()
	for child in modal_actions.get_children():
		child.queue_free()


func _format_quest(quest: Dictionary) -> String:
	var status := "进行中"
	if bool(quest.get("claimed", false)):
		status = "已领取"
	elif bool(quest.get("completed", false)):
		status = "可领奖"
	return "【%s】 %s\n%s\n进度：%d / %d · 奖励：%d 金币" % [status, quest.get("title", "委托"), quest.get("description", ""), int(quest.get("progress", 0)), int(quest.get("target", 0)), int(quest.get("reward_coins", 0))]


func _format_shop_item(item: Dictionary) -> String:
	var level := int(item.get("level", 0))
	var max_level := int(item.get("max_level", 0))
	var next_cost := "已满级" if level >= max_level else "下一次价格：%d 金币" % int(item.get("current_cost", 0))
	return "%s · Lv.%d / %d\n%s\n%s" % [item.get("name", "升级"), level, max_level, item.get("description", ""), next_cost]


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
	_apply_button_style(button)
	button.pressed.connect(callback)
	modal_actions.add_child(button)


func _emit_claim(quest_id: String) -> void:
	quest_claim_requested.emit(quest_id)


func _emit_purchase(upgrade_id: String) -> void:
	shop_purchase_requested.emit(upgrade_id)


func _hide_toast() -> void:
	toast_label.visible = false


func _set_fish_preview(fish_id: String) -> void:
	if not FISH_PREVIEW_TEXTURES.has(fish_id):
		_clear_fish_preview()
		return
	fish_preview.texture = FISH_PREVIEW_TEXTURES[fish_id]
	fish_preview_center.visible = true


func _clear_fish_preview() -> void:
	fish_preview.texture = null
	fish_preview_center.visible = false


func _format_rarity(rarity: String) -> String:
	match rarity:
		"rare":
			return "稀有"
		"epic":
			return "史诗"
		"legendary":
			return "传说"
	return "普通"


func _get_rarity_color(rarity: String) -> Color:
	match rarity:
		"rare":
			return Color(0.45, 0.72, 1.0, 1.0)
		"epic":
			return Color(0.76, 0.56, 1.0, 1.0)
		"legendary":
			return Color(1.0, 0.74, 0.28, 1.0)
	return Color(0.9, 0.94, 0.87, 1.0)


func _build_button_styles() -> void:
	_button_styles["normal"] = _make_button_style(Color(0.12, 0.27, 0.28, 1.0), Color(0.3, 0.78, 0.72, 1.0))
	_button_styles["hover"] = _make_button_style(Color(0.18, 0.38, 0.38, 1.0), Color(0.56, 0.94, 0.8, 1.0))
	_button_styles["pressed"] = _make_button_style(Color(0.08, 0.18, 0.2, 1.0), Color(1.0, 0.76, 0.32, 1.0))


func _make_button_style(fill: Color, border: Color) -> StyleBoxFlat:
	var style := StyleBoxFlat.new()
	style.bg_color = fill
	style.border_width_left = 2
	style.border_width_top = 2
	style.border_width_right = 2
	style.border_width_bottom = 2
	style.border_color = border
	style.corner_radius_top_left = 3
	style.corner_radius_top_right = 3
	style.corner_radius_bottom_right = 3
	style.corner_radius_bottom_left = 3
	return style


func _apply_button_style(button: Button) -> void:
	button.add_theme_color_override("font_color", Color(0.93, 0.97, 0.9, 1.0))
	button.add_theme_color_override("font_hover_color", Color.WHITE)
	button.add_theme_stylebox_override("normal", _button_styles["normal"])
	button.add_theme_stylebox_override("hover", _button_styles["hover"])
	button.add_theme_stylebox_override("pressed", _button_styles["pressed"])
