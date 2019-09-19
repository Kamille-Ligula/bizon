//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

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
				if (table[firstToPlay].rank > table[limAdd(firstToPlay, 1)].rank) {higherlower(firstToPlay, limAdd(firstToPlay, 2));} 
				else { higherlower(limAdd(firstToPlay, 1), limAdd(firstToPlay, 2)); }
			} 
			else if (table[limAdd(firstToPlay, 1)].suit == table[firstToPlay].suit) {higherlower(firstToPlay, limAdd(firstToPlay, 1));} 
			else if (table[limAdd(firstToPlay, 2)].suit == table[firstToPlay].suit) {higherlower(firstToPlay, limAdd(firstToPlay, 2));}
		} 
		else { giveTrickTo(firstToPlay); }
	}
}