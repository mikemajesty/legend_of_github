enchant();
window.onload = function() {
  var game = new Game(320, 320);
  game.preload('public/game-tutorial/char.gif', 'public/game-tutorial/map0.gif');
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

    var image = new Surface(48, 63);

    var player = new Sprite(48, 63);
    player.x = 6 * 16 - 8;
    player.y = 10 * 16;
    image.draw(game.assets['public/game-tutorial/char.gif']);
    player.image = image;

    scene.addChild(player);

    var enemy = new Sprite(48, 63);
    enemy.x = 6 * 30 - 8;
    enemy.y = 10 * 16;
    image.draw(game.assets['public/game-tutorial/char.gif']);
    enemy.image = image;

    scene.addChild(enemy);

    player.addEventListener('touchstart', function() {
      player.x += 10;

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