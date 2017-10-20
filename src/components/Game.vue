<template>
  <div id='gameScreen' style='margin-bottom: 5%;'>
    <md-layout flex="100" style="padding: 2%; padding-top: 0px;">
      <md-layout flex="100">
        <md-input-container>
          <label>HERO</label>
          <md-input v-model="hero" v-bind:readonly="isFindingAvatar"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout md-align="center">
        <md-button class="md-raised md-primary large-button" v-on:click.native="find" v-bind:disabled="isFindingAvatar">
          {{ !isFindingAvatar ? 'Start Battle' : 'Battle in progress'}}
        </md-button>
      </md-layout>
      <md-layout>
        <md-input-container flex="100">
          <label>ENEMY</label>
          <md-input v-model="enemy" v-bind:readonly="isFindingAvatar"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
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
        default: 900,
        type: Number
      },
      height: {
        default: 710,
        type: Number
      }
    },
    mounted () {
      let self = this
      if (this.game === null) {
        this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, this.$el, {
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
      animateBaseHero (sprite) {
        const heroSpeed = this.heroAvatar.SPEED
        const enemySpeed = this.enemyAvatar.SPEED
        const fight = this.heroChar.animations.add('walk', sprite, 10, true)
        fight.enableUpdate = true
        fight.onUpdate.add(this.onHeroUpdate, this)
        this.heroChar.animations.play('walk', heroSpeed > enemySpeed ? 5 : 4, true)
      },
      animateBaseEnemy (sprite) {
        const heroSpeed = this.heroAvatar.SPEED
        const enemySpeed = this.enemyAvatar.SPEED
        const fight = this.enemyChar.animations.add('walk', sprite, 10, true)
        fight.enableUpdate = true
        fight.onUpdate.add(this.onEnemyUpdate, this)
        this.enemyChar.animations.play('walk', enemySpeed > heroSpeed ? 5 : 4, true)
      },
      getHeroCharByLanguage (language) {
        if (language.toLocaleLowerCase() === 'java') {
          this.heroChar = this.game.add.sprite(this.width - 750, this.height - 400, 'enemy-tanker-java')
          this.animateBaseHero([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27])
        } else if (language.toLocaleLowerCase() === 'c#') {
          this.heroChar = this.game.add.sprite(this.width - 370, this.height - 180, 'enemy-atacker-c#')
          this.heroChar.scale.x *= -1
          this.animateBaseHero([2, 8, 11, 12, 13, 15, 16, 17, 18, 19, 23, 24, 25, 26, 27, 28, 29, 30, 31, 35, 36, 37, 38])
        } else if (language.toLocaleLowerCase() === 'javascript') {
          this.heroChar = this.game.add.sprite(this.width - 460, this.height - 255, 'hero-archer-javascript')
          this.heroChar.scale.x *= -1
          this.animateBaseHero([16, 17, 18, 19, 20, 29, 30, 29, 30, 31, 21, 22, 23, 24, 25, 26, 27, 36, 37, 38, 39, 40, 41])
        } else {
          this.heroChar = this.game.add.sprite(this.width - 460, this.height - 178, 'hero-other')
          this.heroChar.scale.x *= -1
          this.animateBaseHero([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29])
        }
      },
      getEnemyCharByLanguage (language) {
        if (language.toLocaleLowerCase() === 'java') {
          this.enemyChar = this.game.add.sprite(this.width - 150, this.height - 400, 'hero-tanker-java')
          this.enemyChar.scale.x *= -1
          this.animateBaseEnemy([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27])
        } else if (language.toLocaleLowerCase() === 'c#') {
          this.enemyChar = this.game.add.sprite(this.width - 530, this.height - 180, 'hero-atacker-c#')
          this.animateBaseEnemy([2, 8, 11, 12, 13, 15, 16, 17, 18, 19, 23, 24, 25, 26, 27, 28, 29, 30, 31, 35, 36, 37, 38])
        } else if (language.toLocaleLowerCase() === 'javascript') {
          this.enemyChar = this.game.add.sprite(this.width - 460, this.height - 255, 'enemy-archer-javascript')
          this.animateBaseEnemy([16, 17, 18, 19, 20, 29, 30, 29, 30, 31, 21, 22, 23, 24, 25, 26, 27, 36, 37, 38, 39, 40, 41])
        } else {
          this.enemyChar = this.game.add.sprite(this.width - 460, this.height - 178, 'enemy-other')
          this.animateBaseEnemy([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29])
        }
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
          }
        }

        const other = {
          other: () => {
            return frame.index === 12 || frame.index === 26
          }
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
        this.game.load.spritesheet('hero-tanker-java', 'static/game/char/tanker-385x318.png', 385, 318, 27)
        this.game.load.spritesheet('enemy-tanker-java', 'static/game/char/tanker-385x318.png', 385, 318, 27)
        this.game.load.spritesheet('hero-atacker-c#', 'static/game/char/paladin-249x100.png', 249, 100, 39)
        this.game.load.spritesheet('enemy-atacker-c#', 'static/game/char/paladin-249x100.png', 249, 100, 39)
        this.game.load.spritesheet('hero-archer-javascript', 'static/game/char/archer-158x173.png', 158, 173, 46)
        this.game.load.spritesheet('enemy-archer-javascript', 'static/game/char/archer-158x173.png', 158, 173, 46)
        this.game.load.spritesheet('enemy-other', 'static/game/char/wizard-161x106.png', 161, 106, 36)
        this.game.load.spritesheet('hero-other', 'static/game/char/wizard-161x106.png', 161, 106, 36)

        this.game.load.image('background', 'static/game/img/background.v1.png')
      },
      create (phaser) {
        this.game.add.tileSprite(5, 5, 1300, 700, 'background')
      },
      update (phaser) {
      },
      onHeroUpdate (anim, frame) {
        this.heroName.text = this.hero
        this.enemyName.text = this.enemy
        if (this.isTrueBattle() && this.punchHeroFrame(frame)) {
          console.log('hero punch', frame.index)
          this.createHeroBattle()
          this.updateAvatarBar()
        }
      },
      onEnemyUpdate (anim, frame) {
        this.heroName.text = this.hero
        this.enemyName.text = this.enemy
        if (this.isTrueBattle() && this.punchEnemyFrame(frame)) {
          console.log('enemy punch', frame.index)
          this.createEnemyBattle()
          this.updateAvatarBar()
        }
      },
      createHeroBattle () {
        const punchHero = Math.floor(this.heroAvatar.P_DEF / 100)
        const accuracy = Math.round(this.heroAvatar.ACCURACY / 100)
        const stamina = Math.round(this.heroAvatar.STAMINA / 100)
        const critical = (Math.floor(Math.random() * 100001) < this.heroAvatar.CRITICAL ? 2 : 1)
        this.enemyAvatar.HP -= (Math.floor(this.heroAvatar.P_ATCK / 100) + punchHero + Math.round(accuracy + stamina / 2)) * critical
        this.verifyWinner()
      },
      createEnemyBattle () {
        let punchEnemy = Math.floor(this.enemyAvatar.P_DEF / 100)
        const accuracy = Math.round(this.enemyAvatar.ACCURACY / 100)
        const stamina = Math.round(this.enemyAvatar.STAMINA / 100)
        const critical = (Math.floor(Math.random() * 100001) < this.enemyAvatar.CRITICAL ? 2 : 1)
        this.heroAvatar.HP -= (Math.floor(this.enemyAvatar.P_ATCK / 100) + punchEnemy + Math.round(accuracy + stamina / 2)) * critical
        this.verifyWinner()
      },
      verifyWinner () {
        if (this.enemyAvatar.HP <= 0 && this.isBattle) {
          this.isBattle = false
          this.enemyAvatar.HP = 0
          this.isFindingAvatar = false
          if (this.heroAvatar.HP <= 0) {
            this.heroAvatar.HP = 0
          }
          this.heroChar.animations.paused = true
          this.enemyChar.animations.paused = true
        } else if (this.heroAvatar.HP <= 0 && this.isBattle) {
          this.isBattle = false
          this.heroAvatar.HP = 0
          this.isFindingAvatar = false
          if (this.enemyAvatar.HP <= 0) {
            this.enemyAvatar.HP = 0
          }
          this.heroChar.animations.paused = true
          this.enemyChar.animations.paused = true
        } else {
          this.isBattle = true
        }
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
        this.heroText = this.game.add.text(32, 100, 'heroAvatar', { font: '20px Arial', fill: '#FFE848' })
        this.heroText.text = `HP: ${this.heroAvatar.HP}\nMP: ${this.heroAvatar.MP}\nP. ATCK: ${this.heroAvatar.P_ATCK}\nP. DEF: ${this.heroAvatar.P_DEF}\nSPEED: ${this.heroAvatar.SPEED}\nCRITICAL: ${this.heroAvatar.CRITICAL}\nACCURACY: ${this.heroAvatar.ACCURACY}\nSTAMINA: ${this.heroAvatar.STAMINA}`
        this.enemyText = this.game.add.text(this.width - 210, 100, 'enemyAvatar', { font: '20px Arial', fill: '#FFE848' })
        this.enemyText.text = `HP: ${this.enemyAvatar.HP}\nMP: ${this.enemyAvatar.MP}\nP. ATCK: ${this.enemyAvatar.P_ATCK}\nP. DEF: ${this.enemyAvatar.P_DEF}\nSPEED: ${this.enemyAvatar.SPEED}\nCRITICAL: ${this.enemyAvatar.CRITICAL}\nACCURACY: ${this.enemyAvatar.ACCURACY}\nSTAMINA: ${this.enemyAvatar.STAMINA}`
      },
      find () {
        this.cleanBattle()
        this.heroName = this.game.add.text(200, 32, null, { font: '32px Arial', fill: '#FFE848' })
        this.enemyName = this.game.add.text(this.width - 400, 32, null, { font: '32px Arial', fill: '#FFE848' })
        this.isFindingAvatar = true
        const getHeroRepository = axios.get(`/api/repository/format?username=${this.hero}`).then(res => {
          return res.data
        }).catch(e => {
          console.log(e)
        })
        const getEnemyRepository = axios.get(`/api/repository/format?username=${this.enemy}`).then(res => {
          return res.data
        }).catch(e => {
          console.log(e)
        })
        const getHeroInformation = axios.get(`/api/user/full?username=${this.hero}`).then(res => {
          return res.data
        }).catch(e => {
          console.log(e)
        })
        const getEnemyInformation = axios.get(`/api/user/full?username=${this.enemy}`).then(res => {
          return res.data
        }).catch(e => {
          console.log(e)
        })
        const getHeroCurrentStreak = axios.get(`/api/streak/full?username=${this.hero}`).then(res => {
          let currentStreak = []
          let lastCommit = 0
          res.data.forEach(function (data, index) {
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
        }).catch(e => {
          console.log(e)
        })
        const getEnemyCurrentStreak = axios.get(`/api/streak/full?username=${this.enemy}`).then(res => {
          let currentStreak = []
          let lastCommit = 0
          res.data.forEach(function (data, index) {
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
        }).catch(e => {
          console.log(e)
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
        hero: 'mikemajesty',
        enemy: 'celso-wo',
        heroText: null,
        enemyText: null,
        isBattle: false,
        isFindingAvatar: false,
        heroChar: null,
        enemyChar: null,
        heroApiResult: null,
        enemyApiResult: null
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
<style>
  #gameScreen {
    margin: 0 auto;
  }

  .large-button {
    width: 90% !Important;
  }

  #gameScreen canvas {
    display: block;
    margin: 0 auto;
  }

</style>
