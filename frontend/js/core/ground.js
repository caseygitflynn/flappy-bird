"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Ground = function () {
  this.pos = {
    x : 0,
    y : FlappyBird.HEIGHT - 50,
  };
  this.vel = {
    x : -FlappyBird.SCROLL_SPEED,
    y : 0,
  };
  this.sprite = {
    width : 308,
    height : 112,
    x : 0,
    y : 296,
  };
  this.image = new Image();
  this.image.src = "img/sprites.png";
};

FlappyBird.Core.Ground.prototype.update = function () {
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;

  if (this.pos.x + this.sprite.width < 0) {
    // Loop around
    this.pos.x = 0;
  }
};

FlappyBird.Core.Ground.prototype._getNumberOfTiles = function () {
  return Math.ceil(FlappyBird.WIDTH / this.sprite.width);
};

FlappyBird.Core.Ground.prototype.draw = function (ctx) {
  for (var i = 0; i <= this._getNumberOfTiles(); i = i + 1) {
    ctx.save();
    {
      ctx.translate(this.pos.x + (i * this.sprite.width), this.pos.y);
      ctx.drawImage(this.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, 0, 0, this.sprite.width, this.sprite.height);
    }
    ctx.restore();
  }

  if (FlappyBird.DEBUG) {
      ctx.save();
      {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.moveTo(0, this.pos.y);
        ctx.lineTo(FlappyBird.WIDTH, this.pos.y);
        ctx.stroke();
      }
      ctx.restore();
    }
};