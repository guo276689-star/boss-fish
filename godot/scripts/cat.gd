class_name PlayerCat
extends CharacterBody2D

@export var move_speed: float = 190.0

@onready var sprite: Sprite2D = $Sprite2D
@onready var facing_marker: Polygon2D = $FacingMarker

var _facing := Vector2.DOWN


func _physics_process(_delta: float) -> void:
	var direction := Input.get_vector("move_left", "move_right", "move_up", "move_down")
	if direction == Vector2.ZERO:
		direction = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	velocity = direction.normalized() * move_speed
	if direction != Vector2.ZERO:
		_update_facing(direction.normalized())
	move_and_slide()


func _update_facing(direction: Vector2) -> void:
	_facing = direction
	sprite.flip_h = direction.x < 0.0
	facing_marker.rotation = _facing.angle() + PI * 0.5
