"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Pipe = function (y) {
  this.bounds = {
    width : 40,
    height : 667,
  };
  this.pos = {
    x : 600,
    y : FlappyBird.Utils.randomBewteen(200, 500),
  };
  this.vel = {
    x : -2,
    y : 0,
  };
  this.gap = 150;
  this.passed = false;
};

FlappyBird.Core.Pipe.prototype.update = function () {
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
};

FlappyBird.Core.Pipe.prototype.draw = function (ctx) {
  ctx.save();
  {
    ctx.translate(this.pos.x - (this.bounds.width / 2), 0);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(0, 0, this.bounds.width, this.bounds.height);
  }
  ctx.restore();

  ctx.save();
  {
    ctx.translate(this.pos.x - (this.bounds.width / 2), this.pos.y - this.gap / 2);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.bounds.width, this.gap);
  }
  ctx.restore();
};

FlappyBird.Core.Pipe.prototype.collides = function (bird) {
  if (this.pos.x - (this.bounds.width / 2) < bird.pos.x + bird.radius && this.pos.x + (this.bounds.width / 2) > bird.pos.x - bird.radius) {
    if (bird.pos.y - bird.radius <= this.pos.y - (this.gap / 2) || bird.pos.y + bird.radius > this.pos.y + (this.gap / 2)) {
      return true;
    } else {
      if (!this.passed) {
        this.passed = true;
        bird.score.increase();
      }
    }
  }

  return false;
};