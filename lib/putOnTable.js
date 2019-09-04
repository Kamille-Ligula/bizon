//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

function putOnTable(cardPositionID) {
	if (Number.isNaN(table[0]) == true && Number.isNaN(table[1]) == true && Number.isNaN(table[2]) == true) {
		firstToPlay = player_number;
	}
	table[player_number] = (hands[player_number][cardPositionID]);
	//document.getElementById("additionalComment").innerHTML = "table[player_number]: "+table[player_number].suit;
	hands[player_number].splice(cardPositionID, 1);
	player_number = limAdd(player_number, 1);
	timestamp = Date.now();
}