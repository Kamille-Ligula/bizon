var game_area = {
	canvas : document.getElementById("gameCanvas"),
	start : function() {
		this.canvas.width = stage_width;
		this.canvas.height = stage_height;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(update_game_area, 20);
		},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function() {
		clearInterval(this.interval);
	}
}