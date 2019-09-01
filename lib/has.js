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