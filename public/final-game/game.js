var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {
  game.load.spritesheet('mummy', 'public/final-game/char.png', 161, 106, 18);
  game.load.spritesheet('enemy', 'public/final-game/enemy.png',385, 318, 18);
}

var text;

function create() {

  var mummy = game.add.sprite(450,245, 'mummy');

  var walk = mummy.animations.add('walk');

  walk.enableUpdate = true;
  walk.onUpdate.add(onUpdate, this);

  mummy.animations.play('walk', 5, true);

  var enemy = game.add.sprite(130, 30, 'enemy');

  var walkEnemy = enemy.animations.add('walk');

  walkEnemy.enableUpdate = true;

  enemy.animations.play('walk', 5, true);


  text = game.add.text(600, 50, "Frame 1", { font: "28px Arial", fill: "#ff0044" });

  text = game.add.text(50, 500, "Frame 1", { font: "28px Arial", fill: "#ff0044" });

}

function onUpdate(anim, frame) {

  text.text = 'Frame ' + frame.index;

}