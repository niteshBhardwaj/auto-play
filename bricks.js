function Bricks(width, height, x, y, color) {

this.x = x;
this.y = y;
this.width = width;
this.height = height;
this.scaleX = 1;
this.scaleY = 1;
this.color = utils.parseColor(color);
this.lineWidth = 4;
this.rotation = 0;


}

Bricks.prototype.draw = function (c) {
	c.save();
	c.translate(this.x, this.y);
	c.rotate(this.rotation);
	c.scale(this.scaleX, this.scaleY);
	c.fillStyle = this.color;
	c.strokeStyle = "rgb(213, 199, 183)";
//	c.globalAlpha = this.alpha;
	c.lineWidth = this.lineWidth;
	c.beginPath();
	c.rect(0,0,this.width, this.height);
	c.fill();
	c.stroke();
	c.restore();
}
