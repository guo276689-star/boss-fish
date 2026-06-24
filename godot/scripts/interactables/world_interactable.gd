class_name WorldInteractable
extends Node2D

signal interaction_requested(action_id: String)

@export var action_id := ""
@export var display_name := "互动点"
@export_multiline var prompt_text := "按 E 互动"
@export var interaction_radius := 68.0
@export var accent_color := Color(0.6, 0.8, 0.7, 1.0)

@onready var _label: Label = $Label
@onready var _accent: Polygon2D = $Accent
@onready var _body: Polygon2D = $Body
@onready var _icon: Label = $Icon
@onready var _focus_marker: Label = $FocusMarker


func _ready() -> void:
	_label.text = display_name
	_accent.color = accent_color
	_icon.text = _get_icon_text()
	_focus_marker.modulate = accent_color
	set_focused(false)


func is_available_to(player_position: Vector2) -> bool:
	return global_position.distance_to(player_position) <= interaction_radius


func request_interaction() -> void:
	interaction_requested.emit(action_id)


func set_focused(is_focused: bool) -> void:
	_focus_marker.visible = is_focused
	_body.modulate = Color(1.18, 1.18, 1.18, 1.0) if is_focused else Color.WHITE
	_label.modulate = Color.WHITE if is_focused else Color(0.85, 0.9, 0.84, 1.0)


func _get_icon_text() -> String:
	match action_id:
		"fishing":
			return "钓"
		"tasks":
			return "任"
		"bestiary":
			return "鉴"
		"shop":
			return "店"
		"boss":
			return "门"
	return "◆"
