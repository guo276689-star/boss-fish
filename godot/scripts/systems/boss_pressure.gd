class_name BossPressure
extends Node

signal pressure_changed(value: int, message: String)
signal inspection_started
signal inspection_ended

const WARNING_THRESHOLD := 60
const INSPECTION_THRESHOLD := 100

var pressure := 0
var inspecting := false
var _inspection_timer: Timer


func _ready() -> void:
	_inspection_timer = Timer.new()
	_inspection_timer.one_shot = true
	_inspection_timer.timeout.connect(_finish_inspection)
	add_child(_inspection_timer)


func restore(value: int) -> void:
	pressure = clampi(value, 0, INSPECTION_THRESHOLD - 1)
	_emit_pressure()


func add_pressure(amount: int) -> void:
	if inspecting:
		return
	pressure = clampi(pressure + amount, 0, INSPECTION_THRESHOLD)
	_emit_pressure()
	if pressure >= INSPECTION_THRESHOLD:
		_start_inspection()


func _start_inspection() -> void:
	inspecting = true
	pressure = INSPECTION_THRESHOLD
	pressure_changed.emit(pressure, "老板巡查中：停止摸鱼，离开鱼塘！")
	inspection_started.emit()
	_inspection_timer.start(6.0)


func _finish_inspection() -> void:
	inspecting = false
	pressure = 25
	pressure_changed.emit(pressure, "老板走远了，可以继续摸鱼。")
	inspection_ended.emit()


func _emit_pressure() -> void:
	var message := "老板暂时没注意到你。"
	if pressure >= WARNING_THRESHOLD:
		message = "老板好像在靠近……"
	pressure_changed.emit(pressure, message)
