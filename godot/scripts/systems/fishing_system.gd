class_name FishingSystem
extends Node

signal status_changed(message: String)
signal fishing_started
signal fishing_ended
signal result_ready(fish: Dictionary, reward: int)

const IDLE := "idle"
const CASTING := "casting"
const WAITING := "waiting"
const BITE := "bite"
const CAUGHT := "caught"
const RESULT := "result"

var state := IDLE
var _game_state: GameState
var _wait_timer: Timer
var _bite_timer: Timer


func _ready() -> void:
	_wait_timer = _make_timer(_on_wait_finished)
	_bite_timer = _make_timer(_on_bite_expired)


func configure(game_state: GameState) -> void:
	_game_state = game_state


func begin_fishing(boss_inspecting: bool) -> String:
	if boss_inspecting:
		return "老板正在巡查，先离开鱼塘。"
	if state != IDLE:
		return "现在不能重新抛竿。"
	state = CASTING
	status_changed.emit("准备抛竿……")
	fishing_started.emit()
	_begin_waiting_after_cast()
	return ""


func try_reel() -> bool:
	if state == BITE:
		_catch_fish()
		return true
	return state != IDLE


func acknowledge_result() -> void:
	if state != RESULT:
		return
	state = IDLE
	status_changed.emit("")
	fishing_ended.emit()


func interrupt(reason: String) -> void:
	if state == IDLE:
		return
	_wait_timer.stop()
	_bite_timer.stop()
	state = IDLE
	status_changed.emit(reason)
	fishing_ended.emit()


func _begin_waiting_after_cast() -> void:
	await get_tree().create_timer(0.35).timeout
	if state != CASTING or _game_state == null:
		return
	state = WAITING
	status_changed.emit("等待上钩……鱼线轻轻晃动。")
	_wait_timer.start(_game_state.get_wait_seconds())


func _on_wait_finished() -> void:
	if state != WAITING or _game_state == null:
		return
	state = BITE
	status_changed.emit("上钩！快按 E 或 Space 收竿！")
	_bite_timer.start(_game_state.get_hook_window_seconds())


func _on_bite_expired() -> void:
	if state != BITE:
		return
	state = RESULT
	status_changed.emit("收竿失败：鱼跑掉了，下次手快一点！")
	result_ready.emit({}, 0)


func _catch_fish() -> void:
	if _game_state == null:
		interrupt("鱼类数据还没有准备好。")
		return
	_bite_timer.stop()
	state = CAUGHT
	var fish := _game_state.draw_fish()
	if fish.is_empty():
		interrupt("鱼塘今天空空如也。")
		return
	var reward := _game_state.register_catch(fish)
	state = RESULT
	status_changed.emit(_result_message(fish, reward))
	result_ready.emit(fish, reward)


func _result_message(fish: Dictionary, reward: int) -> String:
	var rarity := str(fish.get("rarity", "common"))
	var prefix := ""
	if rarity != "common":
		prefix = "稀有警报！"
	return "%s收竿成功：摸到%s，获得 %d 金币。" % [prefix, fish.get("name", "未知鱼"), reward]


func _make_timer(callback: Callable) -> Timer:
	var timer := Timer.new()
	timer.one_shot = true
	timer.timeout.connect(callback)
	add_child(timer)
	return timer
