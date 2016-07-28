"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Pipe = function (y) {
  this.bounds = {
    width : 52,
  };
  this.pos = {
    x : FlappyBird.WIDTH + this.bounds.width / 2,
    y : FlappyBird.Utils.randomBewteen(FlappyBird.MIN_PIPE_Y, FlappyBird.MAX_PIPE_Y),
  };
  this.vel = {
    x : -FlappyBird.SCROLL_SPEED,
    y : 0,
  };
  this.gap = FlappyBird.PIPE_GAP;
  this.passed = false;
  this.topSprite = new FlappyBird.Graphics.Sprite(52, 270, 0, 25);
  this.bottomSprite = new FlappyBird.Graphics.Sprite(52, 242, 52, 25);
};

FlappyBird.Core.Pipe.prototype.update = function () {
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
};

FlappyBird.Core.Pipe.prototype.draw = function (ctx) {
  // Top pipe
  ctx.save();
  {
    ctx.translate(this.pos.x - (this.bounds.width / 2), this.pos.y - (this.gap / 2) - (this.topSprite.height));
    this.topSprite.draw(ctx);

    if (FlappyBird.DEBUG) {
      ctx.save();
      {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(0, 0, this.bounds.width, this.topSprite.height);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
  ctx.restore();

  // Bottom pipe
  ctx.save();
  {
    ctx.translate(this.pos.x - (this.bounds.width / 2), this.pos.y + (this.gap / 2));
    this.bottomSprite.draw(ctx);

    if (FlappyBird.DEBUG) {
      ctx.save();
      {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(0, 0, this.bounds.width, this.bottomSprite.height);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
  ctx.restore();
};

FlappyBird.Core.Pipe.prototype.collides = function (bird) {
  if (this.pos.x - (this.bounds.width / 2) < bird.pos.x + bird.radius && this.pos.x + (this.bounds.width / 2) > bird.pos.x - bird.radius) {
    if (bird.pos.y - bird.radius < this.pos.y - (this.gap / 2) || bird.pos.y + bird.radius > this.pos.y + (this.gap / 2)) {
      return true;
    } else {
      if (!this.passed) {
        this.passed = true;
        FlappyBird.Score.increase();
      }
    }
  }

  return false;
};