class_name SaveService
extends RefCounted

const SAVE_PATH := "user://boss_fish_v0_3_save.json"
const LEGACY_SAVE_PATH := "user://boss_fish_v0_2_save.json"


func load_state() -> Dictionary:
	var current := _read_state(SAVE_PATH)
	if not current.is_empty():
		return current
	var legacy := _read_state(LEGACY_SAVE_PATH)
	if legacy.is_empty():
		return {}
	save_state(legacy)
	return legacy


func save_state(state: Dictionary) -> bool:
	var file := FileAccess.open(SAVE_PATH, FileAccess.WRITE)
	if file == null:
		return false
	file.store_string(JSON.stringify(state))
	return true


func _read_state(path: String) -> Dictionary:
	if not FileAccess.file_exists(path):
		return {}
	var file := FileAccess.open(path, FileAccess.READ)
	if file == null:
		return {}
	var parsed: Variant = JSON.parse_string(file.get_as_text())
	return parsed if parsed is Dictionary else {}
