//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

var window_height = window.innerHeight,
	window_width = window.innerWidth,
	window_height_old = window_height,
	window_width_old = window_width,
	dimensions = 1,
	base_canvas_height = 576,
	base_canvas_width = 1024,

	divisor = base_canvas_height/window_height/dimensions,

	verification = base_canvas_width/divisor;

if (verification > window_width/dimensions) {
	var divisor = base_canvas_width/window_width/dimensions;
}

var card_width = 77/divisor,
	card_height = 96/divisor,
	
	stage_width = 1024/divisor,
	stage_height = 576/divisor,
	TIME_PER_FRAME = 33, //this equates to 30 fps
	big_text = "bold "+18/divisor+"px sans-serif",
	small_text = "bold "+15/divisor+"px sans-serif",

	handX = [50/divisor, 200/divisor, 200/divisor], // X coordinates of the hands on screen
	handY = [110/divisor, 50/divisor, 450/divisor], // Y coordinates of the hands on screen
	tableX = [240/divisor, 330/divisor, 330/divisor], // Y coordinates of the hands on screen
	tableY = [250/divisor, 195/divisor, 305/divisor], // Y coordinates of the hands on screen
	tricksX = [50/divisor, 538/divisor, 538/divisor],
	tricksY = [440/divisor, 48/divisor, 448/divisor],
	latestTrickX = [650/divisor, 735/divisor, 820/divisor],
	latestTrickY = 185/divisor,
	scoreTextX = 655/divisor,
	setPointsDrawX = [725/divisor, 761/divisor, 797/divisor, 833/divisor, 869/divisor, 905/divisor, 941/divisor, 977/divisor],
	// I had to use a little trick here, because the player is on top of the board but his ID is 2 (= bottom of the array) :
	setPointsDrawY = [83/divisor, 102/divisor, 121/divisor, 140/divisor, 45/divisor, 64/divisor],
	deckX = 230/divisor,
	deckY = 250/divisor,
	grassX = 330/divisor,
	grassY = 250/divisor,
	boxX = [647/divisor, 827/divisor],
	boxY = [357/divisor, 397/divisor, 437/divisor],
	boxWidth = 172/divisor,
	boxHeight = 32/divisor;

function update_system() {
	dimensions = 1;
	base_canvas_height = 576;
	base_canvas_width = 1024;

	divisor = base_canvas_height/window_height/dimensions;

	verification = base_canvas_width/divisor/dimensions;

	if (verification > window_width/dimensions) {
		divisor = base_canvas_width/window_width/dimensions;
	}

	divisor = divisor;
	card_width = 77/divisor;
	card_height = 96/divisor;
		
	stage_width = 1024/divisor;
	stage_height = 576/divisor;
	big_text = "bold "+18/divisor+"px sans-serif";
	small_text = "bold "+15/divisor+"px sans-serif";

	handX = [50/divisor, 200/divisor, 200/divisor]; // X coordinates of the hands on screen
	handY = [110/divisor, 50/divisor, 450/divisor]; // Y coordinates of the hands on screen
	tableX = [240/divisor, 330/divisor, 330/divisor]; // Y coordinates of the hands on screen
	tableY = [250/divisor, 195/divisor, 305/divisor]; // Y coordinates of the hands on screen
	tricksX = [50/divisor, 538/divisor, 538/divisor];
	tricksY = [440/divisor, 48/divisor, 448/divisor];
	latestTrickX = [650/divisor, 735/divisor, 820/divisor];
	latestTrickY = 185/divisor;
	scoreTextX = 655/divisor;
	setPointsDrawX = [725/divisor, 761/divisor, 797/divisor, 833/divisor, 869/divisor, 905/divisor, 941/divisor, 977/divisor];
	// I had to use a little trick here, because the player is on top of the board but his ID is 2 :
	setPointsDrawY = [83/divisor, 102/divisor, 121/divisor, 140/divisor, 45/divisor, 64/divisor];
	deckX = 230/divisor;
	deckY = 250/divisor;
	grassX = 330/divisor;
	grassY = 250/divisor;
	boxX = [647/divisor, 827/divisor];
	boxY = [357/divisor, 397/divisor, 437/divisor];
	boxWidth = 172/divisor;
	boxHeight = 32/divisor;

	stage.width = stage_width;
	stage.height = stage_height;
	game_area.start();

	window_height_old = window_height;
	window_width_old = window_width;
}