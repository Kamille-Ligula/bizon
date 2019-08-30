function takeCard() {
	var i;
	if (cardIsTaken == false) {
		cardIsTaken = true;
		if (gamePhase == 0) { trump = grass.suit; };
		hands[player_number].push(grass);
		grass = NaN;
		bizon = player_number;
		i = 0;
		while (i < 2) {
			hands[limAdd(player_number, 2)].push(deck.pop());
			hands[limAdd(player_number, 1)].push(deck.pop());
			hands[limAdd(player_number, 0)].push(deck.pop());
			i += 1;
		}
		hands[limAdd(player_number, 2)].push(deck.pop());
		hands[limAdd(player_number, 1)].push(deck.pop());
		i = 0;
		while (i < 3) {
			sort(i);
			i += 1;
		}
		player_number = limAdd(dealer, 1);
		gamePhase = 2; // actual game
		timestamp = Date.now();
	}
}