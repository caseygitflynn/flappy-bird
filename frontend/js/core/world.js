"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.World = function () {
  this.bounds = {
    width : FlappyBird.WIDTH,
    height : FlappyBird.HEIGHT,
  };
  this.pipes = [new FlappyBird.Core.Pipe()];
};

FlappyBird.Core.World.prototype.update = function () {
  var self = this;

  this.pipes.forEach(function (pipe, index) {
    pipe.update();
    if (pipe.pos.x + pipe.bounds.width < 0) {
      self.pipes.splice(index, 1);
    }
  });

  if (this.pipes.length == 0 || this.pipes[this.pipes.length - 1].pos.x < FlappyBird.WIDTH - 200) {
    this.pipes.push(new FlappyBird.Core.Pipe());
  }
};

FlappyBird.Core.World.prototype.collides = function (bird) {
  var collides = false;

  if (bird.pos.y + bird.radius >= this.bounds.height) {
    return true;
  }

  this.pipes.forEach(function (pipe, index) {
    collides = pipe.collides(bird) || collides;
  });

  return collides;
};

FlappyBird.Core.World.prototype.draw = function (ctx) {
  this.clear(ctx);

  this.pipes.forEach(function (pipe, index) {
    pipe.draw(ctx);
  });
};

FlappyBird.Core.World.prototype.clear = function (ctx) {
  ctx.save();
  {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.bounds.width, this.bounds.height);
  }
  ctx.restore();
};