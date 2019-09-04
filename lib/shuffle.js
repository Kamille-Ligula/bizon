//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

function shuffle(array) {
	var length = array.length;
	while (length > 0) {
		index = Math.floor(Math.random() * length);
		length -= 1;
		temp = array[length];
		array[length] = array[index];
		array[index] = temp;
	}
	return array;
}

function reshuffle(array) {
	/*
	this function is not supposed to shuffle perfectly, in order to simulate a normal trick-taking game shuffle
	(that is one that does not to break the tricks too much), so that everyone's hands make more sense in game.
	split array into 5 element chunks
	shuffle them
	split array into 4 element chunks
	shuffle them
	split array into 3 element chunks
	shuffle them
	*/
	var i,
		j,
		temparray,
		chunk,
		merged;

	for (chunk = 5; chunk > 2; chunk--) {
		temparray = [];
		for (i = 0, j = array.length; i < j; i += chunk) {
			temparray.push(array.slice(i, i + chunk));
		}
		temparray = shuffle(temparray);
		array = [].concat.apply([], temparray);
	}
	
	return array;
}