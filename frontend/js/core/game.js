"use strict";


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.IDLE       = 0;
FlappyBird.PLAY       = 1;
FlappyBird.GAME_OVER  = 2;

FlappyBird.Core.Game = function (canvas) {
  FlappyBird.MODE = FlappyBird.IDLE;

  this.canvas = canvas;
  
  this.resize();

  FlappyBird.WIDTH = this.canvas.width;
  FlappyBird.HEIGHT = this.canvas.height;

  this.ctx = this.canvas.getContext('2d');
  this.input = new FlappyBird.Core.Input();
  this.world = new FlappyBird.Core.World();
  this.bird = new FlappyBird.Core.Bird();
  this.idleOverlay = new FlappyBird.Core.IdleOverlay();
  this.gameOver = new FlappyBird.Core.GameOver();

  FlappyBird.Score = new FlappyBird.Core.Score();

  this.loop();
};

FlappyBird.Core.Game.prototype.resize = function () {
  var ratio = canvas.height / window.innerHeight;
  this.canvas.style.height = window.innerHeight + "px";
  this.canvas.width = window.innerWidth * ratio;
};

FlappyBird.Core.Game.prototype.loop = function () {

  this.input.onFrame();

  if (FlappyBird.MODE == FlappyBird.IDLE) {
    this.bird.update();
    this.world.update();
    this.idleOverlay.update();

    if (this.input.jump == true) {
      FlappyBird.MODE = FlappyBird.PLAY;
    }
  }

  if (FlappyBird.MODE == FlappyBird.PLAY) {
    this.idleOverlay.reset();
    this.bird.handleInput(this.input);
    this.bird.update();

    this.world.update();

    if (this.world.collidesWithPipe(this.bird) || this.world.collidesWithGround(this.bird)) {
      FlappyBird.MODE = FlappyBird.GAME_OVER;
      this.input.suspend(60);
      this.gameOver.reset();

      FlappyBird.Score.commit();

      if (FlappyBird.DEBUG) {
        return;
      }
    } 
  }

  if (FlappyBird.MODE == FlappyBird.GAME_OVER) {
    this.bird.update();
    this.gameOver.update();

    if (this.world.collidesWithGround(this.bird)) {
      this.bird.vel.y = 0;
      this.bird.acc.y = 0;
    } 

    if (this.input.jump == true) {
      this.world.reset();
      this.bird.reset();
      FlappyBird.Score.reset();
      FlappyBird.MODE = FlappyBird.IDLE;
      this.input.suspend(60);
    }
  }

  this.world.draw(this.ctx);
  this.bird.draw(this.ctx);
  this.idleOverlay.draw(this.ctx);
  this.gameOver.draw(this.ctx);
  FlappyBird.Score.draw(this.ctx);

  requestAnimFrame(this.loop.bind(this));
};