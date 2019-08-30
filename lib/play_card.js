function play_card() {
	if (Number.isNaN(table[player_number]) == true) {
		var cardPosition = hands[player_number].length - 1;
		putOnTable(cardPosition);
	}
}