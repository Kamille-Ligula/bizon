function how_many(element, array) {
	// check how many occurences of an element (either a rank or suit) there are in an array
	var amount = 0;

	var i = 0;
	while (i < array.length) {
		if (array[i].rank == element || array[i].suit == element) {
			amount += 1;
		}
		i += 1;
	}

	return amount;
}