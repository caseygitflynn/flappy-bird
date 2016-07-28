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

  this.disabled = false;

  this._initListeners();
};

FlappyBird.Core.PlayPauseButton.prototype._initListeners = function () {
  window.addEventListener('mouseup', this._onMouseUp.bind(this));
  window.addEventListener('touchend', this._onTouchEnd.bind(this));
};

FlappyBird.Core.PlayPauseButton.prototype.isEnabled = function () {
  return (FlappyBird.MODE === FlappyBird.PLAY || FlappyBird.MODE === FlappyBird.PAUSE)
};

FlappyBird.Core.PlayPauseButton.prototype._onMouseUp = function (e) {
  if (!this.isEnabled()) {
    return;
  }

  e.preventDefault();
  console.log(e);
  this._hitTest(e.clientX, e.clientY);
};

FlappyBird.Core.PlayPauseButton.prototype._onTouchEnd = function (e) {
  if (!this.isEnabled()) {
    return;
  }

  e.preventDefault();
  var touch = e.changedTouches[0];
  console.log(touch);
  this._hitTest(touch.clientX, touch.clientY);
};

FlappyBird.Core.PlayPauseButton.prototype._hitTest = function (x, y) {
  if (x >= this.pos.x - (this.bounds.width / 2)
      && x <= this.pos.x + (this.bounds.width / 2)
      && y >= this.pos.y - (this.bounds.height / 2)
      && y <= this.pos.y + (this.bounds.height / 2)) {

    if (FlappyBird.MODE == FlappyBird.PAUSE) {
      FlappyBird.MODE = FlappyBird.PLAY;
    } else {
      FlappyBird.MODE = FlappyBird.PAUSE;
    }

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