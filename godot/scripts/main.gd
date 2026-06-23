extends Node2D

@onready var game_state: GameState = $GameState
@onready var fishing_system: FishingSystem = $FishingSystem
@onready var boss_pressure: BossPressure = $BossPressure
@onready var interaction_director: InteractionDirector = $InteractionDirector
@onready var player: PlayerCat = $Cat
@onready var hud: GameHUD = $HUD


func _ready() -> void:
	game_state.initialize()
	fishing_system.configure(game_state)
	interaction_director.configure(player)
	_connect_systems()
	boss_pressure.restore(game_state.boss_pressure)
	_refresh_hud_state()


func _unhandled_input(event: InputEvent) -> void:
	if not event is InputEventKey or not event.pressed or event.echo:
		return
	if event.is_action_pressed("ui_cancel"):
		hud.close_modal()
		return
	if fishing_system.state != FishingSystem.IDLE:
		if event.is_action_pressed("interact") or event.is_action_pressed("reel"):
			fishing_system.try_reel()
			get_viewport().set_input_as_handled()
		return
	if hud.is_modal_open():
		return
	if event.is_action_pressed("interact") and interaction_director.request_interaction():
		get_viewport().set_input_as_handled()


func _connect_systems() -> void:
	game_state.state_changed.connect(_refresh_hud_state)
	interaction_director.prompt_changed.connect(hud.set_world_prompt)
	interaction_director.interaction_requested.connect(_on_interaction_requested)
	fishing_system.status_changed.connect(hud.set_status)
	fishing_system.fishing_started.connect(_on_fishing_started)
	fishing_system.result_ready.connect(_on_fishing_result_ready)
	boss_pressure.pressure_changed.connect(_on_pressure_changed)
	boss_pressure.inspection_started.connect(_on_inspection_started)
	boss_pressure.inspection_ended.connect(_on_inspection_ended)
	hud.quest_claim_requested.connect(_on_quest_claim_requested)
	hud.shop_purchase_requested.connect(_on_shop_purchase_requested)
	hud.modal_closed.connect(fishing_system.acknowledge_result)


func _on_interaction_requested(action_id: String) -> void:
	match action_id:
		"fishing":
			var error := fishing_system.begin_fishing(boss_pressure.inspecting)
			if not error.is_empty():
				hud.show_toast(error)
		"tasks":
			hud.show_quests(game_state.quests)
		"bestiary":
			hud.show_bestiary(game_state.fish_catalog, game_state.caught_counts)
		"shop":
			hud.show_shop(game_state.get_shop_items(), game_state.coins)
		"boss":
			hud.show_boss_info(boss_pressure.pressure, boss_pressure.inspecting)


func _on_fishing_started() -> void:
	boss_pressure.add_pressure(18)


func _on_fishing_result_ready(fish: Dictionary, reward: int) -> void:
	if not fish.is_empty():
		boss_pressure.add_pressure(12)
	hud.show_fishing_result(fish, reward)


func _on_pressure_changed(value: int, message: String) -> void:
	game_state.set_boss_pressure(value)
	hud.set_pressure(value, message)
	if value >= BossPressure.WARNING_THRESHOLD:
		hud.show_toast(message)


func _on_inspection_started() -> void:
	fishing_system.interrupt("老板巡查打断了摸鱼，先离开鱼塘！")


func _on_inspection_ended() -> void:
	hud.show_toast("老板走远了，可以继续摸鱼。")


func _on_quest_claim_requested(quest_id: String) -> void:
	var result := game_state.claim_quest(quest_id)
	hud.show_toast(str(result.get("message", "")))
	hud.show_quests(game_state.quests)


func _on_shop_purchase_requested(upgrade_id: String) -> void:
	var result := game_state.purchase_upgrade(upgrade_id)
	hud.show_toast(str(result.get("message", "")))
	hud.show_shop(game_state.get_shop_items(), game_state.coins)


func _refresh_hud_state() -> void:
	hud.set_coins(game_state.coins)
