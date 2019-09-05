//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

function draw_box(img, text, font, color, x, y, width, height) {
	ctx = game_area.context;
	var image = new Image();
	image.src = img;
	ctx.drawImage(image, x, y, width, height);
	draw_text(text, font, color, x+10/divisor, y+22/divisor);
	if (text == "♥ "+dictionary["suits_caps"][0] && grass.suit != 0) { draw_text("♥", font, "red", x+10/divisor, y+22/divisor); }
	else if (text == "♦ "+dictionary["suits_caps"][1] && grass.suit != 1) { draw_text("♦", font, "red", x+10/divisor, y+22/divisor); }
	else if (text == "♣ "+dictionary["suits_caps"][2] && grass.suit != 2) { draw_text("♣", font, "black", x+10/divisor, y+22/divisor); }
	else if (text == "♠ "+dictionary["suits_caps"][3] && grass.suit != 3) { draw_text("♠", font, "black", x+10/divisor, y+22/divisor); }
}