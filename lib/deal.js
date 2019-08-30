function deal() {
	var i = 0;
	while (i < 5) {
		hands[0].push(deck.pop());
		hands[1].push(deck.pop());
		hands[2].push(deck.pop());
		i += 1;
	}
}