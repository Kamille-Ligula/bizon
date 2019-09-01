function deal(which) {
	var i, n,
		how_many_cards;

	if (which == "first") {
		for (how_many_cards = 3; how_many_cards > 1; how_many_cards--) {
			for (i = 1; i < 4; i++) {
				for (n = 0; n < how_many_cards; n++) {
					hands[limAdd(dealer, i)].push(deck.pop());
				}
			}
		}
	} else if (which == "second") {
		for (i = 1; i < 4; i++) {
			for (n = 0; n < 3; n++) {
				if (limAdd(dealer, i) == bizon) {
					n++;
				}
				hands[limAdd(dealer, i)].push(deck.pop());
			}
		}
	} else if (which == "lastCard") {
		grass = deck.shift();
		text_grass = grass;
	}

	for (r = 0; r < 3 ; r++) {
		sort(r);
	}
}