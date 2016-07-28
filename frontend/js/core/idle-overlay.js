var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.IdleOverlay = function () {
  this.pos = {
    x : FlappyBird.WIDTH / 2,
    y : FlappyBird.HEIGHT,
  };
  this.acc = {
    x : 0,
    y : -FlappyBird.GRAVITY * 3,
  };
  this.vel = {
    x : 0,
    y : 0,
  };
  this.sprite = new FlappyBird.Graphics.Sprite(174, 44, 110, 20);
};

FlappyBird.Core.IdleOverlay.prototype.reset = function () {
  this.pos = {
    x : FlappyBird.WIDTH / 2,
    y : FlappyBird.HEIGHT,
  };
  this.vel = {
    x : 0,
    y : 0,
  };
};

FlappyBird.Core.IdleOverlay.prototype.update = function () {
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;

  if (this.pos.y < 150) {
    this.pos.y = 150;
    this.vel.y = 0;
  }
};

FlappyBird.Core.IdleOverlay.prototype.draw = function (ctx) {
  if (FlappyBird.MODE !== FlappyBird.IDLE) {
    return;
  }

  ctx.save();
  {
    ctx.translate(this.pos.x - (this.sprite.width / 2), this.pos.y);
    this.sprite.draw(ctx);
  }
  ctx.restore();
};