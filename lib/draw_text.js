//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

function draw_text(text, font, color, x, y) {
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
}