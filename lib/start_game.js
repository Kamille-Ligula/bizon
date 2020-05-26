function preload() {
	var i;

	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image();
		images[i].src = preload.arguments[i];
	}
}

function start_game() {
	var ranks = ['9', '10', 'J', 'Q', 'K', 'A'],
			suits = ['heart', 'diamond', 'club', 'spade'],
			r, s;

  for (r=0; r<ranks.length; r++) {
    for (s=0; s<suits.length; s++) {
      deck.push(new Card(r+9, s, ranks[r], suits[s]));
			imageSource.push('img/sam/'+suits[s]+'_'+ranks[r]+'.png');
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
