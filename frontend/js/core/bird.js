"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Bird = function (x, y) {
  this.radius = 12;
  this.pos = {
    x : FlappyBird.WIDTH / 4,
    y : FlappyBird.HEIGHT / 2,
  };
  this.vel = {
    x : 0,
    y : 0,
  };
  this.acc = {
    x : 0,
    y : FlappyBird.GRAVITY,
  };
  this.angle = 0;
  this.jumping = false;
  this.sprite = new FlappyBird.Graphics.Sprite(34, 24, 0, 0);
  this.frame = 0;
  this.bobbingAnimation = new FlappyBird.Animation.Bobbing(this.pos.y, 20, 0.1);
};

FlappyBird.Core.Bird.prototype.reset = function () {
  this.pos = {
    x : FlappyBird.WIDTH / 4,
    y : FlappyBird.HEIGHT / 2,
  };
  this.vel = {
    x : 0,
    y : 0,
  };
  this.acc = {
    x : 0,
    y : FlappyBird.GRAVITY,
  };
  this.angle = 0;
  this.jumping = false;
  this.frame = 0;
  this.bobbingAnimation.angle = 0;
};

FlappyBird.Core.Bird.prototype.update = function () {
  this.frame++;
  if (this.frame >= 60) {
    this.frame = 0;
  }

  if (FlappyBird.MODE === FlappyBird.IDLE) {
    this.pos.y = this.bobbingAnimation.step();
    return;
  }

  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;

  if (this.vel.y > FlappyBird.MAX_VELOCITY) {
    this.vel.y = FlappyBird.MAX_VELOCITY;
  }

  if (this.vel.y < 0 && this.angle >= -0.5) {
    this.angle -= 0.05;
  }
  if (this.vel.y > 0 && this.angle <= 0.5) {
    this.angle += 0.05;
  }
};

FlappyBird.Core.Bird.prototype.getAnimationFrame = function () {
  return Math.floor(this.frame * 0.1 % 3);
};

FlappyBird.Core.Bird.prototype.handleInput = function (input) {
  if (FlappyBird.MODE !== FlappyBird.PLAY) {
    return;
  }

  if (!this.jumping && input.jump === true) {
    this.vel.y = -FlappyBird.JUMP_VELOCITY;
    this.jumping = true;
  }

  if (input.jump === false) {
    this.jumping = false;
  }
};

FlappyBird.Core.Bird.prototype.draw = function (ctx) {
  ctx.save();
  {
    ctx.translate(Math.floor(this.pos.x - 6), Math.floor(this.pos.y - 2));
    ctx.rotate(this.angle);
    ctx.translate(-this.radius, -this.radius);
    this.sprite.draw(ctx, this.getAnimationFrame());
  }
  ctx.restore();

  if (FlappyBird.DEBUG) {
    ctx.save();
    {
      ctx.translate(this.pos.x, this.pos.y);
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#FF0000";
      ctx.stroke();
    }
    ctx.restore();
  }
};