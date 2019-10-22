function Ball (radius, color) {
	this.radius = radius? radius : 40;
    this.x = 0;
	this.y = 0;
  	this.width = 40;
  	this.height = 40;
	this.vx = 0;
	this.vy = 0;
	this.rotation = 0;
  	this.color = color? utils.parseColor(color) : "red";
	
};

Ball.prototype.draw = function(c) {
	c.save();
	c.translate(this.x, this.y);
	c.scale(this.scaleX, this.scaleY);
	c.rotate(this.rotation);
	c.lineWidth = 3;
	c.shadowColor = this.color;
  	c.shadowBlur = 5;
  	c.shadowOffsetX = this.shadowX ;
  	c.shadowOffsetY = this.shadowY ;
	c.strokeStyle  = "rgb(200,200,200)";
	c.fillStyle = this.color;
	c.beginPath();
	c.arc(0,0, this.radius, 0, Math.PI *2, false);
    c.closePath();
  	c.fill();
	c.restore();
};

Ball.prototype.getBounds = function () {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
  };

}