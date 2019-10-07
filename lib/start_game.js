//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

function preload() {
	var i;

	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image();
		images[i].src = preload.arguments[i];
	}
}

function start_game() {
	var draw_ranks = ['9', '10', 'J', 'Q', 'K', 'A'],
		draw_suits = ['heart', 'diamond', 'club', 'spade'],
		ranks = [9, 10, 11, 12, 13, 14],
		suits = [0, 1, 2, 3],
		draw_rank,
		draw_suit;

	for (r of ranks) {
		for (s of suits) {
			draw_rank = draw_ranks[r - 9];
			draw_suit = draw_suits[s];
			rank = ranks[r - 9];
			suit = suits[s];

			deck.push(new Card(draw_rank, draw_suit, rank, suit));
			imageSource.push('img/'+draw_suit+'_'+draw_rank+'.png');
		}
	}

	imageSource.push(		
		'img/smallbox.png',
		'img/box.png',
		'img/dealer.png',
		'img/back.png'
	);

	preload.apply(this, imageSource);

	deck = shuffle(deck);
	deal("first");
	deal("lastCard");
	timestamp = Date.now()+750;
}

start_game();