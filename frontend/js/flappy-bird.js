var IDLE = 0;
var PLAY = 1;
var GAME_OVER = 2;
var mode = IDLE;

var Input = function () {
  this.jump = false;

  this.initListeners();
};

Input.prototype.initListeners = function () {
  document.addEventListener('keydown', this._keyDown.bind(this));
  document.addEventListener('keyup', this._keyUp.bind(this));
};

Input.prototype._keyDown = function (e) {
  var code = e.keyCode;

  switch (code) {
    case 32 :
      this.jump = true;
      e.preventDefault();
      break;
    default :
      break;
  }
};

Input.prototype._keyUp = function (e) {
  var code = e.keyCode;
  e.preventDefault();

  switch (code) {
    case 32 :
      this.jump = false;
      e.preventDefault();
      break;
    default :
      break;
  }
};

var randomBewteen = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var Score = function () {
  this.score = 0;
  this.pos = {
    x : 190,
    y : 40,
  };
};

Score.prototype.increase = function () {
  this.score++;
};

Score.prototype.draw = function (ctx) {
  ctx.save();
  {
    ctx.translate(this.pos.x, this.pos.y);
    ctx.font = "40px Monaco";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(this.score, 0, 0);
  }
  ctx.restore();
};

var Pipe = function (y) {
  this.bounds = {
    width : 40,
    height : 667,
  };
  this.pos = {
    x : 600,
    y : randomBewteen(200, 500),
  };
  this.vel = {
    x : -2,
    y : 0,
  };
  this.gap = 150;
  this.passed = false;
};

Pipe.prototype.update = function () {
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
};

Pipe.prototype.draw = function (ctx) {
  ctx.save();
  {
    ctx.translate(this.pos.x - (this.bounds.width / 2), 0);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(0, 0, this.bounds.width, this.bounds.height);
  }
  ctx.restore();

  ctx.save();
  {
    ctx.translate(this.pos.x - (this.bounds.width / 2), this.pos.y - this.gap / 2);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.bounds.width, this.gap);
  }
  ctx.restore();
};

Pipe.prototype.collides = function (bird) {
  if (this.pos.x - (this.bounds.width / 2) < bird.pos.x + bird.radius && this.pos.x + (this.bounds.width / 2) > bird.pos.x - bird.radius) {
    if (bird.pos.y - bird.radius <= this.pos.y - (this.gap / 2) || bird.pos.y + bird.radius > this.pos.y + (this.gap / 2)) {
      return true;
    } else {
      if (!this.passed) {
        this.passed = true;
        bird.score.increase();
      }
    }
  }

  return false;
};

var World = function () {
  this.bounds = {
    width : 0,
    height : 0,
  };
  this.pipes = [new Pipe()];
};

World.prototype.update = function () {
  var self = this;

  this.pipes.forEach(function (pipe, index) {
    pipe.update();
    if (pipe.pos.x + pipe.bounds.width < 0) {
      self.pipes.splice(index, 1);
    }
  });

  if (this.pipes.length == 0 || this.pipes[this.pipes.length - 1].pos.x < 400) {
    this.pipes.push(new Pipe());
  }
};

World.prototype.collides = function (bird) {
  var collides = false;

  if (bird.pos.y + bird.radius >= this.bounds.height) {
    return true;
  }

  this.pipes.forEach(function (pipe, index) {
    collides = pipe.collides(bird) || collides;
  });

  return collides;
};

World.prototype.draw = function (ctx) {
  this.clear(ctx);

  this.pipes.forEach(function (pipe, index) {
    pipe.draw(ctx);
  });
};

World.prototype.clear = function (ctx) {
  ctx.save();
  {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.bounds.width, this.bounds.height);
  }
  ctx.restore();
};

var Bird = function (x, y) {
  this.radius = 14;
  this.pos = {
    x : x,
    y : y,
  };
  this.vel = {
    x : 0,
    y : 0,
  };
  this.acc = {
    x : 0,
    y : 0,
  };
  this.angle = 0;
  this.score = new Score();
  this.jumping = false;
  this.image = new Image();
  this.image.src = "img/bird.png";
  this.clip = {
    width : 46,
    height : 32,
    x : 0,
    y : 0,
  };
  this.frame = 0;
};

Bird.prototype.update = function () {
  this.frame++;
  if (this.frame >= 60) {
    this.frame = 0;
  }
  this.clip.x = Math.floor(this.frame * 2 / 20 % 3) * this.clip.width;

  if (mode == IDLE) {
    if (this.frame < 30) {
      this.pos.y--;
    } else {
      this.pos.y++;
    }
  }

  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;
  if (this.vel.y < 0 && this.angle >= -0.5) {
    this.angle -= 0.05;
  }
  if (this.vel.y > 0 && this.angle <= 0.5) {
    this.angle += 0.05;
  }
};

Bird.prototype.handleInput = function (input) {
  if (!this.jumping && input.jump === true) {
    this.vel.y = -10;
    this.jumping = true;
  }

  if (input.jump === false) {
    this.jumping = false;
  }
};

Bird.prototype.draw = function (ctx) {
  ctx.save();
  {
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);
    ctx.translate(-this.radius, -this.radius);
    ctx.drawImage(this.image, this.clip.x, this.clip.y, this.clip.width, this.clip.height, 0, 0, this.clip.width, this.clip.height);
  }
  ctx.restore();
};

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var world = new World();
world.bounds.width = canvas.width;
world.bounds.height = canvas.height;

var input = new Input();
var bird = new Bird(world.bounds.width / 2, world.bounds.height / 2);

var update = function () {

  if (mode == IDLE) {
    bird.update();

    if (input.jump == true) {
      mode = PLAY;
    }
  }

  if (mode == PLAY) {
    bird.acc.y = 0.6;
    bird.update();
    bird.handleInput(input);

    world.update();

    if (world.collides(bird)) {
      mode = GAME_OVER;
      this.input.jump = false;
    } 
  }

  if (mode == GAME_OVER) {
    bird.acc.y = 0.6;
    bird.update();

    if (input.jump == true) {
      world = new World();
      world.bounds.width = canvas.width;
      world.bounds.height = canvas.height;
      bird = new Bird(world.bounds.width / 2, world.bounds.height / 2);
      mode = IDLE;
      input.jump = false;
    }
  }

  world.draw(ctx);
  bird.draw(ctx);
  bird.score.draw(ctx);

  window.requestAnimationFrame(update);
};

var birdImage = new Image();
birdImage.addEventListener('load', function () {
  update();
});
birdImage.src = "img/bird.png";