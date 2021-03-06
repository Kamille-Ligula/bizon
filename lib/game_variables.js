/*
ID numbers:
Goat's ID number is 0
Sheep's ID number is 1
The player's ID number is 2

Game phases:
0) first bidding
1) second bidding
2) actual game
3) pause when table is full
4) pause when all hands are empty
5) pause when need player confirmation
*/

var all_suits = [[], [], [], []],
		sorted_suit = [],
		all_ranks = [[], [], [], [], [], []],
		cardIsTaken = false,
		deck = [],
		hands = [[], [], []],
		tricks = [[], [], []],
		table = [NaN, NaN, NaN],
		setPoints = [0, 0, 0],
		setPointsDraw = [["-->"], ["-->"], ["-->"]],
		howManySetWinners,
		setWinner,
		setLooser,
		gamePoints = [0, 0, 0],
		totalSetPoints = [],
		text_grass,
		grass = NaN,
		player_can_follow_suit,
		trump,
		victory_status,
		bizon,
		latestTrick = [NaN, NaN, NaN],
		timestamp = Date.now(),
		dealer = Math.floor(Math.random() * 3),
		player_number = limAdd(dealer, 1, 3),
		firstToPlay = null,
		totalPassCount = 0,
		gamePhase = 0, // first bidding
		selectedCard = NaN,
		played_card,
		table_suit,
		play_this_suit,
		all_tricks = [],
		tricks_and_table = [],
		all_masters,
		table_count,
		masters_in_hand,
		tricks_and_table,
		bizon_has_played,
		must_follow_suit,
		bizon_followed_suit_history = [];
