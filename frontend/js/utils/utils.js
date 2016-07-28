"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Utils = FlappyBird.Utils || {};

FlappyBird.Utils.randomBewteen = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

FlappyBird.Utils.getStringSpriteWidth = function (string, sprite) {
  return string.length * sprite.width;
};