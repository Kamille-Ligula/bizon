function highest_card_from(suit, array) {
	var a,
		i,
		rank,
		arrayClone,
		mem;

	arrayClone = [...array];

	a = [];
	for (i = 0; i < arrayClone.length; i++) {
		if (arrayClone[i].suit == suit) {
			a.push(arrayClone[i].rank);
		}
	}

	a.sort(function(a, b){return a - b});

	for (rank = 14; a[a.length-1] == rank; rank--) {
		mem = a.pop();
	}

	if (mem == undefined) {
		mem = 15;
	}

	return mem;
}

function limited(original_value, increase) {
	var item,
		table_suit;

	if (table_count != 3) {
		table_suit = table[firstToPlay].suit;
	} else {
		table_suit = undefined;
	}

	item = 0;

	if (must_follow_suit == true) {
		item = table_suit;
	} else {
		item = original_value + increase;
		if (item == trump) {item += 1}
	}

	return item;
}

function select_card(rank, suit) {
	var i,
		cardPosition;

	if (played_card == undefined) {
		for (i = 0; i < hands[player_number].length; i++) {
			if (hands[player_number][i].rank == rank && hands[player_number][i].suit == suit) {
				played_card = hands[player_number][i];
			}
		}

		cardPosition = hands[player_number].indexOf(played_card);
		putOnTable(cardPosition);
	}
}

function bizon_can_follow_suit() {
	var mem;

	if (bizon_followed_suit_history[table[firstToPlay].suit] != false && how_many(table[firstToPlay].suit, all_tricks) <= 2) {
		mem = true;
	}
	else {
		mem = false;
	}

	return mem;
}

function missing_cards_from(suit, array) {
	var missing_cards = [],
		i;

	for (i = 9; i < 15; i++) {
		if (has(i, suit, array) == true) {
			missing_cards.push(null)
		}
		else {
			missing_cards.push(i)
		}
	}

	return missing_cards
}

function give_points_on_low_trump() {
	var i,
		validator;

	validator = 0;
	if (table[firstToPlay].suit == trump) {
		for (i = 0; i < tricks_and_table; i++) {
			if (tricks_and_table[i].suit == trump) {
				validator++;
			}
		}
		if (validator < 6) {
			// keeping these two ifs separated is important because the first checks that the second is not going to fail
			if (Math.max(missing_cards_from(trump, tricks_and_table)) > table[firstToPlay].rank) {
				give_points();
			}
		}
	}
}

function take_with_master() {
	//alert("take_with_master");
	if (how_many(table[firstToPlay].suit, all_tricks) == 0) {
		if (how_many(table[firstToPlay].suit, hands[player_number]) > 2 && how_many(table[firstToPlay].suit, hands[player_number]) < 5) {
			play_master();
		} else {
			if (how_many(trump, hands[player_number]) >= 2 && masters_in_hand.length >= 2) {
				play_master();
			}
		}
	}
	//alert(played_card);
}
/*
function discard_dry_card() {
	suit = limited(0, 0);
	break_loop = false;
	while (suit < 4 && played_card == undefined && break_loop == false) {
		if (how_many(suit, hands[player_number]) == 1) {
			rank = 9;
			while (rank < 15 && played_card == undefined) {
				if (has(rank, suit, hands[player_number]) == true) {
					select_card(rank, suit);
				}
				rank += 1;
			}
		}
		suit = limited(suit, 1);
		if (must_follow_suit == true) {
			break_loop = true;
		}
	}
}

function play_supported_ace() {
	suit = limited(0, 0);
	break_loop = false;
	while (suit < 4 && played_card == undefined && break_loop == false) {
		if (has(14, suit, hands[player_number]) == true) {
			if (has(13, suit, hands[player_number]) == true || has(13, suit, tricks_and_table) == true || how_many(suit, hands[player_number]) >= 3) {
				select_card(14, suit);
			}
		}
		suit = limited(suit, 1);
		break_loop = true if (must_follow_suit == true);
	}
}
*/
function try_make_master() {
	var suit,
		break_loop,

	suit = limited(0, 0);
	break_loop = false;
	while (suit < 4 && played_card == undefined && break_loop == false) {
		if (has(13, suit, hands[player_number]) == true && has(14, suit, hands[player_number]) == false && has(14, suit, all_tricks) == false) {
			play_this_suit = suit;
			play_low();
		}
		suit = limited(suit, 1);
		if (must_follow_suit == true) {
			break_loop = true
		}
	}
}

