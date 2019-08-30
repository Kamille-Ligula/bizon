function draw_card(draw_rank, draw_suit, width, height, x, y, side, rotate) {
	ctx = game_area.context;
	var image = new Image();
	if (side == true) {
		image.src = 'img/'+draw_suit+'_'+draw_rank+'.png';
	} else {
		image.src = 'img/back.png';
	}

	if (rotate == false) {
		ctx.drawImage(image, x, y, width, height);
	} else {
		ctx.save();
		ctx.translate(x+width/2, y+height/2);
		ctx.rotate(90*Math.PI/180.0);
		ctx.translate(-x-width/2, -y-height/2);
		ctx.drawImage(image, x, y, width, height);
		ctx.restore();
	}
}