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
  this.titleSprite = new FlappyBird.Graphics.Sprite(188, 38, 110, 64);
  this.summarySprite = new FlappyBird.Graphics.Sprite(226, 116, 0, 918);
  this.medalSprite = new FlappyBird.Graphics.Sprite(44, 44, 0, 1034);
  this.numbersSprite = new FlappyBird.Graphics.Sprite(16, 14, 108, 102);
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

FlappyBird.Core.GameOver.prototype.draw = function (ctx) {
  if (FlappyBird.MODE !== FlappyBird.GAME_OVER) {
    return;
  }
  
  // TITLE
  ctx.save();
  {
    ctx.translate(this.pos.x - (this.titleSprite.width / 2), this.pos.y);
    this.titleSprite.draw(ctx);
  }
  ctx.restore();

  // SUMMARY
  ctx.save();
  {
    ctx.translate(this.pos.x - (this.summarySprite.width / 2), this.pos.y + 58);
    this.summarySprite.draw(ctx);
  }
  ctx.restore();

  // Medal
  var medal = FlappyBird.Score.getMedal();
  if (medal !== null) {
    ctx.save();
    {
      ctx.translate(this.pos.x - (this.summarySprite.width / 2) + 26, this.pos.y + 101);
      this.medalSprite.draw(ctx, medal);
    }
    ctx.restore();
  }

  // Score
  var score = FlappyBird.Score.score;
  var scoreWidth = FlappyBird.Utils.getStringSpriteWidth(score.toString(10), this.numbersSprite);

  for (var i = 0; i < score.toString(10).length; i = i + 1) {
    ctx.save();
    {
      ctx.translate(this.pos.x + 93 - scoreWidth, this.pos.y + 91);
      var offset = i * this.numbersSprite.width;
      ctx.translate(offset, 0);
      this.numbersSprite.draw(ctx, score.toString(10)[i]);
    }
    ctx.restore();
  };

  // Best
  var best = FlappyBird.Score.maxScore;
  var bestWidth = FlappyBird.Utils.getStringSpriteWidth(best.toString(10), this.numbersSprite);

  for (var i = 0; i < best.toString(10).length; i = i + 1) {
    ctx.save();
    {
      ctx.translate(this.pos.x + 93 - bestWidth, this.pos.y + 133);
      var offset = i * this.numbersSprite.width;
      ctx.translate(offset, 0);
      this.numbersSprite.draw(ctx, best.toString(10)[i]);
    }
    ctx.restore();
  };
};