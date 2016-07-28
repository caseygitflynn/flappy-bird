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
  this.sprite = {
    width : 174,
    height : 44,
    x : 110,
    y : 20,
  };
  this.image = new Image();
  this.image.src = "img/sprites.png";
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
    ctx.drawImage(this.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, 0, 0, this.sprite.width, this.sprite.height);
  }
  ctx.restore();
};