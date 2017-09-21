enchant();
window.onload = function() {
  var game = new Game(320, 380);
  game.preload('public/game-tutorial/char.png', 'public/game-tutorial/map0.gif', 'public/game-tutorial/char-enemy.png');
  game.onload = function() {

    var scene = new Group();

    var map = new Map(16, 16);
    map.image = game.assets['public/game-tutorial/map0.gif'];

    var baseMap = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0],
      [0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    map.loadData(baseMap);
    scene.addChild(map);

    var player = new Sprite(218, 123);
    player.spriteOffset = 5;
    player.startingX = 6;
    player.startingY = 2;
    player.x = player.startingX * 16;
    player.y = player.startingY * 16;
    player.direction = 3;
    player.walk = 1;
    player.frame = 1;

    player.name = "Mike";
    player.characterClass = "Knight";
    player.exp = 0;
    player.level = 1;
    player.gp = 100;

    player.image = new Surface(218, 984);
    player.image.draw(game.assets['public/game-tutorial/char.png']);

    player.addEventListener('enterframe', function() {
    
     
    });

    setInterval(function () {
      player.frame++;
    }, 1000);

    player.addEventListener('touchstart', function() {
      console.log('this.frame ', this.frame )
      this.frame++;
      console.log('this.frame ', this.frame )
      this.x = this.x + 10;

      if (player.within(enemy, 30)) {
        alert("within hit!");
      }
    });

    scene.addChild(player);

    var enemy = new Sprite(92, 187);
    enemy.x = 2;
    enemy.y = 2;
    enemy.image = new Surface(92, 1310);
    enemy.image.draw(game.assets['public/game-tutorial/char-enemy.png']);

    enemy.addEventListener('enterframe', function() {

    });

    setInterval(function () {
      enemy.frame++;
    }, 1000);


    scene.addChild(enemy);

    game.rootScene.addChild(scene);
  };
  game.start();
};