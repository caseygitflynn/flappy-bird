"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Animation = FlappyBird.Animation || {};

FlappyBird.Animation.Bobbing = function (origin, range, speed) {
  this.origin = origin;
  this.speed = speed;
  this.range = range;
  this.angle = 0;
};

FlappyBird.Animation.Bobbing.prototype.step = function () {
  this.angle += this.speed;

  return this.origin + Math.sin(this.angle) * this.range;
};