"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Score = function () {
  this.score = 0;
  this.pos = {
    x : Math.floor(FlappyBird.WIDTH / 2),
    y : 40,
  };
  this.sprite = {
    width : 18,
    height : 20,
    x : 108,
    y : 0,
  };
  this.image = new Image();
  this.image.src = "img/sprites.png";
};

FlappyBird.Core.Score.prototype.increase = function () {
  this.score++;
};

FlappyBird.Core.Score.prototype._getNumberSprite = function (number) {
  return parseInt(number, 10) * this.sprite.width + this.sprite.x;
};

FlappyBird.Core.Score.prototype._getScoreWidth = function () {
  return this.score.toString(10).length * this.sprite.width;
};

FlappyBird.Core.Score.prototype.draw = function (ctx) {
  for (var i = 0; i < this.score.toString(10).length; i = i + 1) {
    ctx.save();
    {
      ctx.translate(this.pos.x - this._getScoreWidth() / 2, this.pos.y);
      var offset = i * this.sprite.width;
      ctx.translate(offset, 0);
      ctx.drawImage(this.image, this._getNumberSprite(this.score.toString(10)[i]), this.sprite.y, this.sprite.width, this.sprite.height, 0, 0, this.sprite.width, this.sprite.height);
    }
    ctx.restore();
  };
};