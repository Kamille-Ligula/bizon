function has(rank, suit, array) {
	// is there a card with said RANK and SUIT in this ARRAY?
	var i,
			status;

	status = false;

	for (i = 0; i < array.length; i++) {
		if (array[i].rank == rank && array[i].suit == suit) {status = true}
	}

	return status;
}

function how_many(element, array) {
	// check how many occurences of an element (either a rank or suit) there are in an array
	var amount = 0;
	var i = 0;

	if (array.length != 0) {
		while (i < array.length) {
			if (array[i].rank == element || array[i].suit == element) {
				amount += 1;
			}
			i += 1;
		}
	}

	return amount;
}

function count_points(card_rank) {
	// careful: the item can be either an array or a number
	var points = 0;

	var witness = card_rank - 10;
	if (witness > 0) {
		points = witness;
	}

	return points;
}

function shuffle(array) {
	var length,
		index,
		temp;

	length = array.length;
	while (length > 0) {
		index = Math.floor(Math.random() * length);
		length -= 1;
		temp = array[length];
		array[length] = array[index];
		array[index] = temp;
	}
	return array;
}

function reshuffle(array) {
	/*
	this function is not supposed to shuffle perfectly, in order to simulate a normal trick-taking game shuffle
	(that is one that does not to break the tricks too much), so that everyone's hands make more sense in game.
	split array into 5 element chunks
	shuffle them
	split array into 4 element chunks
	shuffle them
	split array into 3 element chunks
	shuffle them
	*/
	var i,
		j,
		temparray,
		chunk,
		merged;

	for (chunk = 5; chunk > 2; chunk--) {
		temparray = [];
		for (i = 0, j = array.length; i < j; i += chunk) {
			temparray.push(array.slice(i, i + chunk));
		}
		temparray = shuffle(temparray);
		array = [].concat.apply([], temparray);
	}

	return array;
}

///////////////////////////////
/*
function play_card() {
	if (Number.isNaN(table[player_number]) == true) {
		var cardPosition = hands[player_number].length - 1;
		putOnTable(cardPosition);
	}
}
*/
function pass() {
	totalPassCount += 1;
	player_number = limAdd(player_number, 1, 3);
	timestamp = Date.now();
}

function takeCard() {
	var i;
	if (cardIsTaken == false) {
		cardIsTaken = true;
		if (gamePhase == 0) { trump = grass.suit; };
		hands[player_number].push(grass);
		grass = NaN;
		bizon = player_number;

		deal("second");
		player_number = limAdd(dealer, 1, 3);
		gamePhase = 2; // actual game
		timestamp = Date.now();
	}
}

function putOnTable(cardPositionID) {
	if (Number.isNaN(table[0]) == true && Number.isNaN(table[1]) == true && Number.isNaN(table[2]) == true) {
		firstToPlay = player_number;
	}
	table[player_number] = (hands[player_number][cardPositionID]);
	//document.getElementById("additionalComment").innerHTML = "table[player_number]: "+table[player_number].suit;
	hands[player_number].splice(cardPositionID, 1);
	player_number = limAdd(player_number, 1, 3);
	timestamp = Date.now();
}

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
	dealer = limAdd(dealer, 1, 3);
	player_number = limAdd(dealer, 1, 3);
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

function countGP() {
	var winner_array = [false, false, false];
	var number_of_winners = 0;

	if (totalPassCount == 6 && trump == undefined) {
		//document.getElementById("gamePhase").innerHTML = "yo";
		setPointsDraw[0].push("   0");
		setPointsDraw[1].push("   0");
		setPointsDraw[2].push("   0");
	} else {
		for (i = 0; i < tricks[0].length; i++) {
			if (tricks[0][i].rank != 9) {gamePoints[0] += tricks[0][i].rank - 10;}
		}
		for (i = 0; i < tricks[1].length; i++) {
			if (tricks[1][i].rank != 9) {gamePoints[1] += tricks[1][i].rank - 10;}
		}
		for (i = 0; i < tricks[2].length; i++) {
			if (tricks[2][i].rank != 9) {gamePoints[2] += tricks[2][i].rank - 10;}
		}

		//document.getElementById("gamePhase").innerHTML = gamePoints[0];
		//document.getElementById("totalPassCount").innerHTML = gamePoints[1];
		//document.getElementById("additionalComment").innerHTML = gamePoints[2];
		for (i = 0; i < 3; i++) {
			if (gamePoints[i] == Math.max(...gamePoints)) {
				winner_array[i] = true;
			}
		}

		for (i = 0; i < 3; i++) {
			if (winner_array[i] == true) {
				number_of_winners += 1
			}
		}

		//document.getElementById("details").innerHTML = tricks[2].draw_rank;
		//document.getElementById("mouse_xy").innerHTML = victory_status;

		if (winner_array[bizon] == false) {
			// the bizon lost
			if (gamePoints[bizon] > 0) {
				setPoints[bizon] = setPoints[bizon] - 5;
				setPointsDraw[bizon].push("  -5");
			}
			else {
				setPoints[bizon] = setPoints[bizon] - 10;
				setPointsDraw[bizon].push("-10");
			}
			setPoints[limAdd(bizon, 1, 3)] = setPoints[limAdd(bizon, 1, 3)] + 3;
			setPoints[limAdd(bizon, 2, 3)] = setPoints[limAdd(bizon, 2, 3)] + 3;
			setPointsDraw[limAdd(bizon, 1, 3)].push("   3");
			setPointsDraw[limAdd(bizon, 2, 3)].push("   3");
			victory_status = false;
		} else {
			if (number_of_winners == 1) {
				// the bizon won alone
				if (gamePoints[bizon] < 40) {
					setPoints[bizon] = setPoints[bizon] + 3;
					setPointsDraw[bizon].push("   3");
				} else {
					setPoints[bizon] = setPoints[bizon] + 10;
					setPointsDraw[bizon].push(" 10");
				}
				setPointsDraw[limAdd(bizon, 1, 3)].push("   0");
				setPointsDraw[limAdd(bizon, 2, 3)].push("   0");
				victory_status = true;
			} else {
				// the bizon is ex-aequo with someone else
				setPoints[0] = setPoints[0] + 1;
				setPoints[1] = setPoints[1] + 1;
				setPoints[2] = setPoints[2] + 1;
				setPointsDraw[0].push("   1");
				setPointsDraw[1].push("   1");
				setPointsDraw[2].push("   1");
				victory_status = null;
			}
		}
	}
}

