"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.IDLE       = 0;
FlappyBird.PLAY       = 1;
FlappyBird.GAME_OVER  = 2;

FlappyBird.Core.Game = function (canvas) {
  FlappyBird.MODE = FlappyBird.IDLE;

  this.canvas = canvas;
  
  FlappyBird.WIDTH = this.canvas.width;
  FlappyBird.HEIGHT = this.canvas.height;

  this.ctx = this.canvas.getContext('2d');
  this.input = new FlappyBird.Core.Input();
  this.world = new FlappyBird.Core.World();
  this.bird = new FlappyBird.Core.Bird();

  this.loop();
};

FlappyBird.Core.Game.prototype.loop = function () {

  if (FlappyBird.MODE == FlappyBird.IDLE) {
    this.bird.update();

    if (this.input.jump == true) {
      FlappyBird.MODE = FlappyBird.PLAY;
    }
  }

  if (FlappyBird.MODE == FlappyBird.PLAY) {
    this.bird.update();
    this.bird.handleInput(this.input);

    this.world.update();

    if (this.world.collides(this.bird)) {
      FlappyBird.MODE = FlappyBird.GAME_OVER;
      this.input.jump = false;
    } 
  }

  if (FlappyBird.MODE == FlappyBird.GAME_OVER) {
    this.bird.update();

    if (this.input.jump == true) {
      this.world = new FlappyBird.Core.World();
      this.bird = new FlappyBird.Core.Bird();
      FlappyBird.MODE = FlappyBird.IDLE;
      this.input.jump = false;
    }
  }

  this.world.draw(this.ctx);
  this.bird.draw(this.ctx);
  this.bird.score.draw(this.ctx);

  window.requestAnimationFrame(this.loop.bind(this));
};