//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

function drawOnCanvas() {
	ctx.clearRect(0, 0, stage_width, stage_height);

	for (i = 0; i < deck.length; i++) {
		draw_card(deck[i].draw_rank, deck[i].draw_suit, card_width, card_height, deckX+i/divisor, deckY+i/divisor, false, false);
	}
	for (i = 0; i < hands[0].length; i++) {
		draw_card(hands[0][i].draw_rank, hands[0][i].draw_suit, card_width, card_height, handX[0], handY[0]+i*40/divisor, false, true);
	}
	for (i = 0; i < hands[1].length; i++) {
		draw_card(hands[1][i].draw_rank, hands[1][i].draw_suit, card_width, card_height, handX[1]+i*40/divisor, handY[1], false, false);
	}
	for (i = 0; i < hands[2].length; i++) {
		draw_card(hands[2][i].draw_rank, hands[2][i].draw_suit, card_width, card_height, handX[2]+i*40/divisor, handY[2], true, false);
	}

	//grass
	if (Number.isNaN(grass)) {
		// don't draw if no card
	}
	else {
		draw_card(grass.draw_rank, grass.draw_suit, card_width, card_height, grassX+deck.length, grassY, true, false);
	}

	//table
	for (i = 0; i < table.length; i++) {
		if (Number.isNaN(table[i])) {
			// don't draw if no card
		}
		else {
			draw_card(table[i].draw_rank, table[i].draw_suit, card_width, card_height, tableX[i], tableY[i], true, false);
		}
	}

	//tricks
	if (gamePhase == 5) {
		for (i = 0; i < tricks[0].length; i++) {
			draw_card(tricks[0][i].draw_rank, tricks[0][i].draw_suit, card_width, card_height, handX[0], handY[0]+i*14/divisor, true, true);
		}
		for (i = 0; i < tricks[1].length; i++) {
			draw_card(tricks[1][i].draw_rank, tricks[1][i].draw_suit, card_width, card_height, handX[1]+i*14/divisor, handY[1], true, false);
		}
		for (i = 0; i < tricks[2].length; i++) {
			draw_card(tricks[2][i].draw_rank, tricks[2][i].draw_suit, card_width, card_height, handX[2]+i*14/divisor, handY[2], true, false);
		}
	}
	else {
		for (i = 0; i < tricks[0].length; i++) {
			if (i % 3 == 0) {
				draw_card(tricks[0][i].draw_rank, tricks[0][i].draw_suit, card_width, card_height, tricksX[0]-i/3*2/divisor, tricksY[0]+i/3*2/divisor, false, true);
			}
		}
		for (i = 0; i < tricks[1].length; i++) {
			if (i % 3 == 0) {
				draw_card(tricks[1][i].draw_rank, tricks[1][i].draw_suit, card_width, card_height, tricksX[1]+i/3*2/divisor, tricksY[1]-i/3*2/divisor, false, false);
			}
		}
		for (i = 0; i < tricks[2].length; i++) {
			if (i % 3 == 0) {
				draw_card(tricks[2][i].draw_rank, tricks[2][i].draw_suit, card_width, card_height, tricksX[2]+i/3*2/divisor, tricksY[2]+i/3*2/divisor, false, false);
			}
		}
	}

	//latest trick
	for (i = 0; i < latestTrick.length; i++) {
		if (Number.isNaN(latestTrick[i])) {
			// don't draw if no card
		}
		else {
			draw_card(latestTrick[i].draw_rank, latestTrick[i].draw_suit, card_width, card_height, latestTrickX[i], latestTrickY, true, false);
		}
	}

	// text
	//---------
	// titles
	var textColor = "white";
	var boxTextColor = "black";
	var scoreTextX = 650/divisor;
	draw_text(dictionary["scoresheet"], big_text, textColor, scoreTextX, 21/divisor);
	draw_text(dictionary["latest_trick"], big_text, textColor, scoreTextX, 171/divisor);
	draw_text(dictionary["communication"], big_text, textColor, scoreTextX, 321/divisor);
	draw_text(dictionary["title_language"], big_text, textColor, scoreTextX, 514/divisor);

	// communication and interaction
	if (gamePhase == 0 && player_number == 2) {
		// first bidding
		draw_text(dictionary["decision"], adaptableToChineseText, textColor, scoreTextX, 347/divisor);
		draw_box("img/box.png", dictionary["eat"], big_text, "black", boxX[0], boxY[0], boxWidth, boxHeight);
		draw_box("img/box.png", dictionary["pass"], big_text, "black", boxX[1], boxY[0], boxWidth, boxHeight);
	} else if (gamePhase == 1 && player_number == 2) {
		// second bidding
		draw_text(dictionary["free_to_choose_trump"], adaptableToChineseText, textColor, scoreTextX, 347/divisor);
		if (grass.suit == 0) {boxTextColor = "grey";} else {boxTextColor = "black";}
		draw_box("img/box.png", "♥ "+dictionary["suits_caps"][0], big_text, boxTextColor, boxX[0], boxY[0], boxWidth, boxHeight);
		if (grass.suit == 1) {boxTextColor = "grey";} else {boxTextColor = "black";}
		draw_box("img/box.png", "♦ "+dictionary["suits_caps"][1], big_text, boxTextColor, boxX[1], boxY[0], boxWidth, boxHeight);
		if (grass.suit == 2) {boxTextColor = "grey";} else {boxTextColor = "black";}
		draw_box("img/box.png", "♣ "+dictionary["suits_caps"][2], big_text, boxTextColor, boxX[0], boxY[1], boxWidth, boxHeight);
		if (grass.suit == 3) {boxTextColor = "grey";} else {boxTextColor = "black";}
		draw_box("img/box.png", "♠ "+dictionary["suits_caps"][3], big_text, boxTextColor, boxX[1], boxY[1], boxWidth, boxHeight);
		draw_box("img/box.png", dictionary["pass"], big_text, "black", boxX[0], boxY[2], boxWidth, boxHeight);
	} else if (gamePhase == 2 || gamePhase == 3) {
		// actual game
		draw_text(dictionary["trump"]+" "+dictionary["suits_caps"][trump].toLowerCase(), adaptableToChineseText, textColor, scoreTextX, 347/divisor);
		if (language == 'language3' || language == 'language4') {
			draw_text(dictionary["grass"]+dictionary["of"].toLowerCase()+dictionary["suits_caps"][text_grass.suit]+dictionary["ranks_draw"][text_grass.rank-9], small_text, textColor, scoreTextX, 367/divisor);
		}
		else {
			draw_text(dictionary["grass"]+" "+dictionary["ranks_draw"][text_grass.rank-9].toLowerCase()+" "+dictionary["of"].toLowerCase()+" "+dictionary["suits_caps"][text_grass.suit].toLowerCase(), small_text, textColor, scoreTextX, 367/divisor);
		}
		draw_text(dictionary["who_bizon"][bizon], adaptableToChineseText, textColor, scoreTextX, 387/divisor);
	} else if (gamePhase == 5) {
		if (totalPassCount == 6 && trump == undefined) {
			// everyone passed twice
			draw_text(dictionary["passed_twice"], adaptableToChineseText, "white", scoreTextX, 347/divisor);
		} else {
			// Points et infos du vainqueur de la partie
			draw_text(dictionary["you_have"]+" "+String(gamePoints[2])+" "+dictionary["points"], adaptableToChineseText, "white", scoreTextX, 347/divisor);
			draw_text(dictionary["goat_has"]+" "+String(gamePoints[0])+" "+dictionary["points"], adaptableToChineseText, "white", scoreTextX, 367/divisor);
			draw_text(dictionary["sheep_has"]+" "+String(gamePoints[1])+" "+dictionary["points"], adaptableToChineseText, "white", scoreTextX, 387/divisor);
			switch(victory_status) {
			case true:
				draw_text(dictionary["won_bizon"][bizon], adaptableToChineseText, "white", scoreTextX, 407/divisor);
				break;
			case false:
				draw_text(dictionary["lost_bizon"][bizon], adaptableToChineseText, "white", scoreTextX, 407/divisor);
				break;
			case null:
				draw_text(dictionary["tie"], adaptableToChineseText, "white", scoreTextX, 407/divisor);
			}
		}
		draw_box("img/box.png", dictionary["continue"], big_text, "black", boxX[0], boxY[2], boxWidth, boxHeight);
	} else if (gamePhase == 6) {
		draw_text(dictionary["game_over"], adaptableToChineseText, "white", scoreTextX, 347/divisor);

		if (howManySetWinners == 1) {
			draw_text(dictionary["most_points"][setWinner], adaptableToChineseText, "white", scoreTextX, 367/divisor);
			if (setWinner == 2) {
				draw_text(dictionary["congrats"], adaptableToChineseText, "white", scoreTextX, 387/divisor);
			} else {
				draw_text(dictionary["lost"], adaptableToChineseText, "white", scoreTextX, 387/divisor);
			}
		} else {
			draw_text(dictionary["tie"], adaptableToChineseText, "white", scoreTextX, 367/divisor);
			if (setLooser == 2) {
				draw_text(dictionary["lost"], adaptableToChineseText, "white", scoreTextX, 387/divisor);
			}
		}

		draw_box("img/box.png", dictionary["new_game"], big_text, "black", boxX[0], boxY[2], boxWidth, boxHeight);
	}

	// player hand names
	if (player_number == 0) { textColor = "yellow" } else { textColor = "white" }
	draw_text(dictionary["goat"], big_text, textColor, 68/divisor, 112/divisor);
	if (player_number == 1) { textColor = "yellow" } else { textColor = "white" }
	draw_text(dictionary["sheep"], big_text, textColor, 226/divisor, 42/divisor);
	if (player_number == 2) { textColor = "yellow" } else { textColor = "white" }
	draw_text(dictionary["you"], big_text, textColor, 226/divisor, 442/divisor);
	textColor = "white";

	var dealX,
		dealY;
	switch(dealer) {
	case 0:
		dealX = 42/divisor;
		dealY = 94/divisor;
		break;
	case 1:
		dealX = 200/divisor;
		dealY = 24/divisor;
		break;
	case 2:
		dealX = 200/divisor;
		dealY = 424/divisor;
	}
	draw_dealer_button("img/dealer.png", dealX, dealY, 24/divisor, 24/divisor);

	// scoresheet
	// I had to use a little trick here, because the player is on top of the board but his ID is 2 (= bottom of the array) :
	draw_text(dictionary["goat"], small_text, textColor, scoreTextX, setPointsDrawY[0]);
	draw_text(dictionary["sheep"], small_text, textColor, scoreTextX, setPointsDrawY[2]);
	draw_text(dictionary["you"], small_text, textColor, scoreTextX, setPointsDrawY[4]);
	draw_text(String(setPoints[0])+" "+dictionary["sp"], small_text, textColor, scoreTextX, setPointsDrawY[1]);
	draw_text(String(setPoints[1])+" "+dictionary["sp"], small_text, textColor, scoreTextX, setPointsDrawY[3]);
	draw_text(String(setPoints[2])+" "+dictionary["sp"], small_text, textColor, scoreTextX, setPointsDrawY[5]);
	// draw SP
	x = y = 0;
	for (i = 0; i < setPointsDraw[0].length; i++) {
		for (p = 0; p < 3; p++) {
			draw_text(setPointsDraw[p][i], small_text, textColor, setPointsDrawX[x], setPointsDrawY[y + p*2]);
		}
		x++;
		if (x == 8) {
			x = 0;
			y++;
		}
	}

	// languages
	draw_box("img/smallbox.png", "  En", small_text, boxTextColor, smallBoxX[0], smallBoxY[0], smallBoxWidth, boxHeight);
	draw_box("img/smallbox.png", "  Fr", small_text, boxTextColor, smallBoxX[1], smallBoxY[0], smallBoxWidth, boxHeight);
	draw_box("img/smallbox.png", "中(繁)", small_text, boxTextColor, smallBoxX[2], smallBoxY[0], smallBoxWidth, boxHeight);
	draw_box("img/smallbox.png", "中(简)", small_text, boxTextColor, smallBoxX[3], smallBoxY[0], smallBoxWidth, boxHeight);
}