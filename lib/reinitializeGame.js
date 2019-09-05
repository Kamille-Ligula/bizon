//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

function reinitializeGame() {
	var r, i;

	cardIsTaken = false;
	table = [NaN, NaN, NaN];
	gamePoints = [0, 0, 0];
	text_grass = null;
	trump = null;
	bizon = null;
	latestTrick = [NaN, NaN, NaN];
	timestamp = Date.now();
	dealer = limAdd(dealer, 1);
	player_number = limAdd(dealer, 1);
	firstToPlay = null;

	if (totalPassCount == 6 && trump == undefined) {
		for (i = 0; i < hands[0].length; i++) {
			deck.push(hands[0][i]);
		}
		for (i = 0; i < hands[1].length; i++) {
			deck.push(hands[1][i]);
		}
		for (i = 0; i < hands[2].length; i++) {
			deck.push(hands[2][i]);
		}
		deck.push(grass);

		grass = NaN;
		hands = [[], [], []];
	} else {
		hands = [[], [], []];
		deck = [];

		for (i = 0; i < tricks[0].length; i++) {
			deck.push(tricks[0][i]);
		}
		for (i = 0; i < tricks[1].length; i++) {
			deck.push(tricks[1][i]);
		}
		for (i = 0; i < tricks[2].length; i++) {
			deck.push(tricks[2][i]);
		}
		tricks = [[], [], []];
	}

	totalPassCount = 0;
	deck = reshuffle(deck);
	deal("first");
	deal("lastCard");
	gamePhase = 0; // first bidding
}

function reinitializeSet() {
	setPoints = [0, 0, 0];
	setPointsDraw = [["-->"], ["-->"], ["-->"]];
	howManySetWinners = 0;
	setWinner = 0;
	setLooser = 0;
}