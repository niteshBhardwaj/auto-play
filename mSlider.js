function mSlider(width,height, color) {

this.x = 0;
this.y = 0;
this.width = width;
this.height = height;
this.color = utils.parseColor(color);
this.scaleX = 1;
this.scaleY = 1;
this.lineWidth = 1;	
this.grd = '';
}

mSlider.prototype.draw = function(c) {
	c.save();
	this.grd=c.createLinearGradient(60,110,140,60);
	this.grd.addColorStop(0,"rgba(20,20,20,.5)");
	this.grd.addColorStop(1,"rgb(45,209,250)");
	c.fillStyle = this.grd;
	c.translate(this.x, this.y);
	c.beginPath();
	c.lineJoin="round";
	c.moveTo(0,0);
	c.moveTo(0,0);
	c.lineTo(this.width,0);
	c.quadraticCurveTo(this.width,20,70,20);
	c.bezierCurveTo(this.width,this.height,0,this.height,30,20);
	c.quadraticCurveTo(0,20,0,0);
	c.fill();
	c.closePath();
	c.restore();
}


