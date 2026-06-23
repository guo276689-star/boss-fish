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


func _ready() -> void:
	_label.text = display_name
	_accent.color = accent_color


func is_available_to(player_position: Vector2) -> bool:
	return global_position.distance_to(player_position) <= interaction_radius


func request_interaction() -> void:
	interaction_requested.emit(action_id)
