"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Pipe = function (y) {
  this.bounds = {
    width : 52,
  };
  this.pos = {
    x : FlappyBird.WIDTH + this.bounds.width / 2,
    y : FlappyBird.Utils.randomBewteen(150, 345),
  };
  this.vel = {
    x : -2,
    y : 0,
  };
  this.gap = 150;
  this.passed = false;
  this.sprite = {
    top : {
      width: 52,
      height : 270,
      x : 0,
      y : 25,
    },
    bottom : {
      width: 52,
      height : 242,
      x : 53,
      y : 25,
    }
  };
  this.image = new Image();
  this.image.src = "img/sprites.png";
};

FlappyBird.Core.Pipe.prototype.update = function () {
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
};

FlappyBird.Core.Pipe.prototype.draw = function (ctx) {
  // Top pipe
  ctx.save();
  {
    ctx.translate(this.pos.x - (this.bounds.width / 2), this.pos.y - (this.gap / 2) - (this.sprite.top.height));
    ctx.drawImage(this.image, this.sprite.top.x, this.sprite.top.y, this.sprite.top.width, this.sprite.top.height, 0, 0, this.sprite.top.width, this.sprite.top.height);
  }
  ctx.restore();

  // Bottom pipe
  ctx.save();
  {
    ctx.translate(this.pos.x - (this.bounds.width / 2), this.pos.y + (this.gap / 2));
    ctx.drawImage(this.image, this.sprite.bottom.x, this.sprite.bottom.y, this.sprite.bottom.width, this.sprite.bottom.height, 0, 0, this.sprite.bottom.width, this.sprite.bottom.height);
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