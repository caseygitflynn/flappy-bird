"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Graphics = FlappyBird.Graphics || {};

FlappyBird.Graphics.Sprite = function (width, height, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.image = new Image();
  this.image.src = "img/sprites.png";
};

FlappyBird.Graphics.Sprite.prototype.getFrame = function (frame) {
  frame = frame || 0;
  return frame * this.width + this.x;
};

FlappyBird.Graphics.Sprite.prototype.draw = function (ctx, frame) {
  ctx.save();
  ctx.drawImage(this.image, this.getFrame(frame), this.y, this.width, this.height, 0, 0, this.width, this.height);
  ctx.restore();
};