//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

function count_points(card_rank) {
	// careful: the item can be either an array or a number
	var points = 0;

	var witness = card_rank - 10;
	if (witness > 0) {
		points = witness;
	}

	return points;
}

function lookAtGrass() {
	var i,
		suit,
		memo_suit;
		
	if (gamePhase == 0) {
		if (grass.rank == 14) {
			// cpu might want to think twice before refusing...
			if (how_many(grass.suit, hands[player_number]) >= 2) { takeCard() } else { pass() };
		}
		else {
			if (how_many(grass.suit, hands[player_number]) == 2) {
				var points = 0;
				i = 0;
				while (i < hands[player_number].length) {
					points += count_points(hands[player_number][i].rank);
					i += 1;
				}
				points += count_points(grass.rank)
				if (points >= 10) { takeCard() } else { pass() };
			}
			else {
				if (how_many(grass.suit, hands[player_number]) >= 3) { takeCard() } else { pass() };
			}
		}
	} else if (gamePhase == 1) {
		// what happens during second bidding
		// CPU has already looked at flop and needs to decide whether to pick the trump freely or not.
		// It CANNOT pick the flop card's suit anymore.

		i = 0;
		while (i < hands[player_number].length) {
			if (hands[player_number][i].rank == 14 && hands[player_number][i].suit != grass.suit) {
				memo_suit = hands[player_number][i].suit;
			}
			i += 1;
		}
		
		i = 0;
		if (memo_suit != undefined) {
			while (i < hands[player_number].length) {
				if ((hands[player_number][i].rank == 13 || hands[player_number][i].rank == 12) 
					&& (hands[player_number][i].suit == memo_suit)) {
					trump = memo_suit;
					takeCard();
				}
				i += 1;
			}
		}

		suit = 0;
		while (suit < 4) {
			if (how_many(suit, hands[player_number]) >= 3 && suit != grass.suit) {
				trump = suit;
				takeCard();
			}
			suit += 1;
		}

		if (cardIsTaken == false) {
			pass()
		}
	}
}