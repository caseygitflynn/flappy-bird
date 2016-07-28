var FlappyBird = FlappyBird || {};

FlappyBird.Core = FlappyBird.Core || {};

FlappyBird.Core.GameOver = function () {
  this.pos = {
    x : FlappyBird.WIDTH / 2,
    y : -38,
  };
  this.acc = {
    x : 0,
    y : FlappyBird.GRAVITY * 2,
  };
  this.vel = {
    x : 0,
    y : 0,
  };
  this.sprite = {
    title : {
      width : 188,
      height : 38,
      x : 110,
      y : 64,
    },
    summary : {
      width : 226,
      height : 116,
      x : 0,
      y : 918,
    },
    medal : {
      width : 44,
      height : 44,
      x : 0,
      y : 1034,
    },
    numbers : {
      width : 16,
      height : 14,
      x : 110,
      y : 102,
    }
  };
  this.image = new Image();
  this.image.src = "img/sprites.png";
};

FlappyBird.Core.GameOver.prototype.reset = function () {
  this.pos = {
    x : FlappyBird.WIDTH / 2,
    y : -38,
  };
  this.vel = {
    x : 0,
    y : 0,
  };
};

FlappyBird.Core.GameOver.prototype.update = function () {
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;

  if (this.pos.y > 150) {
    this.pos.y = 150;
    this.vel.y = 0;
  }
};

FlappyBird.Core.GameOver.prototype._getNumberSprite = function (number) {
  return parseInt(number, 10) * this.sprite.numbers.width + this.sprite.numbers.x;
};

FlappyBird.Core.GameOver.prototype._getScoreWidth = function (number) {
  return number.toString(10).length * this.sprite.numbers.width;
};

FlappyBird.Core.GameOver.prototype.draw = function (ctx) {
  if (FlappyBird.MODE !== FlappyBird.GAME_OVER) {
    return;
  }
  
  // TITLE
  ctx.save();
  {
    ctx.translate(this.pos.x - (this.sprite.title.width / 2), this.pos.y);
    ctx.drawImage(this.image, this.sprite.title.x, this.sprite.title.y, this.sprite.title.width, this.sprite.title.height, 0, 0, this.sprite.title.width, this.sprite.title.height);
  }
  ctx.restore();

  // SUMMARY
  ctx.save();
  {
    ctx.translate(this.pos.x - (this.sprite.summary.width / 2), this.pos.y + this.sprite.title.height + 20);
    ctx.drawImage(this.image, this.sprite.summary.x, this.sprite.summary.y, this.sprite.summary.width, this.sprite.summary.height, 0, 0, this.sprite.summary.width, this.sprite.summary.height);
  }
  ctx.restore();

  // Medal
  var medal = FlappyBird.Score.getMedal();
  if (medal !== null) {
    ctx.save();
    {
      ctx.translate(this.pos.x - (this.sprite.summary.width / 2) + 26, this.pos.y + this.sprite.title.height + 63);
      ctx.drawImage(this.image, this.sprite.medal.x + (medal * this.sprite.medal.width), this.sprite.medal.y, this.sprite.medal.width, this.sprite.medal.height, 0, 0, this.sprite.medal.width, this.sprite.medal.height);
    }
    ctx.restore();
  }

  var score = FlappyBird.Score.score;

  // Score
  for (var i = 0; i < score.toString(10).length; i = i + 1) {
    ctx.save();
    {
      ctx.translate(this.pos.x + 95 - this._getScoreWidth(score), this.pos.y + this.sprite.title.height + 53);
      var offset = i * this.sprite.numbers.width;
      ctx.translate(offset, 0);
      ctx.drawImage(this.image, this._getNumberSprite(score.toString(10)[i]), this.sprite.numbers.y, this.sprite.numbers.width, this.sprite.numbers.height, 0, 0, this.sprite.numbers.width, this.sprite.numbers.height);
    }
    ctx.restore();
  };

  var best = FlappyBird.Score.maxScore;

  // Best
  for (var i = 0; i < best.toString(10).length; i = i + 1) {
    ctx.save();
    {
      ctx.translate(this.pos.x + 95 - this._getScoreWidth(best), this.pos.y + this.sprite.title.height + 95);
      var offset = i * this.sprite.numbers.width;
      ctx.translate(offset, 0);
      ctx.drawImage(this.image, this._getNumberSprite(best.toString(10)[i]), this.sprite.numbers.y, this.sprite.numbers.width, this.sprite.numbers.height, 0, 0, this.sprite.numbers.width, this.sprite.numbers.height);
    }
    ctx.restore();
  };

  // var best = FlappyBird.Score.maxScore;
  // ctx.save();
  // {
  //   ctx.translate(this.pos.x - (this.sprite.summary.width / 2) + 26, this.pos.y + this.sprite.title.height + 63);
  //   ctx.drawImage(this.image, this.sprite.medal.x + (medal * this.sprite.medal.width), this.sprite.medal.y, this.sprite.medal.width, this.sprite.medal.height, 0, 0, this.sprite.medal.width, this.sprite.medal.height);
  // }
  // ctx.restore();
};