function countSP() {
	var i;

	setWinnerPoints = Math.max(...setPoints);
	howManySetWinners = 0;

	for (i = 0; i < 3; i++) {
		if (setPoints[i] == setWinnerPoints) {
			howManySetWinners += 1;
		}
	}

	setWinner = setPoints.indexOf(setWinnerPoints);
	setLooser = setPoints.indexOf(Math.min(...setPoints));
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

		for (i = 0; i < hands[player_number].length; i++) {
			if (hands[player_number][i].rank == 14 && hands[player_number][i].suit != grass.suit) {
				memo_suit = hands[player_number][i].suit;
			}
		}

		if (memo_suit != undefined) {
			for (i = 0; i < hands[player_number].length; i++) {
				if ((hands[player_number][i].rank == 13 || hands[player_number][i].rank == 12)
					&& (hands[player_number][i].suit == memo_suit)) {
					trump = memo_suit;
					takeCard();
				}
			}
		}

		for (suit = 0; suit < 4; suit++) {
			if (how_many(suit, hands[player_number]) > 2 && suit != grass.suit) {
				if (cardIsTaken == false) {
					trump = suit;
					takeCard();
				}
			}
		}

		if (cardIsTaken == false) {
			pass()
		}
	}
}

function deal(which) {
	var i, n, r,
		how_many_cards;

	if (which == "first") {
		for (how_many_cards = 3; how_many_cards > 1; how_many_cards--) {
			for (i = 1; i < 4; i++) {
				for (n = 0; n < how_many_cards; n++) {
					hands[limAdd(dealer, i, 3)].push(deck.pop());
				}
			}
		}
	} else if (which == "second") {
		for (i = 1; i < 4; i++) {
			for (n = 0; n < 3; n++) {
				if (limAdd(dealer, i, 3) == bizon) {
					n++;
				}
				hands[limAdd(dealer, i, 3)].push(deck.pop());
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

function giveTrickTo(playerID) {
	// give the trick to playerID
	//document.getElementById("totalPassCount").innerHTML = table[0];

	//check bizon's suit following status
	if (table[bizon].suit == table[firstToPlay].suit) {
		bizon_followed_suit_history[table[firstToPlay].suit] = true
	}
	else {
		bizon_followed_suit_history[table[firstToPlay].suit] = false
	}

	temp_table = [...table];
	tricks[playerID].push(temp_table[0], temp_table[1], temp_table[2]);
	latestTrick = [...table];
	table = [NaN, NaN, NaN];
	player_number = playerID;
}

function higherlower(one, two) {
	if (table[one].rank > table[two].rank) { giveTrickTo(one); }
	else { giveTrickTo(two); }
}

function emptyTable(){
	timestamp = Date.now();
	if (how_many(trump, table) >= 1) {
		if (table[0].suit == trump) {
			if (table[1].suit == trump) {
				if (table[2].suit == trump) {
					if (table[0].rank > table[1].rank) { higherlower(0,2); }
					else { higherlower(1,2); }
				}
				else { higherlower(0,1); }
			}
			else {
				if (table[2].suit == trump) { higherlower(0,2); }
				else { giveTrickTo(0); }
			}
		}
		else if (table[1].suit == trump) {
			if (table[2].suit == trump) { higherlower(1,2); }
			else { giveTrickTo(1);}
		}
		else if (table[2].suit == trump) { giveTrickTo(2);}
	}
	else {
		if (how_many(table[firstToPlay].suit, table) > 1) {
			if (how_many(table[firstToPlay].suit, table) == 3) {
				if (table[firstToPlay].rank > table[limAdd(firstToPlay, 1, 3)].rank) {higherlower(firstToPlay, limAdd(firstToPlay, 2, 3));}
				else { higherlower(limAdd(firstToPlay, 1, 3), limAdd(firstToPlay, 2, 3)); }
			}
			else if (table[limAdd(firstToPlay, 1, 3)].suit == table[firstToPlay].suit) {higherlower(firstToPlay, limAdd(firstToPlay, 1, 3));}
			else if (table[limAdd(firstToPlay, 2, 3)].suit == table[firstToPlay].suit) {higherlower(firstToPlay, limAdd(firstToPlay, 2, 3));}
		}
		else { giveTrickTo(firstToPlay); }
	}
}

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
