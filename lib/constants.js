//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

const dimensions = 1,
	base_canvas_width = 1024,
	base_canvas_height = 576,
	timePerFrame = 33; //this equates to 30 fps

var window_height = window.innerHeight,
	window_width = window.innerWidth,
	window_height_old = window_height,
	window_width_old = window_width,
	divisor = base_canvas_height/window_height/dimensions,
	verification = base_canvas_width/divisor;

if (verification > window_width/dimensions) { divisor = base_canvas_width/window_width/dimensions }

var card_width, card_height, stage_width, stage_height, adaptableToChineseText,
	handX, handY, tableX, tableY, tricksX, tricksY, latestTrickX, latestTrickY,
	scoreTextX, setPointsDrawX, setPointsDrawY, deckX, deckY, grassX, grassY,
	boxX, boxY, smallBoxX, smallBoxY, boxWidth, smallBoxWidth, boxHeight, gameloop,
	mouseX, mouseY, stage, ctx, dealX, dealY, cardPreSelection;

stage = document.getElementById("clickCanvas");
ctx = stage.getContext("2d");

ctx.clearRect(0, 0, stage.width, stage.height);
mouseX = 0;
mouseY = 0;

var language = localStorage.getItem("language");
if (language == undefined) { language = "language1" }

function resetTextSize() {
	if (language == 'language3' || language == 'language4') {
		adaptableToChineseText = big_text;
	}
	else {
		adaptableToChineseText = small_text;
	}
}

function refresh_system() {
	divisor = base_canvas_height/window_height/dimensions;

	verification = base_canvas_width/divisor/dimensions;

	if (verification > window_width/dimensions) { divisor = base_canvas_width/window_width/dimensions }

	big_text = "bold "+18/divisor+"px sans-serif";
	small_text = "bold "+15/divisor+"px sans-serif";
	resetTextSize();

	card_width = 77/divisor;
	card_height = 96/divisor;
		
	stage_width = base_canvas_width/divisor;
	stage_height = base_canvas_height/divisor;

	handX = [50/divisor, 200/divisor, 200/divisor]; // X coordinates of the hands on screen
	handY = [95/divisor, 40/divisor, 430/divisor, 410/divisor]; // Y coordinates of the hands on screen
	tableX = [240/divisor, 330/divisor, 330/divisor]; // Y coordinates of the hands on screen
	tableY = [235/divisor, 180/divisor, 290/divisor]; // Y coordinates of the hands on screen
	tricksX = [50/divisor, 538/divisor, 538/divisor];
	tricksY = [440/divisor, 40/divisor, 430/divisor];
	latestTrickX = [650/divisor, 735/divisor, 820/divisor];
	latestTrickY = 185/divisor;
	scoreTextX = 655/divisor;
	setPointsDrawX = [725/divisor, 761/divisor, 797/divisor, 833/divisor, 869/divisor, 905/divisor, 941/divisor, 977/divisor];
	// I had to use a little trick here, because the player is on top of the board but his ID is 2:
	setPointsDrawY = [83/divisor, 102/divisor, 121/divisor, 140/divisor, 45/divisor, 64/divisor];
	deckX = 230/divisor;
	deckY = 230/divisor;
	grassX = 330/divisor;
	grassY = 230/divisor;
	boxX = [647/divisor, 827/divisor];
	boxY = [357/divisor, 397/divisor, 437/divisor];
	smallBoxX = [647/divisor, 712/divisor, 777/divisor, 842/divisor];
	smallBoxY = [525/divisor];
	boxWidth = 172/divisor;
	smallBoxWidth = 60/divisor;
	boxHeight = 32/divisor;
	dealX = [42/divisor, 200/divisor, 200/divisor];
	dealY = [79/divisor, 14/divisor, 529/divisor];

	stage.width = stage_width;
	stage.height = stage_height;

	// cardPreSelection false for web browsers, true for smartphone apps
	if (navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)) { 
		cardPreSelection = true;
	}
	else {
		cardPreSelection = false;
	}

	window_height_old = window_height;
	window_width_old = window_width;
}

refresh_system();