function follow_suit_play_high() {
	var try_to_play;

	if (has(14, table[firstToPlay].suit, hands[player_number]) == true) {
		select_card(14, table[firstToPlay].suit);
	}

	try_to_play = 13;
	while (try_to_play > 8) {
		if (has(try_to_play, table[firstToPlay].suit, hands[player_number]) == true && has(try_to_play+1, table[firstToPlay].suit, all_tricks) == true) {
			select_card(try_to_play, table[firstToPlay].suit)
		}
		try_to_play -= 1;
	}
}

function follow_suit_just_higher() {
	//alert("follow_suit_just_higher");
	var add_power,
		play_higher_than;

	if (has(14, table[firstToPlay].suit, hands[player_number]) == true && table[firstToPlay].suit != trump) {
		select_card(14, table[firstToPlay].suit)
	}

	if (table_count == 1 && table[firstToPlay].suit == table[limAdd(firstToPlay, 1, 3)].suit) {
		if (table[firstToPlay].rank > table[limAdd(firstToPlay, 1, 3)].rank) {
			play_higher_than = firstToPlay;
		}
		if (table[firstToPlay].rank < table[limAdd(firstToPlay, 1, 3)].rank) {
			play_higher_than = limAdd(firstToPlay, 1, 3);
		}
	} else {
		play_higher_than = firstToPlay;
	}

	add_power = 1;
	while (table[play_higher_than].rank+add_power < 15) {
		if (has(table[play_higher_than].rank+add_power, table[play_higher_than].suit, hands[player_number]) == true) {
			select_card(table[play_higher_than].rank+add_power, table[play_higher_than].suit)
		}
		add_power += 1;
	}
	//alert(played_card);
}

function is_bizon_winning() {
	var winning;

	if (limSub(player_number, 1, 3) == bizon) {
		if (table[firstToPlay].suit == table[limAdd(firstToPlay, 1, 3)].suit) {
			if (table[limAdd(firstToPlay, 1, 3)].rank > table[firstToPlay].rank) {
				winning = true;
			} else {
				winning = false;
			}
		} else {
			if (table[limAdd(firstToPlay, 1, 3)].suit == trump) {
				winning = true;
			} else {
				winning = false;
			}
		}
	} else {
		if (table[firstToPlay].suit == table[limAdd(firstToPlay, 1, 3)].suit) {
			if (table[firstToPlay].rank > table[limAdd(firstToPlay, 1, 3)].rank) {
				winning = true;
			} else {
				winning = false;
			}
		} else {
			if (table[limAdd(firstToPlay, 1, 3)].suit == trump) {
				winning = false;
			} else {
				winning = true;
			}
		}
	}

	return winning;
}

function give_points() {
	var break_loop;

	rank = 13;
	suit = limited(0, 0);
	while (rank > 10 && played_card == undefined) {
		break_loop = false;
		while (suit < 4 && played_card == undefined && break_loop == false) {
			if (has(rank, suit, hands[player_number]) == true) {
				if (how_many(suit, hands[player_number]) == 1) {
					if (how_many(suit, tricks_and_table) == 0) {
						select_card(rank, suit);
					} else {
						if (masters_in_hand[suit] == rank) {
						} else {
							select_card(rank, suit);
						}
					}
				} else {
					// card is not dry within hand. check other cards. still needs to be coded.
				}
			}
			suit = limited(suit, 1);
			if (must_follow_suit == true) {
				break_loop = true;
			}
		}
		rank -= 1;
		suit = limited(0, 0);
	}

	rank = 14;
	suit = limited(0, 0);
	while (rank > 10 && played_card == undefined) {
		break_loop = false;
		while (suit < 4 && played_card == undefined && break_loop == false) {
			if (has(rank, suit, hands[player_number]) == true && has(rank-1, suit, hands[player_number]) == true) {
				select_card(rank, suit)
			}
			suit = limited(suit, 1);
			if (must_follow_suit == true) {
				break_loop = true;
			}
		}
		rank -= 1;
		suit = limited(0, 0);
	}
}

function play_random_ace_if_support() {
	break_loop = false;
	suit = limited(0, 0);
	while (suit < 4 && played_card == undefined && break_loop == false) {
		if (has(14, suit, hands[player_number]) == true && has(13, suit, hands[player_number]) == true) {
			select_card(14, suit);
		}
		suit = limited(suit, 1);
		if (must_follow_suit == true) {
			break_loop = true;
		}
	}
}

function follow_suit_play_ace() {
	if (has(14, table[firstToPlay].suit, hands[player_number]) == true) {
		select_card(14, table[firstToPlay].suit);
	}
}

function calculate_all_masters() {
	var i,
		suit;

	all_masters = [14, 14, 14, 14];
	for (suit = 0; suit < 4; suit++) {
		if (how_many(suit, all_tricks) != 0) {
			all_masters[suit] = highest_card_from(suit, all_tricks) - 1;
		}
	}

	masters_in_hand = [];
	for (i = 0; i < 4; i++) {
		if (has(all_masters[i], i, hands[player_number]) == true) {
			masters_in_hand[i] = all_masters[i];
		} else {
			masters_in_hand[i] = 0;
		}
	}
}

