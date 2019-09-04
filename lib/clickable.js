//============================================================================================\\
// clickable canvas script source: http://www.gaminglogy.com/tutorial/controls-mouse/index.php ||
//============================================================================================//

//System Vars
var stage = document.getElementById("clickCanvas");
stage.width = stage_width;
stage.height = stage_height;
var ctx = stage.getContext("2d");
ctx.clearRect(0, 0, stage.width, stage.height);

//Browser Detection
navigator.sayswho= (function(){
	var N= navigator.appName, ua= navigator.userAgent, tem;
	var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
	M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

	return M;
})();

var browser = navigator.sayswho[0];

var mouseX, mouseY;
mouseX = 0; //default values
mouseY = 0; //default values
	
stage.addEventListener("click", canvasClick, false);

function canvasClick(event) {
	if (browser == "Firefox" || browser == "Microsoft") {
		mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else /* "Safari" or "Chrome" */ {
		mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}

	//document.getElementById("details").innerHTML = "";
	
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
			var max_offset = [0],
				offset = 40/divisor,
				hand_minus_one = hands[2].length - 1;
				
			var i, j, u, c;

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
				if (mouseY > handY[2] && mouseY <= handY[2] + card_height 
				&& mouseX > handX[2] + max_offset[u - 1] && mouseX <= handX[2] + max_offset[u] && i >= u) {
					player_can_follow_suit = false;
					if (firstToPlay != null) {
						// check if player can follow suit or not
						for (c = 0; c < hands[2].length; c++) {
							if (hands[2][c].suit == table[firstToPlay].suit) {
								player_can_follow_suit = true;
							}
						}
						if ((player_can_follow_suit == true && hands[2][u - 1].suit == table[firstToPlay].suit) || (player_can_follow_suit == false)) {
							putOnTable(u - 1);
						} else {
							// can't play this card
						}
					} else {
						putOnTable(u - 1);
					}
				};
				u += 1;
			};
			// end of controls for clicking on a card from the player's hand
		} else if (gamePhase == 5) {
			if (mouseY > boxY[2] && mouseY <= boxY[2] + boxHeight && mouseX > boxX[0] && mouseX <= boxX[0] + boxWidth) {
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