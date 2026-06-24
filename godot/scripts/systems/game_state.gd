class_name GameState
extends Node

signal state_changed

const FISH_DATA_PATH := "res://data/fish.json"
const QUEST_DATA_PATH := "res://data/quests.json"
const SHOP_DATA_PATH := "res://data/shop_upgrades.json"

const RARITY_RANK := {
	"common": 0,
	"rare": 1,
	"epic": 2,
	"legendary": 3,
}

var coins := 0
var caught_counts: Dictionary = {}
var quests: Array[Dictionary] = []
var upgrade_levels: Dictionary = {}
var boss_pressure := 0

var fish_catalog: Array[Dictionary] = []
var quest_templates: Array[Dictionary] = []
var upgrade_templates: Array[Dictionary] = []

var _fish_by_id: Dictionary = {}
var _upgrade_by_id: Dictionary = {}
var _save_service := SaveService.new()
var _random := RandomNumberGenerator.new()


func initialize() -> void:
	_random.randomize()
	fish_catalog = _load_data_array(FISH_DATA_PATH)
	quest_templates = _load_data_array(QUEST_DATA_PATH)
	upgrade_templates = _load_data_array(SHOP_DATA_PATH)
	_index_static_data()
	_build_default_state()
	_apply_saved_state(_save_service.load_state())
	state_changed.emit()


func draw_fish() -> Dictionary:
	var total_weight := 0.0
	for fish in fish_catalog:
		total_weight += _fish_weight(fish)
	if total_weight <= 0.0:
		return {}
	var roll := _random.randf_range(0.0, total_weight)
	for fish in fish_catalog:
		roll -= _fish_weight(fish)
		if roll <= 0.0:
			return fish.duplicate(true)
	return fish_catalog.back().duplicate(true)


func register_catch(fish: Dictionary) -> int:
	var reward := int(fish.get("base_price", 0))
	var fish_id := str(fish.get("id", ""))
	coins += reward
	caught_counts[fish_id] = int(caught_counts.get(fish_id, 0)) + 1
	_advance_quests(fish, reward)
	_save_and_notify()
	return reward


func claim_quest(quest_id: String) -> Dictionary:
	for quest in quests:
		if str(quest.get("id", "")) != quest_id:
			continue
		if not bool(quest.get("completed", false)):
			return {"success": false, "message": "委托还没有完成。"}
		if bool(quest.get("claimed", false)):
			return {"success": false, "message": "这份奖励已经领过了。"}
		var reward := int(quest.get("reward_coins", 0))
		quest["claimed"] = true
		coins += reward
		_save_and_notify()
		return {"success": true, "message": "领取了 %d 金币委托奖励。" % reward}
	return {"success": false, "message": "找不到这份委托。"}


func purchase_upgrade(upgrade_id: String) -> Dictionary:
	var template: Dictionary = _upgrade_by_id.get(upgrade_id, {})
	if template.is_empty():
		return {"success": false, "message": "升级数据不存在。"}
	var level := int(upgrade_levels.get(upgrade_id, 0))
	if level >= int(template.get("max_level", 0)):
		return {"success": false, "message": "该升级已经满级。"}
	var cost := get_upgrade_cost(upgrade_id)
	if coins < cost:
		return {"success": false, "message": "金币不足，需要 %d 金币。" % cost}
	coins -= cost
	upgrade_levels[upgrade_id] = level + 1
	_save_and_notify()
	return {"success": true, "message": "%s 升到 Lv.%d。" % [template.get("name", upgrade_id), level + 1]}


func get_upgrade_cost(upgrade_id: String) -> int:
	var template: Dictionary = _upgrade_by_id.get(upgrade_id, {})
	var level := int(upgrade_levels.get(upgrade_id, 0))
	return int(template.get("cost", 0)) * (level + 1)


func get_shop_items() -> Array[Dictionary]:
	var items: Array[Dictionary] = []
	for template in upgrade_templates:
		var item := template.duplicate(true)
		var upgrade_id := str(item.get("id", ""))
		item["level"] = int(upgrade_levels.get(upgrade_id, 0))
		item["current_cost"] = get_upgrade_cost(upgrade_id)
		items.append(item)
	return items


func get_wait_seconds() -> float:
	var reduced := get_effect_total("wait_seconds_reduction")
	return maxf(0.65, _random.randf_range(1.35, 2.35) - reduced)


func get_hook_window_seconds() -> float:
	return 1.45 + get_effect_total("hook_window_bonus")


func set_boss_pressure(value: int) -> void:
	boss_pressure = clampi(value, 0, 100)
	_save_and_notify()


