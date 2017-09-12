enchant();
window.onload = function() {
  var game = new Game(320, 320);
  game.preload('public/game-tutorial/chara0.gif', 'public/game-tutorial/map0.gif');
  game.onload = function() {

    var scene = new Group();

    var map = new Map(16, 16);
    map.image = game.assets['public/game-tutorial/map0.gif'];

    var baseMap = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
      [0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    map.loadData(baseMap);
    scene.addChild(map);

    var player = new Sprite(32, 32);
    player.spriteOffset = 5;
    player.startingX = 6;
    player.startingY = 10;
    player.x = player.startingX * 16 - 8;
    player.y = player.startingY * 16;
    player.direction = 3;
    player.walk = 1;
    player.frame = 1;

    player.image = new Surface(96, 128);
    player.image.draw(game.assets['public/game-tutorial/chara0.gif']);

    player.addEventListener('enterframe', function() {
      //this.frame = this.frame + 1;
    });

    scene.addChild(player);

    var enemy = new Sprite(32, 32);
    enemy.x = 6 * 30 - 8;
    enemy.y = 10 * 16;
    enemy.image = new Surface(96, 128);
    enemy.image.draw(game.assets['public/game-tutorial/chara0.gif']);

    scene.addChild(enemy);

    enemy.addEventListener('touchstart', function() {
      this.frame = this.frame + 1;
      /*if (player.intersect(enemy)) {
        alert("hit!");
      }*/
      
      /*if (player.within(enemy, 30)) {
        alert("hit!");
      }*/
    });

    player.addEventListener('touchstart', function() {
      this.frame = this.frame + 1;
      this.x = this.x + 10;
      /*if (player.intersect(enemy)) {
        alert("hit!");
      }*/

      if (player.within(enemy, 30)) {
        alert("hit!");
      }
    });

    game.rootScene.addChild(scene);
  };
  game.start();
};