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

var images = [],
	imageSource = [];

stage = document.getElementById("clickCanvas");
ctx = stage.getContext("2d");

ctx.clearRect(0, 0, stage.width, stage.height);
mouseX = 0;
mouseY = 0;

// cardPreSelection false for web browsers, true for smartphone apps
// CURRENTLY ALL FALSE
if (navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)) {
	cardPreSelection = false;
}
else {
	cardPreSelection = false;
}

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

function apply_refreshment() {
	card_width = 77/divisor;
	card_height = 96/divisor;

	stage_width = base_canvas_width/divisor;
	stage_height = base_canvas_height/divisor;

	big_text = "bold "+18/divisor+"px sans-serif";
	small_text = "bold "+15/divisor+"px sans-serif";
	resetTextSize();

	handX = [55/divisor, 205/divisor, 205/divisor]; // X coordinates of the hands on screen
	handY = [99/divisor, 44/divisor, 434/divisor, 414/divisor]; // Y coordinates of the hands on screen
	tableX = [245/divisor, 335/divisor, 335/divisor]; // Y coordinates of the hands on screen
	tableY = [239/divisor, 184/divisor, 294/divisor]; // Y coordinates of the hands on screen
	tricksX = [55/divisor, 543/divisor, 543/divisor];
	tricksY = [444/divisor, 44/divisor, 434/divisor];
	latestTrickX = [655/divisor, 740/divisor, 825/divisor];
	latestTrickY = 189/divisor;
	scoreTextX = 660/divisor;
	setPointsDrawX = [736/divisor, 772/divisor, 808/divisor, 844/divisor, 880/divisor, 916/divisor, 952/divisor, 988/divisor];
	// I had to use a little trick here, because the player is on top of the board but his ID is 2:
	setPointsDrawY = [87/divisor, 106/divisor, 129/divisor, 148/divisor, 45/divisor, 64/divisor];
	deckX = 235/divisor;
	deckY = 234/divisor;
	grassX = 335/divisor;
	grassY = 234/divisor;
	boxX = [652/divisor, 832/divisor];
	boxY = [361/divisor, 401/divisor, 441/divisor];
	smallBoxX = [652/divisor, 717/divisor, 782/divisor, 847/divisor];
	smallBoxY = [529/divisor];
	boxWidth = 172/divisor;
	smallBoxWidth = 60/divisor;
	boxHeight = 32/divisor;
	dealX = [47/divisor, 205/divisor, 205/divisor];
	dealY = [83/divisor, 17/divisor, 533/divisor];

	stage.width = stage_width;
	stage.height = stage_height;

	window_height_old = window_height;
	window_width_old = window_width;
}

function refresh_system() {
	divisor = base_canvas_height/window_height/dimensions

	verification = base_canvas_width/divisor/dimensions;

	if (verification > window_width/dimensions) { divisor = base_canvas_width/window_width/dimensions }

	apply_refreshment();
}

//first system setting
divisor = Math.round(base_canvas_height/window_height/dimensions);

verification = base_canvas_width/divisor/dimensions;

if (verification > window_width/dimensions) { divisor = Math.round(base_canvas_width/window_width/dimensions) }

apply_refreshment();