function play_master() {
	var masters_in_hand_wout_trump,
		highest;

	if (must_follow_suit == true) {
		if (has(masters_in_hand[table[firstToPlay].suit], table[firstToPlay].suit, hands[player_number]) == true) {
			select_card(masters_in_hand[table[firstToPlay].suit], table[firstToPlay].suit);
		}
	} else {
		masters_in_hand_wout_trump = [...masters_in_hand];
		masters_in_hand_wout_trump[trump] = 0;
		highest = masters_in_hand_wout_trump.indexOf(Math.max(...masters_in_hand_wout_trump));
		if (has(masters_in_hand_wout_trump[highest], highest, hands[player_number]) == true) {
			select_card(masters_in_hand_wout_trump[highest], highest);
		}
	}
}

function play_low() {
	//alert("play_low");
	var i,
		try_to_play;

	try_to_play = 9;
	while (try_to_play < 15 && played_card == undefined) {
		for (i = 0; i < hands[player_number].length; i++) {
			if (play_this_suit != undefined) {
				if (hands[player_number][i].rank == try_to_play && hands[player_number][i].suit == play_this_suit && has(hands[player_number][i].rank, hands[player_number][i].suit, hands[player_number]) == true) {
					select_card(hands[player_number][i].rank, hands[player_number][i].suit);
				}
				play_this_suit = undefined;
			} else {
				if (must_follow_suit == true) {
					if (hands[player_number][i].rank == try_to_play && hands[player_number][i].suit == table[firstToPlay].suit && has(hands[player_number][i].rank, hands[player_number][i].suit, hands[player_number]) == true) {
						select_card(hands[player_number][i].rank, hands[player_number][i].suit);
					}
				} else {
					if (hands[player_number][i].rank == try_to_play && hands[player_number][i].suit != trump && has(hands[player_number][i].rank, hands[player_number][i].suit, hands[player_number]) == true) {
						select_card(hands[player_number][i].rank, hands[player_number][i].suit);
					}
				}
			}
		}
		try_to_play += 1;
	}
	//alert(played_card);
}

//////////////////////////////////////////////////
// TRUMP PLAYING METHODS //
//////////////////////////////////////////////////

function play_low_trump() {
	var i,
		try_to_play;

	if (must_follow_suit == false) {
		try_to_play = 9;
		while (try_to_play < 15 && played_card == undefined) {
			for (i = 0; i < hands[player_number].length; i++) {
				if (hands[player_number][i].rank == try_to_play && hands[player_number][i].suit == trump
					&& has(hands[player_number][i].rank, trump, hands[player_number]) == true) {
					select_card(hands[player_number][i].rank, trump);
				}
			}
			try_to_play += 1;
		}
	}
}

function hunt() {
	var try_to_play;

	if (how_many(trump, hands[player_number]) + how_many(trump, all_tricks) < 6) {
		if (has(14, trump, hands[player_number]) == true) {
			select_card(14, trump);
		}

		try_to_play = 13;
		while (try_to_play > 8 && played_card == undefined) {
			if (has(try_to_play+1, trump, all_tricks) == true && has(try_to_play, trump, hands[player_number]) == true) {
				select_card(try_to_play, trump)
			}
			try_to_play -= 1;
		}

		try_to_play = 9;
		while (try_to_play < 15 && played_card == undefined) {
			if (has(try_to_play, trump, hands[player_number]) == true) {
				select_card(try_to_play, trump);
			}
			try_to_play += 1;
		}
	}
}

function cut() {
	var i,
		try_to_play;

	if (must_follow_suit == false) {
		try_to_play = 9;

		for (i = 0; i < 3; i++) {
			if (Number.isNaN(table[i]) == false) {
				if (table[i].suit == trump) {
					try_to_play = table[i].rank + 1;
				}
			}
		}

		while (try_to_play < 15) {
			if (has(try_to_play, trump, hands[player_number]) == true) {
				select_card(try_to_play, trump);
			}
			try_to_play += 1;
		}
	}
}

function play_highest_trump_unless_ace() {
	var try_to_play;

	for (try_to_play = 13; try_to_play > 8; try_to_play--) {
		if (has(try_to_play, trump, hands[player_number]) == true) {
			select_card(try_to_play, trump)
		}
	}
}

function play_trump_ace() {
	if (has(14, trump, hands[player_number]) == true) {
		select_card(14, trump)
	}
}

