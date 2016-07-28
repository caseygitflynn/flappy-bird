"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Input = function () {
  this.jump = false;
  this.enabled = true;

  this.frame = 0;
  this.suspendFrames = 0;

  this.playPauseButton = new FlappyBird.Core.PlayPauseButton();

  this.initListeners();
};

FlappyBird.Core.Input.prototype.initListeners = function () {
  window.addEventListener('keydown', this._keyDown.bind(this));
  window.addEventListener('keyup', this._keyUp.bind(this));

  window.addEventListener('mousedown', this._onMouseDown.bind(this));
  window.addEventListener('mouseup', this._onMouseUp.bind(this));

  window.addEventListener('touchstart', this._onTouchStart.bind(this));
  window.addEventListener('touchend', this._onTouchEnd.bind(this));
};

FlappyBird.Core.Input.prototype.drawUI = function (ctx) {
  this.playPauseButton.draw(ctx);
};

FlappyBird.Core.Input.prototype.suspend = function (frames) {
  this.suspendFrames = frames;
  this.enabled = false;
  this.jump = false;
};

FlappyBird.Core.Input.prototype.onFrame = function () {

  if (this.suspendFrames > 0) {
    this.frame++;

    if (this.frame >= this.suspendFrames) {
      this.enabled = true;
      this.suspendFrames = 0;
    }
  } else {
    this.frame = 0;
  }
};

FlappyBird.Core.Input.prototype._keyDown = function (e) {
  if (!this.enabled) {
    return;
  }

  var code = e.keyCode;

  switch (code) {
    case 32 :
      this.jump = true;
      e.preventDefault();
      break;
    default :
      break;
  }
};

FlappyBird.Core.Input.prototype._keyUp = function (e) {
  var code = e.keyCode;
  e.preventDefault();

  switch (code) {
    case 32 :
      this.jump = false;
      e.preventDefault();
      break;
    default :
      break;
  }
};

FlappyBird.Core.Input.prototype._onMouseDown = function (e) {
  if (!this.enabled) {
    return;
  }

  if (!this.playPauseButton.hitTest(e.clientX, e.clientY)) {
    this.jump = true;
  }
};

FlappyBird.Core.Input.prototype._onMouseUp = function (e) {
  this.jump = false;

  if (this.playPauseButton.hitTest(e.clientX, e.clientY)) {
    this.playPauseButton.toggle();
  }
};

FlappyBird.Core.Input.prototype._onTouchStart = function (e) {
  if (!this.enabled) {
    return;
  }

  e.preventDefault();
  var touch = e.changedTouches[0];
  if (!this.playPauseButton.hitTest(touch.clientX, touch.clientY)) {
    this.jump = true;
  }
};

FlappyBird.Core.Input.prototype._onTouchEnd = function (e) {
  this.jump = false;

  e.preventDefault();
  var touch = e.changedTouches[0];
  if (this.playPauseButton.hitTest(touch.clientX, touch.clientY)) {
    this.playPauseButton.toggle();
  }
};