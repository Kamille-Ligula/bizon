function takeCard() {
	var i;
	if (cardIsTaken == false) {
		cardIsTaken = true;
		if (gamePhase == 0) { trump = grass.suit; };
		hands[player_number].push(grass);
		grass = NaN;
		bizon = player_number;

		deal("second");
		player_number = limAdd(dealer, 1);
		gamePhase = 2; // actual game
		timestamp = Date.now();
	}
}