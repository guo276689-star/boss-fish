class_name GameHUD
extends CanvasLayer

signal quest_claim_requested(quest_id: String)
signal shop_purchase_requested(upgrade_id: String)
signal modal_closed

const FISH_PREVIEW_TEXTURES := {
	"moyu_goldfish": preload("res://assets/fish/fish_moyu_goldfish.png"),
	"badge_carp": preload("res://assets/fish/fish_badge_carp.png"),
	"coffee_loach": preload("res://assets/fish/fish_coffee_loach.png"),
	"ppt_catfish": preload("res://assets/fish/fish_ppt_catfish.png"),
	"meeting_jellyfish": preload("res://assets/fish/fish_meeting_jellyfish.png"),
	"client_octopus": preload("res://assets/fish/fish_client_octopus.png"),
	"kpi_shark": preload("res://assets/fish/fish_kpi_shark.png"),
	"boss_fish": preload("res://assets/fish/fish_boss_fish.png"),
}

@onready var coin_label: Label = $CoinPanel/CoinLabel
@onready var prompt_label: Label = $PromptPanel/PromptLabel
@onready var boss_alert_icon: Label = $PressurePanel/PressureContent/BossAlertIcon
@onready var pressure_label: Label = $PressurePanel/PressureContent/PressureLabel
@onready var status_icon: Label = $StatusPanel/StatusContent/StatusIcon
@onready var status_label: Label = $StatusPanel/StatusContent/StatusLabel
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
	status_icon.text = _get_status_icon(message)
	status_icon.modulate = _get_status_color(message)
	status_label.modulate = _get_status_color(message)
	status_icon.visible = not message.is_empty()
	status_label.visible = not message.is_empty()
	_refresh_prompt()


func set_pressure(value: int, message: String) -> void:
	pressure_label.text = "老板压力：%d%% · %s" % [value, message]
	pressure_label.modulate = Color(1.0, 0.56, 0.42) if value >= 60 else Color(0.8, 0.86, 0.75)
	boss_alert_icon.text = "!" if value >= 60 else "◆"
	boss_alert_icon.modulate = Color(1.0, 0.28, 0.2) if value >= 60 else Color(0.36, 0.76, 0.7)


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
	var discovered := 0
	for fish in catalog:
		var fish_id := str(fish.get("id", ""))
		var count := int(caught_counts.get(fish_id, 0))
		if count > 0:
			discovered += 1
	_open_modal("办公室图鉴（8 条）", "已发现：%d / %d。锁定卡片会在首次摸到后显示真实图标。" % [discovered, catalog.size()])
	modal_body.custom_minimum_size = Vector2(0, 58)
	_add_bestiary_grid(catalog, caught_counts)
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
	modal_body.custom_minimum_size = Vector2(0, 165)
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


func _add_bestiary_grid(catalog: Array[Dictionary], caught_counts: Dictionary) -> void:
	var grid := GridContainer.new()
	grid.columns = 4
	grid.add_theme_constant_override("h_separation", 8)
	grid.add_theme_constant_override("v_separation", 8)
	for fish in catalog:
		var fish_id := str(fish.get("id", ""))
		var count := int(caught_counts.get(fish_id, 0))
		grid.add_child(_make_bestiary_card(fish, count))
	modal_actions.add_child(grid)


func _make_bestiary_card(fish: Dictionary, count: int) -> PanelContainer:
	var fish_id := str(fish.get("id", ""))
	var rarity := str(fish.get("rarity", "common"))
	var unlocked := count > 0
	var card := PanelContainer.new()
	card.custom_minimum_size = Vector2(138, 88)
	card.add_theme_stylebox_override("panel", _make_card_style(rarity, unlocked))

	var box := VBoxContainer.new()
	box.add_theme_constant_override("separation", 3)
	card.add_child(box)
	var title := str(fish.get("name", fish_id)) if unlocked else "???"
	var footer := "%s · %d 条" % [_format_rarity(rarity), count] if unlocked else "未发现"
	_add_card_label(box, title, _get_rarity_color(rarity), 15)
	_add_card_image(box, fish_id, unlocked)
	_add_card_label(box, footer, Color(0.72, 0.78, 0.78, 1.0), 13)
	return card


func _add_card_image(parent: VBoxContainer, fish_id: String, unlocked: bool) -> void:
	if unlocked and FISH_PREVIEW_TEXTURES.has(fish_id):
		var preview := TextureRect.new()
		preview.custom_minimum_size = Vector2(96, 36)
		preview.texture_filter = 1
		preview.texture = FISH_PREVIEW_TEXTURES[fish_id]
		preview.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
		preview.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
		parent.add_child(preview)
		return
	_add_card_label(parent, "???", Color(0.28, 0.34, 0.36, 1.0), 22)


func _add_card_label(parent: VBoxContainer, text: String, color: Color, font_size: int) -> void:
	var label := Label.new()
	label.text = text
	label.horizontal_alignment = 1
	label.add_theme_color_override("font_color", color)
	label.add_theme_font_size_override("font_size", font_size)
	parent.add_child(label)


func _make_card_style(rarity: String, unlocked: bool) -> StyleBoxFlat:
	var style := StyleBoxFlat.new()
	style.bg_color = Color(0.08, 0.1, 0.13, 0.96) if unlocked else Color(0.045, 0.055, 0.065, 0.96)
	style.border_color = _get_rarity_color(rarity) if unlocked else Color(0.18, 0.22, 0.24, 1.0)
	style.border_width_left = 2
	style.border_width_top = 2
	style.border_width_right = 2
	style.border_width_bottom = 2
	style.content_margin_left = 6.0
	style.content_margin_top = 5.0
	style.content_margin_right = 6.0
	style.content_margin_bottom = 5.0
	return style


func _get_status_icon(message: String) -> String:
	if message.is_empty():
		return ""
	if message.contains("稀有"):
		return "★"
	if message.contains("上钩"):
		return "!"
	if message.contains("准备"):
		return "▶"
	if message.contains("等待"):
		return "≈"
	if message.contains("成功"):
		return "✓"
	if message.contains("失败") or message.contains("跑掉") or message.contains("打断"):
		return "×"
	return "•"


func _get_status_color(message: String) -> Color:
	if message.contains("稀有"):
		return Color(1.0, 0.74, 0.28, 1.0)
	if message.contains("上钩"):
		return Color(1.0, 0.34, 0.24, 1.0)
	if message.contains("成功"):
		return Color(0.44, 0.9, 0.58, 1.0)
	if message.contains("失败") or message.contains("跑掉") or message.contains("打断"):
		return Color(1.0, 0.58, 0.44, 1.0)
	return Color(1.0, 0.86, 0.4, 1.0)


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
