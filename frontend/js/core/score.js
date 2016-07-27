"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Score = function () {
  this.score = 0;
  this.pos = {
    x : 190,
    y : 40,
  };
};

FlappyBird.Core.Score.prototype.increase = function () {
  this.score++;
};

FlappyBird.Core.Score.prototype.draw = function (ctx) {
  ctx.save();
  {
    ctx.translate(this.pos.x, this.pos.y);
    ctx.font = "40px Monaco";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(this.score, 0, 0);
  }
  ctx.restore();
};