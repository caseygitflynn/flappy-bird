"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Background = function () {
  this.pos = {
    x : 0,
    y : 0,
  };
  this.vel = {
    x : -FlappyBird.BACKGROUND_SPEED,
    y : 0,
  };
  this.sprite = new FlappyBird.Graphics.Sprite(288, 512, 0, 406);
};

FlappyBird.Core.Background.prototype.reset = function () {
  this.pos = {
    x : 0,
    y : 0,
  };
};

FlappyBird.Core.Background.prototype.update = function () {
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;

  if (this.pos.x + this.sprite.width < 0) {
    // Loop around
    this.pos.x = 0;
  }
};

FlappyBird.Core.Background.prototype._getNumberOfTiles = function () {
  return Math.ceil(FlappyBird.WIDTH / this.sprite.width);
};

FlappyBird.Core.Background.prototype.draw = function (ctx) {
  for (var i = 0; i <= this._getNumberOfTiles(); i = i + 1) {
    ctx.save();
    {
      ctx.translate(this.pos.x + (i * this.sprite.width), this.pos.y);
      this.sprite.draw(ctx);
    }
    ctx.restore();
  }
};