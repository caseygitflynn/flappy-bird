var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.IdleOverlay = function () {
  this.pos = {
    x : FlappyBird.WIDTH / 2,
    y : FlappyBird.HEIGHT,
  };
  this.sprite = new FlappyBird.Graphics.Sprite(174, 44, 110, 20);
  this.animation = new FlappyBird.Animation.Easing(FlappyBird.Animation.EasingFunctions.EaseInOutCubic, 30, this.pos.y, 150);
};

FlappyBird.Core.IdleOverlay.prototype.reset = function () {
  this.pos = {
    x : FlappyBird.WIDTH / 2,
    y : FlappyBird.HEIGHT,
  };
  this.animation.reset();
};

FlappyBird.Core.IdleOverlay.prototype.update = function () {
  this.pos.y = Math.floor(this.animation.step());
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