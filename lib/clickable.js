//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

//============================================================================================\\
// Clickable canvas script source: http://www.gaminglogy.com/tutorial/controls-mouse/index.php
// Since it is presented as a tutorial, I took the liberty to clean it and adapt it to my needs
//============================================================================================//

//Browser Detection
navigator.sayswho= (function(){
	var N= navigator.appName, ua= navigator.userAgent, tem;
	var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
	M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

	return M;
})();

var browser = navigator.sayswho[0];

gameloop = setInterval(update, timePerFrame);
stage.addEventListener("click", canvasClick, false);

/*
var spacePressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
	if ("code" in e) {
		switch(e.code) {
			case "Unidentified":
				break;
			case "Space":
				spacePressed = true;
				return;
			default:
				return;
		}
	}

	if(e.keyCode == 32) {
		spacePressed = true;
	}
}
function keyUpHandler(e) {
	if ("code" in e) {
		switch(e.code) {
			case "Unidentified":
				break;
			case "Space":
				spacePressed = false;
				return;
			default:
				return;
		}
	}

	if(e.keyCode == 32) {
		spacePressed = false;
	}
}
*/

function cardValidator(u, i, max_offset) {
	player_can_follow_suit = false;
	if (firstToPlay != null) {
		// check if player can follow suit or not
		for (c = 0; c < hands[2].length; c++) {
			if (hands[2][c].suit == table[firstToPlay].suit) {
				player_can_follow_suit = true;
			}
		}
		if ((player_can_follow_suit == true && hands[2][u - 1].suit == table[firstToPlay].suit) || (player_can_follow_suit == false)) {
			selectCard(u - 1);
		} else {
			// can't play this card
		}
	} else {
		selectCard(u - 1);
	}
}

function selectCard(which) {
	if (cardPreSelection == true) {
		if (Number.isNaN(selectedCard)) {
			selectedCard = which;
		}
		else {
			if (selectedCard == which) {
				putOnTable(which);
				selectedCard = NaN;
			}
			else {
				selectedCard = which;
			}
		}
	}
	else {
		putOnTable(which);
		selectedCard = NaN;
	}

}

function canvasClick(event) {
	var max_offset = [0],
		offset = 40/divisor,
		hand_minus_one = hands[2].length - 1;
		
	var i, j, u, c;

	if (browser == "Firefox" || browser == "Microsoft") {
		mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else /* "Safari" or "Chrome" */ {
		mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}

	//document.getElementById("details").innerHTML = "";

	// language controls
	for (i = 0; i < 4; i++) {
		if (mouseY > smallBoxY[0] && mouseY <= smallBoxY[0] + boxHeight && mouseX > smallBoxX[i] && mouseX <= smallBoxX[i] + smallBoxWidth) {
			language = 'language'+String(i+1);
			dictionary = data[language];
			resetTextSize();
		}
	}

	if (player_number == 2) {
		if (gamePhase == 0 || gamePhase == 1) {
			if (mouseY > deckY && mouseY <= deckY + card_height + deck.length
				&& mouseX > deckX && mouseX <= deckX + card_width + deck.length) {
				// controls for clicking on the deck
				pass();
			};
		}
		if (gamePhase == 0) {
			// first bidding
			if (mouseY > boxY[0] && mouseY <= boxY[0] + boxHeight && mouseX > boxX[0] && mouseX <= boxX[0] + boxWidth) {
				// take
				takeCard();
			} else if (mouseY > boxY[0] && mouseY <= boxY[0] + boxHeight && mouseX > boxX[1] && mouseX <= boxX[1] + boxWidth) {
				// pass
				pass();
			} else if (mouseY > grassY && mouseY <= grassY + card_height 
				&& mouseX > grassX+deck.length && mouseX <= grassX+deck.length + card_width) {
				// controls for clicking on the grass
				takeCard();
			};
		} else if (gamePhase == 1) {
			// second bidding
			if (mouseY > boxY[0] && mouseY <= boxY[0] + boxHeight && mouseX > boxX[0] && mouseX <= boxX[0] + boxWidth) {
				// hearts
				if (grass.suit != 0) {trump = 0}
			} else if (mouseY > boxY[0] && mouseY <= boxY[0] + boxHeight && mouseX > boxX[1] && mouseX <= boxX[1] + boxWidth) {
				// diamonds
				if (grass.suit != 1) {trump = 1}
			} else if (mouseY > boxY[1] && mouseY <= boxY[1] + boxHeight && mouseX > boxX[0] && mouseX <= boxX[0] + boxWidth) {
				// clubs
				if (grass.suit != 2) {trump = 2}
			} else if (mouseY > boxY[1] && mouseY <= boxY[1] + boxHeight && mouseX > boxX[1] && mouseX <= boxX[1] + boxWidth) {
				// spades
				if (grass.suit != 3) {trump = 3}
			} else if (mouseY > boxY[2] && mouseY <= boxY[2] + boxHeight && mouseX > boxX[0] && mouseX <= boxX[0] + boxWidth) {
				// pass
				pass();
			};
			if (trump != undefined) { takeCard() }
		} else if (gamePhase == 2) {
			// controls for clicking on a card from the player's hand
			i = 1;
			while (i - 1 < hand_minus_one) {
				max_offset.push(offset * i);
				i += 1;
			};

			j = 0;
			while (j < 9 - i) {
				max_offset.push(offset * hand_minus_one + 77/divisor);
				j += 1;
			};
			
			u = 1;
			while (u < 9) {
				if (mouseX > handX[2] + max_offset[u - 1] && mouseX <= handX[2] + max_offset[u] && i >= u) {
					if (Number.isNaN(selectedCard) == true) {
						if (mouseY > handY[2] && mouseY <= handY[2] + card_height) {
							cardValidator(u, i, max_offset);
						}
					}
					else {
						if (selectedCard == u - 1) {
							if (mouseY > handY[3] && mouseY <= handY[3] + card_height) {
								cardValidator(u, i, max_offset);
							}
						}
						else {
							if (mouseY > handY[2] && mouseY <= handY[2] + card_height) {
								cardValidator(u, i, max_offset);
							}
						}
					}
				}
				u += 1;
			}
			// end of controls for clicking on a card from the player's hand
		} else if (gamePhase == 5) {
			if ((mouseY > boxY[2] && mouseY <= boxY[2] + boxHeight && mouseX > boxX[0] && mouseX <= boxX[0] + boxWidth) || 
				(totalPassCount == 6 && trump == undefined && mouseY > deckY && mouseY <= deckY + card_height + deck.length && 
				mouseX > deckX && mouseX <= deckX + card_width + deck.length)) {
				if (setPointsDraw[0].length == 16) {
					gamePhase = 6; // end of a set
					countSP();
				} else {
					reinitializeGame();
				}
			}
		} else if (gamePhase == 6) {
			if (mouseY > boxY[2] && mouseY <= boxY[2] + boxHeight && mouseX > boxX[0] && mouseX <= boxX[0] + boxWidth) {
				reinitializeSet();
				reinitializeGame();
			}
		}
	}
	//document.getElementById("mouse_xy").innerHTML = [mouseX,mouseY];
}