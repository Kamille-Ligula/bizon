function sort_ranks() {
	all_ranks = [[], [], [], [], [], []];
	var j = 0;
	while (j < all_suits[i].length) {
		all_ranks[all_suits[i][j].rank-9] = [all_suits[i][j]];
		j += 1;
	}
	sorted_suit = all_ranks[0];
	u = 1;
	while (u < 6) {
		sorted_suit = sorted_suit.concat(all_ranks[u]);
		u += 1;
	}
}

function sort(id) {
	all_suits = [[], [], [], []];
	
	i = 0;
	while (i < hands[id].length) {
		all_suits[hands[id][i].suit].push(hands[id][i]);
		i += 1;
	}

	i = 0;
	while (i < 4) {
		sort_ranks();
		all_suits[i] = sorted_suit;
		i += 1;
	}

	if (all_suits[3].length != 0) {
		if (all_suits[1].length != 0) {
			hands[id] = all_suits[0];
			hands[id] = hands[id].concat(all_suits[3], all_suits[1], all_suits[2]);
		}
		else {
			hands[id] = all_suits[3];
			hands[id] = hands[id].concat(all_suits[0], all_suits[2]);
		}
	}
	else {
		hands[id] = all_suits[0];
		hands[id] = hands[id].concat(all_suits[2], all_suits[1]);
	}
}