func get_effect_total(effect_key: String) -> float:
	var total := 0.0
	for template in upgrade_templates:
		var upgrade_id := str(template.get("id", ""))
		var effect: Dictionary = template.get("effect", {})
		total += float(effect.get(effect_key, 0.0)) * int(upgrade_levels.get(upgrade_id, 0))
	return total


func _load_data_array(path: String) -> Array[Dictionary]:
	if not FileAccess.file_exists(path):
		return []
	var parsed: Variant = JSON.parse_string(FileAccess.get_file_as_string(path))
	if not parsed is Array:
		return []
	var entries: Array[Dictionary] = []
	for entry in parsed:
		if entry is Dictionary:
			entries.append(entry.duplicate(true))
	return entries


func _index_static_data() -> void:
	for fish in fish_catalog:
		_fish_by_id[str(fish.get("id", ""))] = fish
	for upgrade in upgrade_templates:
		_upgrade_by_id[str(upgrade.get("id", ""))] = upgrade


func _build_default_state() -> void:
	coins = 0
	caught_counts.clear()
	upgrade_levels.clear()
	quests.clear()
	boss_pressure = 0
	for template in quest_templates:
		var quest := template.duplicate(true)
		quest["progress"] = 0
		quest["completed"] = false
		quest["claimed"] = false
		quests.append(quest)


func _apply_saved_state(saved: Dictionary) -> void:
	if saved.is_empty():
		return
	coins = max(0, int(saved.get("coins", 0)))
	boss_pressure = clampi(int(saved.get("boss_pressure", 0)), 0, 100)
	_apply_caught_counts(saved.get("caught_counts", {}))
	_apply_upgrade_levels(saved.get("upgrade_levels", {}))
	_apply_quest_progress(saved.get("quests", []))


func _apply_caught_counts(saved_counts: Variant) -> void:
	if not saved_counts is Dictionary:
		return
	for fish_id in saved_counts:
		if _fish_by_id.has(str(fish_id)):
			caught_counts[str(fish_id)] = max(0, int(saved_counts[fish_id]))


func _apply_upgrade_levels(saved_levels: Variant) -> void:
	if not saved_levels is Dictionary:
		return
	for upgrade_id in saved_levels:
		var template: Dictionary = _upgrade_by_id.get(str(upgrade_id), {})
		if not template.is_empty():
			upgrade_levels[str(upgrade_id)] = clampi(int(saved_levels[upgrade_id]), 0, int(template.get("max_level", 0)))


func _apply_quest_progress(saved_quests: Variant) -> void:
	if not saved_quests is Array:
		return
	var saved_by_id: Dictionary = {}
	for saved_quest in saved_quests:
		if saved_quest is Dictionary:
			saved_by_id[str(saved_quest.get("id", ""))] = saved_quest
	for quest in quests:
		var saved: Dictionary = saved_by_id.get(str(quest.get("id", "")), {})
		if not saved.is_empty():
			quest["progress"] = clampi(int(saved.get("progress", 0)), 0, int(quest.get("target", 0)))
			quest["completed"] = bool(saved.get("completed", false))
			quest["claimed"] = bool(saved.get("claimed", false))


func _fish_weight(fish: Dictionary) -> float:
	var multiplier := 1.0
	if str(fish.get("rarity", "common")) != "common":
		multiplier += get_effect_total("rare_weight_bonus")
	return maxf(1.0, float(fish.get("weight", 1))) * multiplier


func _advance_quests(fish: Dictionary, reward: int) -> void:
	for quest in quests:
		if bool(quest.get("claimed", false)):
			continue
		var progress := int(quest.get("progress", 0))
		match str(quest.get("type", "")):
			"catch_count":
				progress += 1
			"earn_coins":
				progress += reward
			"catch_rarity":
				if _rarity_matches(fish, str(quest.get("target_rarity", "rare"))):
					progress += 1
		quest["progress"] = mini(progress, int(quest.get("target", 0)))
		quest["completed"] = int(quest["progress"]) >= int(quest.get("target", 0))


func _rarity_matches(fish: Dictionary, target_rarity: String) -> bool:
	var fish_rank := int(RARITY_RANK.get(str(fish.get("rarity", "common")), 0))
	var target_rank := int(RARITY_RANK.get(target_rarity, 1))
	return fish_rank >= target_rank


func _save_and_notify() -> void:
	_save_service.save_state(_serialize_state())
	state_changed.emit()


func _serialize_state() -> Dictionary:
	return {
		"coins": coins,
		"caught_counts": caught_counts,
		"quests": quests,
		"upgrade_levels": upgrade_levels,
		"boss_pressure": boss_pressure,
	}
