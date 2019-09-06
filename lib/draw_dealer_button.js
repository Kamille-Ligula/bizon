//======================================================================================\\
// 						2019, Samuel Luc (aka Kamille Ligula)							||
//======================================================================================//

function draw_dealer_button(img, x, y, width, height) {
	var image = new Image();
	image.src = img;
	ctx.drawImage(image, x, y, width, height);
}