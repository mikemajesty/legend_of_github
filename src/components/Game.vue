<template>
  <div id='gameScreen' style='margin-bottom: 5%;'>
    <md-layout flex='100' style='padding: 2%; padding-top: 0px;'>
      <md-layout flex='100'>
        <md-input-container>
          <label>HERO</label>
          <md-input v-model='hero' v-bind:readonly='isFindingAvatar'></md-input>
        </md-input-container>
      </md-layout>
      <md-layout md-align='center'>
        <md-button class='md-raised md-primary large-button' v-on:click.native='find' v-bind:disabled='isFindingAvatar || !hero || !enemy'>
          {{ !isFindingAvatar ? 'Start Battle' : 'Battle in progress'}}
        </md-button>
         <md-button class='md-raised md-primary large-button' v-on:click.native='findFriends' v-bind:disabled='isFindingAvatar || !hero'>
          Find friends
        </md-button>
      </md-layout>
      <md-layout>
        <md-input-container flex='100'>
          <label>ENEMY</label>
          <md-input v-model='enemy' v-bind:readonly='isFindingAvatar'></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <carousel v-if='!isFindingAvatar'>
      <slide v-for='item in friends' :key='item.login' style='padding-left: 2%'>
        <img v-bind:src='item.image'  v-on:click='enemy = item.login' alt='item.login'  style='border-radius: 50%; width: 15%' v-bind:title='item.login'>
      </slide>
    </carousel>
    <md-dialog-alert
      :md-content="alert.content"
      :md-ok-text="alert.ok"
      @open="onOpen"
      @close="onClose"
      ref="dialogUserNotFound">
    </md-dialog-alert>
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
  import VueCarousel from 'vue-carousel'

  Vue.use(VueCarousel)

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
        axios.get(`/api/friends?username=${this.hero}`).then(res => {
          this.friends = res.data.map(data => {
            return {login: data.login, image: data.avatar_url}
          })
        }).catch(e => {
          console.log(e)
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
            this.createHeroAnimatioBase({scale: 1, width: this.width - 750, height: this.height - 400, frameImage: 'enemy-tanker-java'})
            this.animateBaseHero(this.getJavaFrame())
          },
          'c#': () => {
            this.createHeroAnimatioBase({scale: -1, width: this.width - 370, height: this.height - 180, frameImage: 'enemy-atacker-c#'})
            this.animateBaseHero(this.getCSharpFrame())
          },
          javascript: () => {
            this.createHeroAnimatioBase({scale: -1, width: this.width - 460, height: this.height - 255, frameImage: 'hero-archer-javascript'})
            this.animateBaseHero(this.getJavaScriptFrame())
          }
        }

        const other = () => {
          this.createHeroAnimatioBase({scale: -1, width: this.width - 460, height: this.height - 178, frameImage: 'hero-other'})
          this.animateBaseHero(this.getOtherFrame())
        }

        return (frames[language.toLocaleLowerCase()] || other)()
      },
      getEnemyCharByLanguage (language) {
        const frames = {
          java: () => {
            this.createEnemyAnimatioBase({scale: -1, width: this.width - 150, height: this.height - 400, frameImage: 'enemy-tanker-java'})
            this.animateBaseEnemy(this.getJavaFrame())
          },
          'c#': () => {
            this.createEnemyAnimatioBase({scale: 1, width: this.width - 530, height: this.height - 180, frameImage: 'enemy-atacker-c#'})
            this.animateBaseEnemy(this.getCSharpFrame())
          },
          javascript: () => {
            this.createEnemyAnimatioBase({scale: 1, width: this.width - 460, height: this.height - 255, frameImage: 'hero-archer-javascript'})
            this.animateBaseEnemy(this.getJavaScriptFrame())
          }
        }

        const other = () => {
          this.createEnemyAnimatioBase({scale: 1, width: this.width - 460, height: this.height - 178, frameImage: 'hero-other'})
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
      getOtherFrame () {
        return [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
      },
      createHeroAnimatioBase (animation) {
        console.log('frame image hero', animation.frameImage)
        this.heroChar = this.game.add.sprite(animation.width, animation.height, animation.frameImage)
        this.heroChar.scale.x *= animation.scale
      },
      createEnemyAnimatioBase (animation) {
        console.log('frame image enemy', animation.frameImage)
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
          }
        }

        const other = () => {
          return frame.index === 12 || frame.index === 26
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
        this.heroText = this.game.add.text(32, 100, 'heroAvatar', { font: '20px Arial', fill: '#FFE848' })
        this.heroText.text = `HP: ${this.heroAvatar.HP}\nMP: ${this.heroAvatar.MP}\nP. ATCK: ${this.heroAvatar.P_ATCK}\nP. DEF: ${this.heroAvatar.P_DEF}\nSPEED: ${this.heroAvatar.SPEED}\nCRITICAL: ${this.heroAvatar.CRITICAL}\nACCURACY: ${this.heroAvatar.ACCURACY}\nSTAMINA: ${this.heroAvatar.STAMINA}`
        this.enemyText = this.game.add.text(this.width - 210, 100, 'enemyAvatar', { font: '20px Arial', fill: '#FFE848' })
        this.enemyText.text = `HP: ${this.enemyAvatar.HP}\nMP: ${this.enemyAvatar.MP}\nP. ATCK: ${this.enemyAvatar.P_ATCK}\nP. DEF: ${this.enemyAvatar.P_DEF}\nSPEED: ${this.enemyAvatar.SPEED}\nCRITICAL: ${this.enemyAvatar.CRITICAL}\nACCURACY: ${this.enemyAvatar.ACCURACY}\nSTAMINA: ${this.enemyAvatar.STAMINA}`
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
      find () {
        this.cleanBattle()
        this.heroName = this.game.add.text(200, 32, null, { font: '32px Arial', fill: '#FFE848' })
        this.enemyName = this.game.add.text(this.width - 400, 32, null, { font: '32px Arial', fill: '#FFE848' })
        this.isFindingAvatar = true
        const getHeroRepository = axios.get(`/api/repository/format?username=${this.hero}`).then(res => {
          return res.data
        }).catch(e => {
          this.alert.content = `Hero "${this.hero}" not found.`
          this.openDialog('dialogUserNotFound')
          this.isFindingAvatar = false
          this.hero = null
        })
        const getEnemyRepository = axios.get(`/api/repository/format?username=${this.enemy}`).then(res => {
          return res.data
        }).catch(e => {
          this.alert.content = `Enemy "${this.enemy}" not found.`
          this.openDialog('dialogUserNotFound')
          this.isFindingAvatar = false
        })
        const getHeroInformation = axios.get(`/api/user/full?username=${this.hero}`).then(res => {
          return res.data
        }).catch(e => {
          this.alert.content = `Hero "${this.hero}" not found.`
          this.openDialog('dialogUserNotFound')
          this.isFindingAvatar = false
          this.hero = null
        })
        const getEnemyInformation = axios.get(`/api/user/full?username=${this.enemy}`).then(res => {
          return res.data
        }).catch(e => {
          this.alert.content = `Enemy "${this.enemy}" not found.`
          this.openDialog('dialogUserNotFound')
          this.isFindingAvatar = false
        })
        const getHeroCurrentStreak = axios.get(`/api/streak/full?username=${this.hero}`).then(res => {
          return this.dealingWithLocale(res.data)
        }).catch(e => {
          this.alert.content = `Hero "${this.hero}" not found.`
          this.openDialog('dialogUserNotFound')
          this.isFindingAvatar = false
          this.hero = null
        })
        const getEnemyCurrentStreak = axios.get(`/api/streak/full?username=${this.enemy}`).then(res => {
          return this.dealingWithLocale(res.data)
        }).catch(e => {
          this.alert.content = `Enemy "${this.enemy}" not found.`
          this.openDialog('dialogUserNotFound')
          this.isFindingAvatar = false
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
        enemyApiResult: null,
        friends: null,
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
