//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

function maxLim(prototype) {
	var	mod,
		i;

	i = 0;
	while (i < 3) {
		mod = prototype - i;
		if (mod % 3 == 0) { return i };
		i += 1;
	}
}

function limAdd(baseNumber, newNumber) {
	return maxLim(baseNumber + newNumber);
}

function limSub(baseNumber, newNumber) {
	return maxLim(baseNumber - newNumber);
}