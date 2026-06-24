class_name InteractionDirector
extends Node

signal prompt_changed(message: String)
signal interaction_requested(action_id: String)

var _player: Node2D
var _current: WorldInteractable


func configure(player: Node2D) -> void:
	_player = player


func _process(_delta: float) -> void:
	if _player == null:
		return
	_set_current(_find_nearest_interactable())


func request_interaction() -> bool:
	if _current == null:
		return false
	interaction_requested.emit(_current.action_id)
	return true


func _find_nearest_interactable() -> WorldInteractable:
	var nearest: WorldInteractable
	var nearest_distance := INF
	for node in get_tree().get_nodes_in_group("interactable"):
		if node is WorldInteractable and node.is_available_to(_player.global_position):
			var distance: float = node.global_position.distance_to(_player.global_position)
			if distance < nearest_distance:
				nearest = node
				nearest_distance = distance
	return nearest


func _set_current(next: WorldInteractable) -> void:
	if next == _current:
		return
	var previous := _current
	_current = next
	if previous != null:
		previous.set_focused(false)
	if _current != null:
		_current.set_focused(true)
	prompt_changed.emit(_current.prompt_text if _current != null else "探索办公室，寻找可互动的区域。")
