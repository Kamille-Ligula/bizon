function draw_dealer_button(img, x, y, width, height) {
	ctx = game_area.context;
	var image = new Image();
	image.src = img;
	ctx.drawImage(image, x, y, width, height);
}