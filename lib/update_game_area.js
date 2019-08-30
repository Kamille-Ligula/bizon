game_area.start();

function update_game_area() {
	var i, p, x, y;
	//document.getElementById("mouse_xy").innerHTML = gamePhase;
	//document.getElementById("details").innerHTML = gamePhase;
	//document.getElementById("gamePhase").innerHTML = "gamePhase: "+gamePhase;
	//document.getElementById("totalPassCount").innerHTML = "totalPassCount: "+totalPassCount;
	//document.getElementById("additionalComment").innerHTML = hands[2][0].draw_rank;

	window_height = window.innerHeight;
	window_width = window.innerWidth;

	if (window_width != window_width_old || window_height != window_height_old) {
		update_system();
	}

	if (Date.now() - timestamp > 100) {
		if ((gamePhase == 0 || gamePhase == 1) && player_number != 2) {
			// first and second biddings
			lookAtGrass();
		} else if (gamePhase == 2 && player_number != 2) {
			// actual game
			play_card();
		} else if (gamePhase == 3) {
			// pause when table is full
			gamePhase = 2;
			emptyTable();
		} else if (gamePhase == 4) {
			// pause when all hands are empty
			// reinitialize game variables
			if (totalPassCount == 6 && trump == undefined) {
				// if passed 6 times
				countGP();
			} else {
				emptyTable();
				countGP();
			}
			gamePhase = 5;
			player_number = 2;
		}
	}

	if (Number.isNaN(table[0]) == false && Number.isNaN(table[1]) == false && Number.isNaN(table[2]) == false && gamePhase != 5) {
		if (hands[0].length == 0 && hands[1].length == 0 && hands[2].length == 0 && gamePhase != 4) {
			gamePhase = 4;
		}
		if (gamePhase != 4 && gamePhase != 3) {
			gamePhase = 3;
		}
	}
	if (totalPassCount % 3 == 0 && totalPassCount != 0 && trump == undefined && gamePhase != 5) {
		if (totalPassCount == 6 && trump == undefined) {
			// everyone passed twice
			gamePhase = 4; // restart
		} else {
			gamePhase = 1; // second bidding
		}
	}
	
	drawOnCanvas();
}