function play_card_hard() {
	var bizon_winning_status,
		i;

	if (Number.isNaN(table[0]) == true && Number.isNaN(table[1]) == true && Number.isNaN(table[2]) == true) {
		firstToPlay = player_number;
	}

	play_this_suit = undefined;

	all_tricks = [].concat.apply([], tricks);

	tricks_and_table = all_tricks;
	tricks_and_table = tricks_and_table.concat(table);

	if (Number.isNaN(table[bizon]) == false) {
		bizon_has_played = true;
	}
	else {
		bizon_has_played = false;
	}

	table_count = 0;
	for (i = 0; i < 3; i++) {
		if (Number.isNaN(table[i])) {
			table_count += 1;
		}
	}

	calculate_all_masters();
	must_follow_suit = false;
	if (table_count == 3) {
		// is first
		if (how_many(trump, hands[player_number]) + how_many(trump, all_tricks) == 6
			&& hands[player_number].length - how_many(trump, hands[player_number]) == 1
			&& played_card == undefined) {
			play_low_trump();
		};
		if (player_number == bizon) {
			if (played_card == undefined) {hunt()}
			if (played_card == undefined) {play_master()}
			if (played_card == undefined) {try_make_master()}
		}
		else {
			if (hands[player_number].length == how_many(trump, hands[player_number]) && played_card == undefined) {play_trump_ace()}
			if (played_card == undefined) {play_master()}
			if (played_card == undefined) {try_make_master()}
		}
	}
	else {
		if (how_many(table[firstToPlay].suit, hands[player_number]) > 0) {must_follow_suit = true}
		if (table_count == 2) {
			// is second
			if (player_number == bizon) {
				if (must_follow_suit == true) {
					if (played_card == undefined) {play_master()}
					if (played_card == undefined) {follow_suit_just_higher()}
					if (played_card == undefined) {play_low()}
				}
				else {
					if (played_card == undefined) {cut()}
				}
			}
			else {
				if (bizon_has_played == true) {
					if (must_follow_suit == true) {
						if (table[firstToPlay].suit == trump && played_card == undefined) {follow_suit_just_higher()}
						if (played_card == undefined) {follow_suit_play_high()}
						if (played_card == undefined) {play_low()}
					}
					else {
						if (played_card == undefined) {give_points_on_low_trump()}
						if (played_card == undefined) {cut()}
					}
				}
				else {
					if (must_follow_suit == true) {
						if (played_card == undefined) {play_master()}
						if (played_card == undefined) {take_with_master()}
						if (played_card == undefined) {play_low()}
					}
					else {
						if (table[firstToPlay].rank == all_masters[table[firstToPlay].suit]
							&& bizon_can_follow_suit == true) {
							give_points();
						}
					}
				}
			}
		}
		else if (table_count == 1) {
			// is last
			if (player_number == bizon) {
				if (must_follow_suit == true) {
					if (played_card == undefined) {follow_suit_just_higher()}
					if (played_card == undefined) {play_low()}
				}
				else {
					cut();
				}
			}
			else {
				bizon_winning_status = is_bizon_winning();
				if (must_follow_suit == true) {
					if (table[firstToPlay].suit == trump && table[limAdd(firstToPlay, 1, 3)].suit == trump
						&& table[firstToPlay].rank != 14 && table[limAdd(firstToPlay, 1, 3)].rank != 14
						&& bizon_winning_status == false && played_card == undefined) {
						play_highest_trump_unless_ace();
					}
					if (table[firstToPlay].suit == trump && bizon_winning_status == false && played_card == undefined) {play_low()}
					if (played_card == undefined && bizon_winning_status == true && table[limAdd(firstToPlay, 1, 3)].suit == trump
						&& table[firstToPlay].suit != trump) {
						play_low();
					}
					if (played_card == undefined) {take_with_master()}
					if (played_card == undefined) {follow_suit_just_higher()}
					if (bizon_winning_status == true) {
						if (table[firstToPlay].suit != table[limAdd(firstToPlay, 1, 3)].suit && limSub(player_number, 1, 3) != bizon) {
							// let it slip
						}
						else if (played_card == undefined) {
							follow_suit_just_higher();
						}
					}
					else {
						if (played_card == undefined) {give_points()}
						if (played_card == undefined && limSub(player_number, 1, 3) != bizon
							&& table[firstToPlay].suit != table[limAdd(firstToPlay, 1, 3)].suit
							&& table[limAdd(firstToPlay, 1, 3)].suit == trump) {
							follow_suit_just_higher();
						}
					}
					if (played_card == undefined) {play_low()}
				}
				else {
					if (bizon_winning_status == true) {
						cut();
					}
					else {
						give_points();
					}
				}
			}
		}
	}
	if (played_card == undefined) {play_low()}
	if (played_card == undefined) {play_low_trump()}

	played_card = undefined;
}
