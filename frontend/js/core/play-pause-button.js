"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.PlayPauseButton = function () {
  this.bounds = {
    width : 44,
    height : 44,
  };
  this.pos = {
    x : 30,
    y : 30,
  };
  this.sprite = new FlappyBird.Graphics.Sprite(26, 28, 110, 116);
};

FlappyBird.Core.PlayPauseButton.prototype.isEnabled = function () {
  return (FlappyBird.MODE === FlappyBird.PLAY || FlappyBird.MODE === FlappyBird.PAUSE);
};

FlappyBird.Core.PlayPauseButton.prototype.hitTest = function (x, y) {
  if (!this.isEnabled()) {
    return false;
  }

  return (x >= this.pos.x - (this.bounds.width / 2)
      && x <= this.pos.x + (this.bounds.width / 2)
      && y >= this.pos.y - (this.bounds.height / 2)
      && y <= this.pos.y + (this.bounds.height / 2));
};

FlappyBird.Core.PlayPauseButton.prototype.toggle = function () {
  if (FlappyBird.MODE == FlappyBird.PLAY) {
    FlappyBird.MODE = FlappyBird.PAUSE;
  } else if (FlappyBird.MODE == FlappyBird.PAUSE) {
    FlappyBird.MODE = FlappyBird.PLAY;
  }
};

FlappyBird.Core.PlayPauseButton.prototype.draw = function (ctx) {
  ctx.save();
  {
    ctx.translate(this.pos.x - (this.sprite.width / 2), this.pos.y - (this.sprite.height / 2));
    if (FlappyBird.MODE == FlappyBird.PLAY) {
      this.sprite.draw(ctx);
    }
    if (FlappyBird.MODE == FlappyBird.PAUSE) {
     this.sprite.draw(ctx, 1); 
    }
  }
  ctx.restore();
};