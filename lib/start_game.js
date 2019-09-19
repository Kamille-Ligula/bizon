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

	// show all cards on screen once at the start before the deck has been shuffled, so that they don't need to load one by one ingame.
	for (i = 0; i < deck.length; i++) {
		draw_card(deck[i].draw_rank, deck[i].draw_suit, card_width, card_height, deckX, deckY, true, false);
	}

	deck = shuffle(deck);
	deal("first");
	deal("lastCard");
	timestamp = Date.now()+750;
}

start_game();