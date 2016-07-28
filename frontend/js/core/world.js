"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.World = function () {
  this.bounds = {
    width : FlappyBird.WIDTH,
    height : FlappyBird.HEIGHT,
  };
  this.pipes = [];
  this.background = new FlappyBird.Core.Background();
  this.ground = new FlappyBird.Core.Ground();
};

FlappyBird.Core.World.prototype.reset = function () {
  this.pipes = [];
  this.background.reset();
  this.ground.reset();
};

FlappyBird.Core.World.prototype.update = function () {
  var self = this;

  if (FlappyBird.MODE === FlappyBird.PLAY) {
    this.pipes.forEach(function (pipe, index) {
      pipe.update();
      if (pipe.pos.x + pipe.bounds.width < 0) {
        self.pipes.splice(index, 1);
      }
    });

    if (this.pipes.length == 0 || this.pipes[this.pipes.length - 1].pos.x < FlappyBird.WIDTH - FlappyBird.PIPE_SPACING) {
      this.pipes.push(new FlappyBird.Core.Pipe());
    }
  }

  this.background.update();
  this.ground.update();
};

FlappyBird.Core.World.prototype.collidesWithPipe = function (bird) {
  var collides = false;

  this.pipes.forEach(function (pipe, index) {
    collides = pipe.collides(bird) || collides;
  });

  return collides;
};

FlappyBird.Core.World.prototype.collidesWithGround = function (bird) {
  if (bird.pos.y + bird.radius >= this.ground.pos.y) {
    return true;
  }

  return false;
};

FlappyBird.Core.World.prototype.draw = function (ctx) {
  this.clear(ctx);

  this.background.draw(ctx);
  this.pipes.forEach(function (pipe, index) {
    pipe.draw(ctx);
  });

  this.ground.draw(ctx);
};

FlappyBird.Core.World.prototype.clear = function (ctx) {
  ctx.save();
  {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.bounds.width, this.bounds.height);
  }
  ctx.restore();
};