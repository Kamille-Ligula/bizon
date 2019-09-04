//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

function start_game() {
	var r,
		i,
		draw_ranks = ['9', '10', 'J', 'Q', 'K', 'A'],
		draw_suits = ['heart', 'diamond', 'club', 'spade'],
		ranks = [9, 10, 11, 12, 13, 14],
		suits = [0, 1, 2, 3],
		draw_rank,
		draw_suit;

	i = 0;
	for (r of ranks) {
		for (s of suits) {
			draw_rank = draw_ranks[r - 9];
			draw_suit = draw_suits[s];
			rank = ranks[r - 9];
			suit = suits[s];

			deck.push(new Card(draw_rank, draw_suit, rank, suit));

			i += 1;
		}
	}

	deck = shuffle(deck);
	deal("first");
	deal("lastCard");
}