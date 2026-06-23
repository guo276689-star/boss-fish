class_name GameHUD
extends CanvasLayer

@onready var coin_label: Label = $CoinPanel/CoinLabel
@onready var prompt_label: Label = $PromptPanel/PromptLabel


func set_coins(value: int) -> void:
	coin_label.text = "金币：%d" % value


func set_prompt(message: String) -> void:
	prompt_label.text = message
