"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Bird = function (x, y) {
  this.radius = 14;
  this.pos = {
    x : FlappyBird.WIDTH / 2,
    y : FlappyBird.HEIGHT / 2,
  };
  this.vel = {
    x : 0,
    y : 0,
  };
  this.acc = {
    x : 0,
    y : 0,
  };
  this.angle = 0;
  this.score = new FlappyBird.Core.Score();
  this.jumping = false;
  this.image = new Image();
  this.image.src = "img/bird.png";
  this.clip = {
    width : 46,
    height : 32,
    x : 0,
    y : 0,
  };
  this.frame = 0;
};

FlappyBird.Core.Bird.prototype.update = function () {
  this.frame++;
  if (this.frame >= 60) {
    this.frame = 0;
  }
  this.clip.x = Math.floor(this.frame * 2 / 20 % 3) * this.clip.width;

  if (FlappyBird.MODE === FlappyBird.IDLE) {
    if (this.frame < 30) {
      this.pos.y--;
    } else {
      this.pos.y++;
    }
  }

  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;
  if (this.vel.y < 0 && this.angle >= -0.5) {
    this.angle -= 0.05;
  }
  if (this.vel.y > 0 && this.angle <= 0.5) {
    this.angle += 0.05;
  }
};

FlappyBird.Core.Bird.prototype.handleInput = function (input) {
  if (!this.jumping && input.jump === true) {
    this.vel.y = -10;
    this.jumping = true;
  }

  if (input.jump === false) {
    this.jumping = false;
  }
};

FlappyBird.Core.Bird.prototype.draw = function (ctx) {
  ctx.save();
  {
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);
    ctx.translate(-this.radius, -this.radius);
    ctx.drawImage(this.image, this.clip.x, this.clip.y, this.clip.width, this.clip.height, 0, 0, this.clip.width, this.clip.height);
  }
  ctx.restore();
};