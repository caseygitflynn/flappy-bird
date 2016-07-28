(function () {
  var canvas = document.querySelector('canvas');

  FlappyBird.Assets = new FlappyBird.AssetLoader();
  FlappyBird.Assets.loadImage('img/sprites.png', 'sprites', function (image) {
    var game = new FlappyBird.Core.Game(canvas);
  });
}());