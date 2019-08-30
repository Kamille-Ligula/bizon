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
			setPoints[limAdd(bizon, 1)] = setPoints[limAdd(bizon, 1)] + 3;
			setPoints[limAdd(bizon, 2)] = setPoints[limAdd(bizon, 2)] + 3;
			setPointsDraw[limAdd(bizon, 1)].push("   3");
			setPointsDraw[limAdd(bizon, 2)].push("   3");
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
				setPointsDraw[limAdd(bizon, 1)].push("   0");
				setPointsDraw[limAdd(bizon, 2)].push("   0");
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