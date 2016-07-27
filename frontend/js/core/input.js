"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Input = function () {
  this.jump = false;

  this.initListeners();
};

FlappyBird.Core.Input.prototype.initListeners = function () {
  document.addEventListener('keydown', this._keyDown.bind(this));
  document.addEventListener('keyup', this._keyUp.bind(this));
};

FlappyBird.Core.Input.prototype._keyDown = function (e) {
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