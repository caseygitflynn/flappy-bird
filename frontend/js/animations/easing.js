"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Animation = FlappyBird.Animation || {};
/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
FlappyBird.Animation.EasingFunctions = {
  // no easing, no acceleration
  Linear: function (t) { return t },
  // accelerating from zero velocity
  EaseInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  EaseOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  EaseInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity 
  EaseInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity 
  EaseOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration 
  EaseInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity 
  EaseInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity 
  EaseOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  EaseInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  EaseInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  EaseOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration 
  EaseInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },
}

FlappyBird.Animation.Easing = function (timingFunction, frames, from, to, delay) {
  this.delay = delay || 0;
  this.timingFunction = timingFunction;
  this.frames = frames;
  this.frameCounter = -this.delay;
  this.from = from;
  this.to = to;
};

FlappyBird.Animation.Easing.prototype.step = function () {
  this.frameCounter++;
  
  if (this.frameCounter < 0) {
    return this.from;
  }

  if (this.frameCounter < this.frames) {
    return (this.timingFunction(this.frameCounter / this.frames) * (this.to - this.from) + this.from);
  }

  return this.to;
};

FlappyBird.Animation.Easing.prototype.reset = function () {
  this.frameCounter = -this.delay;
};