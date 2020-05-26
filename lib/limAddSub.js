function maxLim(prototype, max) {
	var	mod,
			i;

	for (i=0; i<max; i++) {
		mod = prototype - i;
		if (mod % max == 0) { return i };
	}
}

function limAdd(baseNumber, newNumber, max) {
	return maxLim(baseNumber + newNumber, max);
}

function limSub(baseNumber, newNumber, max) {
	return maxLim(baseNumber - newNumber, max);
}
