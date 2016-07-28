"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Input = function () {
  this.jump = false;
  this.enabled = true;

  this.frame = 0;
  this.suspendFrames = 0;

  this.initListeners();
};

FlappyBird.Core.Input.prototype.initListeners = function () {
  window.addEventListener('keydown', this._keyDown.bind(this));
  window.addEventListener('keyup', this._keyUp.bind(this));
  window.addEventListener('mousedown', this._onDown.bind(this));
  window.addEventListener('mouseup', this._onUp.bind(this));
  window.addEventListener('touchstart', this._onDown.bind(this));
  window.addEventListener('touchend', this._onUp.bind(this));
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

FlappyBird.Core.Input.prototype._onDown = function (e) {
  if (!this.enabled) {
    return;
  }
  this.jump = true;
};

FlappyBird.Core.Input.prototype._onUp = function (e) {
  this.jump = false;
};