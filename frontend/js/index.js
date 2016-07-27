var canvas = document.querySelector('canvas');

var birdImage = new Image();
birdImage.addEventListener('load', function () {
  var game = new FlappyBird.Core.Game(canvas);
});
birdImage.src = "img/bird.png";