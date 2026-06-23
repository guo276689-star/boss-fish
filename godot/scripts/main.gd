extends Node2D

const FISH_DATA_PATH := "res://data/fish.json"

@onready var fishing_spot: FishingSpot = $FishingSpot
@onready var hud: GameHUD = $HUD

var coins := 0
var fish_by_id: Dictionary = {}


func _ready() -> void:
	fish_by_id = _load_fish_catalog()
	fishing_spot.prompt_changed.connect(hud.set_prompt)
	fishing_spot.fishing_requested.connect(_on_fishing_requested)
	hud.set_coins(coins)
	hud.set_prompt("靠近鱼塘边的钓鱼点")


func _on_fishing_requested(fish_id: String) -> void:
	var fish: Dictionary = fish_by_id.get(fish_id, {})
	if fish.is_empty():
		hud.set_prompt("鱼类数据缺失：%s" % fish_id)
		return
	var reward := int(fish.get("coin_reward", 0))
	coins += reward
	hud.set_coins(coins)
	hud.set_prompt("钓到%s，获得 %d 金币" % [fish.get("name", fish_id), reward])


func _load_fish_catalog() -> Dictionary:
	if not FileAccess.file_exists(FISH_DATA_PATH):
		push_error("Fish data file is missing: %s" % FISH_DATA_PATH)
		return {}
	var parsed: Variant = JSON.parse_string(FileAccess.get_file_as_string(FISH_DATA_PATH))
	if not parsed is Array:
		push_error("Fish data must be a JSON array")
		return {}
	var catalog: Dictionary = {}
	for entry in parsed:
		if entry is Dictionary and entry.has("id"):
			catalog[entry.id] = entry
	return catalog
