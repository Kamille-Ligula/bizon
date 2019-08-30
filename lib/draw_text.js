function draw_text(text, font, color, x, y) {
	ctx = game_area.context;
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
}