var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.IdleOverlay = function () {
  this.pos = {
    titleSprite : {
      x : FlappyBird.WIDTH / 2,
      y : FlappyBird.HEIGHT,
    },
    tapSprite : {
      x : FlappyBird.WIDTH / 2,
      y : 225,
    },
  };

  this.tapSpriteAlpha = 0;

  this.titleSprite = new FlappyBird.Graphics.Sprite(174, 44, 110, 20);
  this.tapSprite = new FlappyBird.Graphics.Sprite(130, 98, 110, 144);

  this.titleSpriteAnimation = new FlappyBird.Animation.Easing(FlappyBird.Animation.EasingFunctions.EaseInOutCubic, 30, this.pos.titleSprite.y, 150);
  this.tapSpriteAnimation = new FlappyBird.Animation.Easing(FlappyBird.Animation.EasingFunctions.EaseInOutCubic, 30, 0, 1, 30);
};

FlappyBird.Core.IdleOverlay.prototype.reset = function () {
  this.pos.titleSprite = {
    x : FlappyBird.WIDTH / 2,
    y : FlappyBird.HEIGHT,
  };
  
  this.tapSpriteAlpha = 0;

  this.titleSpriteAnimation.reset();
  this.tapSpriteAnimation.reset();
};

FlappyBird.Core.IdleOverlay.prototype.update = function () {
  this.pos.titleSprite.y = Math.floor(this.titleSpriteAnimation.step());
  this.tapSpriteAlpha = this.tapSpriteAnimation.step();
};

FlappyBird.Core.IdleOverlay.prototype.draw = function (ctx) {
  if (FlappyBird.MODE !== FlappyBird.IDLE) {
    return;
  }

  ctx.save();
  {
    ctx.translate(this.pos.titleSprite.x - (this.titleSprite.width / 2), this.pos.titleSprite.y);
    this.titleSprite.draw(ctx);
  }
  ctx.restore();

  ctx.save();
  {
    ctx.globalAlpha = this.tapSpriteAlpha;
    ctx.translate(this.pos.tapSprite.x - (this.tapSprite.width / 2), this.pos.tapSprite.y);
    this.tapSprite.draw(ctx);
  }
  ctx.restore();
};