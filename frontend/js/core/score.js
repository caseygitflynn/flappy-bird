"use strict";

var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.Score = function () {
  this.score = 0;
  this.maxScore = this.getHighScore();
  this.pos = {
    x : Math.floor(FlappyBird.WIDTH / 2),
    y : 40,
  };
  this.sprite = new FlappyBird.Graphics.Sprite(18, 20, 108, 0);
};

FlappyBird.Core.Score.prototype.getHighScore = function () {
  if (localStorage) {
    var highScore = localStorage.getItem("highScore");

    if (highScore) {
      return parseInt(highScore, 10);
    }
  }

  return 0;
};

FlappyBird.Core.Score.prototype.commit = function () {
  if (this.maxScore < this.score) {
    this.maxScore = this.score;
  }

  if (localStorage) {
    localStorage.setItem("highScore", this.maxScore);
  }
};

FlappyBird.Core.Score.prototype.reset = function () {
  this.score = 0;
};

FlappyBird.Core.Score.prototype.getMedal = function () {
  if (this.score < FlappyBird.BRONZE_SCORE) {
    return null;
  }

  if (this.score < FlappyBird.SILVER_SCORE) {
    return 0;
  }

  if (this.score < FlappyBird.GOLD_SCORE) {
    return 1;
  }

  if (this.score < FlappyBird.PLATINUM_SCORE) {
    return 2;
  }

  return 3;
};

FlappyBird.Core.Score.prototype.increase = function () {
  this.score++;
};

FlappyBird.Core.Score.prototype.draw = function (ctx) {
  if (FlappyBird.MODE == FlappyBird.IDLE) {
    return;
  }
  
  var width = FlappyBird.Utils.getStringSpriteWidth(this.score.toString(10), this.sprite);
  for (var i = 0; i < this.score.toString(10).length; i = i + 1) {
    ctx.save();
    {
      ctx.translate(this.pos.x - width / 2, this.pos.y);
      var offset = i * this.sprite.width;
      ctx.translate(offset, 0);
      this.sprite.draw(ctx, this.score.toString(10)[i]);
    }
    ctx.restore();
  };
};