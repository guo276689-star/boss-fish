class_name FishingSpot
extends Area2D

signal prompt_changed(message: String)
signal fishing_requested(fish_id: String)

@export var fish_id: String = "moyu_goldfish"

var player_in_range := false


func _ready() -> void:
	body_entered.connect(_on_body_entered)
	body_exited.connect(_on_body_exited)


func _unhandled_input(event: InputEvent) -> void:
	if not player_in_range or not event.is_action_pressed("interact"):
		return
	fishing_requested.emit(fish_id)
	get_viewport().set_input_as_handled()


func _on_body_entered(body: Node2D) -> void:
	if not body.is_in_group("player"):
		return
	player_in_range = true
	prompt_changed.emit("按 E 在办公室鱼塘摸一条鱼")


func _on_body_exited(body: Node2D) -> void:
	if not body.is_in_group("player"):
		return
	player_in_range = false
	prompt_changed.emit("靠近鱼塘边的钓鱼点")
