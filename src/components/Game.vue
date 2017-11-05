<style>
  #gameScreen {
    margin: 0 auto;
  }

  #gameScreen .top-bar {
    margin: 0 auto;
    padding: 14px;
    width: 900px;
    height: 126px;
    background: url("/static/img/top-bar-background.svg")
  }

  #gameScreen .top-bar .button {
    background: url("/static/img/button.svg");
    width: 234px;
    height: 48px;
    border: 0;
    border-radius: 2px;
    font-size: 20px;
    color: rgba(255,255,255,0.8);
  }

  #gameScreen .top-bar button:disabled {
    color: #666;
  }

  #gameScreen .top-bar .battle-button {
    background: url("/static/img/battle-button.svg");
    width: 234px;
    height: 48px;
    border: 0;
    border-radius: 2px;
    margin-bottom: 6px;
    font-size: 20px;
    color: rgba(255,255,255,0.8);
  }

  #gameScreen .top-bar button:focus {
    outline: none;
  }

  #gameScreen .input-container {
    width: 100%;
  }

  #gameScreen .input-container label {
    color: rgba(0,0,0,.54);
    display: block;
    font-weight: bold;
    font-size: 16px;
  }

  #gameScreen .input-container input[type='text'] {
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(0,0,0,0.34);
    width: 100%;
    height: 32px;
    color: rgba(0,0,0,.54);
    line-height: 32px;
    font-size: 20px;
  }

  #gameScreen .input-container input[type='text']:focus {
    outline: none;
  }

  #gameScreen #phaser {
    position: relative;
    margin: 10px auto 0;
    padding: 6px;
    width: 900px;
    height: 668px;
    background: url("/static/img/game-container-background.svg");
  }

  #gameScreen #phaser .phaser-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #gameScreen #phaser .phaser-overlay .status {
    position: absolute;
    width: 369px;
    height: 326px;
    background: url("/static/img/status.svg");
  }

  #gameScreen #phaser .phaser-overlay .status.hero {
    top: 20px;
    left: 20px;
  }

  #gameScreen #phaser .phaser-overlay .status.challenger {
    top: 20px;
    right: 20px;
  }

  #gameScreen #phaser .phaser-overlay .status .hp {
    position: absolute;
    top: 76px;
    left: 19px;
    width: 331px;
    height: 18px;
    overflow: hidden;
  }

  #gameScreen #phaser .phaser-overlay .status .hp-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 331px;
    height: 18px;
  }

  #gameScreen #phaser .phaser-overlay .status .hp .hp-begin {
    position: absolute;
    width: 9px;
    height: 18px;
    background: url("/static/img/hp_begin.svg");
  }

  #gameScreen #phaser .phaser-overlay .status .hp .hp-middle {
    position: absolute;
    left: 9px;
    width: 9px;
    width: 313px;
    height: 18px;
    background: url("/static/img/hp_middle.svg");
  }

  #gameScreen #phaser .phaser-overlay .status .hp .hp-end {
    position: absolute;
    right: 0px;
    width: 9px;
    height: 18px;
    background: url("/static/img/hp_end.svg");
  }

  #gameScreen #phaser .phaser-overlay .status .info {
    position: absolute;
    top: 120px;
    left: 32px;
    right: 32px;
    bottom: 20px;
    text-align:left;
  }

  .large-button {
    width: 90% !Important;
  }

  /* Absolute Center Spinner */
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 1500ms infinite linear;
  -moz-animation: spinner 1500ms infinite linear;
  -ms-animation: spinner 1500ms infinite linear;
  -o-animation: spinner 1500ms infinite linear;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0, rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
  box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>

