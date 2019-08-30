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