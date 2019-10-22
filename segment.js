function Segment (width, height, color) {
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.vx = 0;
  this.vy = 0;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
  this.lineWidth = 0;
}

Segment.prototype.draw = function (c) {
  var h = this.height,
      d = this.width + h,
      cr = h / 2;

      c.save();
      c.translate(this.x, this.y);
      c.rotate(this.rotation);
      c.scale(this.scaleX, this.scaleY);
      c.lineWidth = this.lineWidth;
      c.fillStyle = this.color;
      c.beginPath();
      c.moveTo(0, -cr);
      c.lineTo(d-2*cr, -cr);
      c.quadraticCurveTo(-cr+d, -cr, -cr+d, 0);
      c.lineTo(-cr+d, h-2*cr);
      c.quadraticCurveTo(-cr+d, -cr+h, d-2*cr, -cr+h);
      c.lineTo(0, -cr+h);
      c.quadraticCurveTo(-cr, -cr+h, -cr, h-2*cr);
      c.lineTo(-cr, 0);
      c.quadraticCurveTo(-cr, -cr, 0, -cr);
      c.closePath();
      c.fill();
      if(this.lineWidth > 0) {
        c.stroke();
      }

      c.beginPath();
      c.arc(0,0,2,0,(Math.PI * 2), true);
      c.closePath();
      c.stroke();
      c.beginPath();
      c.arc(this.width, 0,10,0,(Math.PI * 2), true);
      c.closePath();
      c.fill();
      c.restore();
};

Segment.prototype.getPin = function() {
  return {
    x: this.x + Math.cos(this.rotation) * this.width,
    y: this.y + Math.sin(this.rotation) * this.width
  };
};