<template>
  <div id='gameScreen' style='margin-bottom: 5%;text-align:center;'>
    <div class="top-bar">
      <md-layout flex='100'>
        <md-layout flex='100'>
          <div class="input-container" style="margin-top:20px">
            <label>HERO</label>
            <input type="text"  style="cursor: pointer" v-model='hero' v-bind:readonly='isFindingAvatar' tabindex="1"/>
          </div>
        </md-layout>
        <md-layout md-align='center'>
          <button type="button"  style="cursor: pointer" class="battle-button" v-on:click='find' v-bind:disabled='isFindingAvatar || !hero || !enemy' tabindex="3">
            {{ !isFindingAvatar ? 'Start Battle' : 'Battle in progress'}}
          </button>
          <button type="button"  style="cursor: pointer" class="button" v-on:click='findFriends' v-bind:disabled='isFindingAvatar || !hero' tabindex="4">
            Find friends
          </button>
        </md-layout>
        <md-layout flex='100'>
          <div class="input-container" style="margin-top:20px">
            <label>CHALLENGER</label>
            <input type="text" style="cursor: pointer" v-model='enemy' v-bind:readonly='isFindingAvatar' tabindex="2"/>
          </div>
        </md-layout>
      </md-layout>
    </div>
    <md-dialog-alert
      :md-content="alert.content"
      :md-ok-text="alert.ok"
      @open="onOpen"
      @close="onClose"
      ref="dialogUserNotFound">
    </md-dialog-alert>
    <div id="phaser" ref="phaser">
      <div class="loading" v-if="showSpinner">Loading&#8230;</div>
      <div class="phaser-overlay">
        <div class="status hero" v-if="heroAvatar">
          <h1>{{hero}}</h1>
          <div class="hp" v-bind:style="{width: heroAvatar.HP/heroAvatar.TOTAL_HP * 331 + 'px'}">
            <div class="hp-background">
              <div class="hp-begin"></div>
              <div class="hp-middle"></div>
              <div class="hp-end"></div>
            </div>
          </div>
          <div class="info">
            HP: {{heroAvatar.HP}}
            <br>
            TOTAL HP: {{heroAvatar.HP}}
            <br>
            MP: {{heroAvatar.MP}}
            <br>
            P. ATCK: {{heroAvatar.P_ATCK}}
            <br>
            P. DEF: {{heroAvatar.P_DEF}}
            <br>
            SPEED: {{heroAvatar.SPEED}}
            <br>
            CRITICAL: {{heroAvatar.CRITICAL}}
            <br>
            ACCURACY: {{heroAvatar.ACCURACY}}
            <br>
            STAMINA: {{heroAvatar.STAMINA}}
          </div>
        </div>

        <div class="status challenger" v-if="enemyAvatar">
          <h1>{{enemy}}</h1>
          <div class="hp" v-bind:style="{width: enemyAvatar.HP/enemyAvatar.TOTAL_HP * 331 + 'px'}">
            <div class="hp-background">
              <div class="hp-begin"></div>
              <div class="hp-middle"></div>
              <div class="hp-end"></div>
            </div>
          </div>
          <div class="info">
            HP: {{enemyAvatar.HP}}
            <br>
            TOTAL HP: {{enemyAvatar.HP}}
            <br>
            MP: {{enemyAvatar.MP}}
            <br>
            P. ATCK: {{enemyAvatar.P_ATCK}}
            <br>
            P. DEF: {{enemyAvatar.P_DEF}}
            <br>
            SPEED: {{enemyAvatar.SPEED}}
            <br>
            CRITICAL: {{enemyAvatar.CRITICAL}}
            <br>
            ACCURACY: {{enemyAvatar.ACCURACY}}
            <br>
            STAMINA: {{enemyAvatar.STAMINA}}
          </div>
        </div>
      </div>
    </div>
    <div style="width: 900px; display: inline-flex;">
      <div v-if='!isFindingAvatar' id="scroll">
        <a onclick="window.scrollTo(0, 0)" v-for='item in friends' :key='item.login' style='padding-left: 2%;'>
          <img v-bind:src='item.image' v-on:click='enemy = item.login' :name="item.login" alt='item.login'  style='border-radius: 50%; width: 10%; padding-bottom: 1%; margin-top:1%; cursor: pointer' v-bind:title='item.login'>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  import axios from 'axios'
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Status from '../service/status-service'

  Vue.use(VueMaterial)

  export default {
    name: 'game',
    props: {
      width: {
        default: 888,
        type: Number
      },
      height: {
        default: 656,
        type: Number
      }
    },
    mounted () {
      this.showSpinner = true
      let self = this
      if (this.game === null) {
        this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, this.$refs['phaser'], {
          preload: function preload () {
            self.preload(this)
          },
          create: function create () {
            self.create(this)
          },
          update: function update () {
            self.update(this)
          }
        })
      }
    },
    methods: {
      openDialog (ref) {
        this.$refs[ref].open()
      },
      closeDialog (ref) {
        this.$refs[ref].close()
      },
      onOpen () {
        console.log('Opened')
      },
      onClose (type) {
        console.log('Closed', type)
      },
      findFriends () {
        this.showSpinner = true
        axios.get(`/api/friends?username=${this.hero}`).then(res => {
          this.showSpinner = false
          this.friends = res.data.map(data => {
            return {login: data.login, image: data.avatar_url}
          })
          window.scrollBy(0, window.innerHeight)
        }).catch(e => {
          this.showInformation(this.hero)
          this.hero = null
          this.showSpinner = false
        })
      },
      animateBaseHero (sprite) {
        const fight = this.heroChar.animations.add('walk', sprite, 10, true)
        fight.enableUpdate = true
        fight.onUpdate.add(this.onHeroUpdate, this)
        this.heroChar.animations.play('walk', this.calculateSpeed().hero, true)
      },
      animateBaseEnemy (sprite) {
        const fight = this.enemyChar.animations.add('walk', sprite, 10, true)
        fight.enableUpdate = true
        fight.onUpdate.add(this.onEnemyUpdate, this)
        this.enemyChar.animations.play('walk', this.calculateSpeed().enemy, true)
      },
      calculateSpeed () {
        const heroSpeed = this.heroAvatar.SPEED
        const enemySpeed = this.enemyAvatar.SPEED
        return {
          hero: heroSpeed > enemySpeed ? 5 : 4,
          enemy: enemySpeed > heroSpeed ? 5 : 4
        }
      },
      getHeroCharByLanguage (language) {
        const frames = {
          java: () => {
            this.createHeroAnimatioBase({scale: 1, width: this.width - 750, height: this.height - 400, frameImage: 'tanker-java'})
            this.animateBaseHero(this.getJavaFrame())
          },
          'c#': () => {
            this.createHeroAnimatioBase({scale: -1, width: this.width - 370, height: this.height - 180, frameImage: 'atacker-c#'})
            this.animateBaseHero(this.getCSharpFrame())
          },
          javascript: () => {
            this.createHeroAnimatioBase({scale: -1, width: this.width - 460, height: this.height - 255, frameImage: 'archer-javascript'})
            this.animateBaseHero(this.getJavaScriptFrame())
          },
          ruby: () => {
            this.createHeroAnimatioBase({scale: 1, width: this.width - 620, height: this.height - 255, frameImage: 'bau-ruby'})
            this.animateBaseHero(this.getRubyFrame())
          }
        }

        const other = () => {
          this.createHeroAnimatioBase({scale: -1, width: this.width - 460, height: this.height - 178, frameImage: 'other'})
          this.animateBaseHero(this.getOtherFrame())
        }

        return (frames[language.toLocaleLowerCase()] || other)()
      },
      getEnemyCharByLanguage (language) {
        const frames = {
          java: () => {
            this.createEnemyAnimatioBase({scale: -1, width: this.width - 150, height: this.height - 400, frameImage: 'tanker-java'})
            this.animateBaseEnemy(this.getJavaFrame())
          },
          'c#': () => {
            this.createEnemyAnimatioBase({scale: 1, width: this.width - 530, height: this.height - 180, frameImage: 'atacker-c#'})
            this.animateBaseEnemy(this.getCSharpFrame())
          },
          javascript: () => {
            this.createEnemyAnimatioBase({scale: 1, width: this.width - 460, height: this.height - 255, frameImage: 'archer-javascript'})
            this.animateBaseEnemy(this.getJavaScriptFrame())
          },
          ruby: () => {
            this.createEnemyAnimatioBase({scale: -1, width: this.width - 250, height: this.height - 255, frameImage: 'bau-ruby'})
            this.animateBaseEnemy(this.getRubyFrame())
          }
        }

        const other = () => {
          this.createEnemyAnimatioBase({scale: 1, width: this.width - 460, height: this.height - 178, frameImage: 'other'})
          this.animateBaseEnemy(this.getOtherFrame())
        }

        return (frames[language.toLocaleLowerCase()] || other)()
      },
      getJavaFrame () {
        return [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
      },
      getCSharpFrame () {
        return [2, 8, 11, 12, 13, 15, 16, 17, 18, 19, 23, 24, 25, 26, 27, 28, 29, 30, 31, 35, 36, 37, 38]
      },
      getJavaScriptFrame () {
        return [16, 17, 18, 19, 20, 29, 30, 29, 30, 31, 21, 22, 23, 24, 25, 26, 27, 36, 37, 38, 39, 40, 41]
      },
      getRubyFrame () {
        return [2, 3, 4, 5, 6, 22, 7, 8, 17, 18, 9, 1, 2, 3, 4, 5, 6, 22, 7, 8, 17, 18, 9]
      },
      getOtherFrame () {
        return [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
      },
      createHeroAnimatioBase (animation) {
        this.heroChar = this.game.add.sprite(animation.width, animation.height, animation.frameImage)
        this.heroChar.scale.x *= animation.scale
      },
      createEnemyAnimatioBase (animation) {
        this.enemyChar = this.game.add.sprite(animation.width, animation.height, animation.frameImage)
        this.enemyChar.scale.x *= animation.scale
      },
      punchHeroFrame (frame) {
        return this.frameMovement(this.heroApiResult, frame)
      },
      punchEnemyFrame (frame) {
        return this.frameMovement(this.enemyApiResult, frame)
      },
      frameMovement (user, frame) {
        const frames = {
          java: () => {
            return frame.index === 10 || frame.index === 24
          },
          'c#': () => {
            return frame.index === 15 || frame.index === 37
          },
          javascript: () => {
            return frame.index === 39 || frame.index === 40
          },
          ruby: () => {
            return frame.index === 9
          }
        }

        const other = () => {
          return frame.index === 12 || frame.index === 27
        }

        return (frames[user.repository.language.toLocaleLowerCase()] || other)()
      },
      isTrueBattle () {
        return (this.heroAvatar || false) && (this.heroAvatar.HP || false) && this.isBattle
      },
      cleanBattle () {
        this.cleanBar()
        if (this.enemyChar) {
          this.enemyChar.destroy()
        }
        if (this.heroChar) {
          this.heroChar.destroy()
        }
        if (this.heroName) {
          this.heroName.destroy()
        }
        if (this.enemyName) {
          this.enemyName.destroy()
        }
      },
      preload () {
        this.showSpinner = true
        this.game.load.spritesheet('tanker-java', 'static/game/char/tanker-385x318.png', 385, 318, 27)
        this.game.load.spritesheet('atacker-c#', 'static/game/char/paladin-249x100.png', 249, 100, 39)
        this.game.load.spritesheet('archer-javascript', 'static/game/char/archer-158x173.png', 158, 173, 46)
        this.game.load.spritesheet('other', 'static/game/char/wizard-161x106.png', 161, 106, 36)
        this.game.load.spritesheet('bau-ruby', 'static/game/pet/bau-231x172.png', 213, 172, 24)

        this.game.load.image('background', 'static/game/img/background.v1.png')
      },
      create (phaser) {
        this.game.add.tileSprite(0, 0, 1300, 700, 'background')
        this.showSpinner = false
      },
      update (phaser) {
      },
      onHeroUpdate (anim, frame) {
        if (this.isTrueBattle() && this.punchHeroFrame(frame)) {
          console.log('hero punch', frame.index)
          this.createHeroBattle()
          this.updateAvatarBar()
        }
      },
      onEnemyUpdate (anim, frame) {
        if (this.isTrueBattle() && this.punchEnemyFrame(frame)) {
          console.log('enemy punch', frame.index)
          this.createEnemyBattle()
          this.updateAvatarBar()
        }
      },
      createHeroBattle () {
        this.enemyAvatar.HP -= this.createBattleSystem(this.heroAvatar)
        this.verifyWinner()
      },
      createEnemyBattle () {
        this.heroAvatar.HP -= this.createBattleSystem(this.enemyAvatar)
        this.verifyWinner()
      },
      createBattleSystem (avatar) {
        let punchEnemy = Math.floor(avatar.P_DEF / 100)
        const accuracy = Math.round(avatar.ACCURACY / 100)
        const stamina = Math.round(avatar.STAMINA / 100)
        const critical = (Math.floor(Math.random() * 100001) < avatar.CRITICAL ? 2 : 1)
        return (Math.floor(avatar.P_ATCK / 100) + punchEnemy + Math.round(accuracy + stamina / 2)) * critical
      },
      verifyWinner () {
        if (this.enemyAvatar.HP <= 0 && this.isBattle) {
          this.isBattle = false
          this.enemyAvatar.HP = 0
          this.isFindingAvatar = false
          if (this.heroAvatar.HP <= 0) {
            this.heroAvatar.HP = 0
          }
          this.pauseBattle()
        } else if (this.heroAvatar.HP <= 0 && this.isBattle) {
          this.isBattle = false
          this.heroAvatar.HP = 0
          this.isFindingAvatar = false
          if (this.enemyAvatar.HP <= 0) {
            this.enemyAvatar.HP = 0
          }
          this.pauseBattle()
        } else {
          this.isBattle = true
        }
      },
      pauseBattle () {
        this.heroChar.animations.paused = true
        this.enemyChar.animations.paused = true
      },
      cleanBar () {
        if (this.heroText) {
          this.heroText.destroy()
        }
        if (this.enemyText) {
          this.enemyText.destroy()
        }
      },
      updateAvatarBar () {
        this.cleanBar()
      },
      dealingWithLocale (data) {
        let currentStreak = []
        let lastCommit = 0
        data.forEach(function (data, index) {
          const date = data.date
          const currentCommit = data.commit
          if (new Date(data.date.replace('-', '/')).getTime() <= new Date().getTime()) {
            if (currentCommit > 0 && (lastCommit > 0 || currentStreak.length === 0)) {
              currentStreak.push({
                date: date,
                commit: currentCommit
              })
            } else {
              currentStreak = []
            }
          }
          lastCommit = data.commit
        })
        return currentStreak.length
      },
      showInformation (avatar) {
        if (avatar) {
          this.alert.content = `Enemy "${avatar}" not found.`
          this.openDialog('dialogUserNotFound')
          this.isFindingAvatar = false
          this.showSpinner = false
          this.isFindingAvatar = false
          this.friends = []
        }
      },
      find () {
        this.showSpinner = true
        this.cleanBattle()
        this.heroName = this.game.add.text(200, 32, null, { font: '32px Arial', fill: '#FFE848' })
        this.enemyName = this.game.add.text(this.width - 400, 32, null, { font: '32px Arial', fill: '#FFE848' })
        this.isFindingAvatar = true
        const getHeroRepository = axios.get(`/api/repository/format?username=${this.hero}`).then(res => {
          return res.data
        }).catch(e => {
          this.showInformation(this.hero)
          this.hero = null
        })
        const getEnemyRepository = axios.get(`/api/repository/format?username=${this.enemy}`).then(res => {
          return res.data
        }).catch(e => {
          this.showInformation(this.enemy)
          this.enemy = null
        })
        const getHeroInformation = axios.get(`/api/user/full?username=${this.hero}`).then(res => {
          return res.data
        }).catch(e => {
          this.showInformation(this.hero)
          this.hero = null
        })
        const getEnemyInformation = axios.get(`/api/user/full?username=${this.enemy}`).then(res => {
          return res.data
        }).catch(e => {
          this.showInformation(this.enemy)
          this.enemy = null
        })
        const getHeroCurrentStreak = axios.get(`/api/streak/full?username=${this.hero}`).then(res => {
          return this.dealingWithLocale(res.data)
        }).catch(e => {
          this.showInformation(this.hero)
          this.hero = null
        })
        const getEnemyCurrentStreak = axios.get(`/api/streak/full?username=${this.enemy}`).then(res => {
          return this.dealingWithLocale(res.data)
        }).catch(e => {
          this.showInformation(this.enemy)
          this.enemy = null
        })

        Promise.all([
          getHeroRepository,
          getHeroInformation,
          getHeroCurrentStreak,
          getEnemyRepository,
          getEnemyInformation,
          getEnemyCurrentStreak
        ]).then(([getHeroRepository, getHeroUserInformation, getHeroUserCurrentStreak, getEnemyRepository, getEnemyUserInformation, getEnemyUserCurrentStreak]) => {
          const heroAvatar = {
            repository: getHeroRepository,
            information: getHeroUserInformation,
            currentStreak: getHeroUserCurrentStreak
          }
          this.heroApiResult = heroAvatar
          const enemyAvatar = {
            repository: getEnemyRepository,
            information: getEnemyUserInformation,
            currentStreak: getEnemyUserCurrentStreak
          }
          this.enemyApiResult = enemyAvatar

          this.heroAvatar = Status.calculate(heroAvatar)
          this.enemyAvatar = Status.calculate(enemyAvatar)

          this.getHeroCharByLanguage(getHeroRepository.language)
          this.getEnemyCharByLanguage(getEnemyRepository.language)

          this.isBattle = true
          this.updateAvatarBar()
          this.showSpinner = false
        })
      }
    },
    destroyed () {
      this.game.destroy()
    },
    data () {
      return {
        game: null,
        heroName: null,
        enemyName: null,
        heroAvatar: null,
        enemyAvatar: null,
        hero: '',
        enemy: '',
        heroText: null,
        enemyText: null,
        isBattle: false,
        isFindingAvatar: false,
        heroChar: null,
        heroPetChar: null,
        enemyPetChar: null,
        enemyChar: null,
        heroApiResult: null,
        enemyApiResult: null,
        friends: null,
        showSpinner: false,
        alert: {
          content: 'inital',
          ok: 'Close'
        }
      }
    },
    watch: {
      view: function (val) {
        this.$nextTick(() => {
          this.game.update()
        })
      }
    }
  }
</script>
