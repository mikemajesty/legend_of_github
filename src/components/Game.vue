<template>
  <div id='gameScreen'>
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

  Vue.use(VueMaterial)

  const calculate = function (avatar) {
    const repositories = avatar.repository
    const streak = avatar.currentStreak
    const information = avatar.information
    const hp = calculateHP()
    const mp = calculateMP()
    const pAtack = calculatePAtack()
    const pDef = calculatePDef()
    const castSpeed = calculateCastSpeed()
    const criticalChance = calculateCriticalChance()
    const accuracy = calculateAccuracy()
    const stamina = calculateStamina()

    function calculateHP () {
      return ((information.commits + streak) * information.commitsAverage) + (information.followers + getFollowingInformation() + getStartInformation())
    }
    function calculateMP () {
      return ((information.commits + streak) * information.commitsAverage)
    }
    function calculatePAtack () {
      return ((getRepositoryForks() + getRepositoryStar() + repositories.repositories.full.length + information.commits) * getRepositoriesRelevants()) + (information.commits * 2)
    }
    function calculatePDef () {
      return ((getRepositoryForks() + information.followers + getFollowingInformation() + getRepositoryStar() + repositories.repositories.full.length) * getRepositoriesRelevants()) +
          (information.commits * information.commitsAverage)
    }
    function calculateCastSpeed () {
      return (information.commits + streak) * getInformationOrganization()
    }
    function calculateCriticalChance () {
      return (information.commits + streak + information.followers + getFollowingInformation()) * getInformationOrganization()
    }
    function calculateAccuracy () {
      return ((information.followers * 2) + getFollowingInformation()) * ((getInformationOrganization() * information.commitsAverage) * getRepositoriesRelevants()) + information.commits + streak
    }
    function calculateStamina () {
      return (information.commits * information.commitsAverage)
    }
    function getInformationOrganization () {
      return information.organizations === 0 ? 1 : information.organizations
    }
    function getStartInformation () {
      return information.stars > 1000 ? 1000 : information.stars
    }
    function getFollowingInformation () {
      return information.following > 1000 ? 1000 : information.following
    }
    function getRepositoryStar () {
      return repositories.stars >= 4 ? (repositories.stars / 2) : 1
    }
    function getRepositoryForks () {
      return repositories.forks >= 4 ? (repositories.forks / 2) : 1
    }
    function getRepositoriesRelevants () {
      return repositories.repositories.relevants.length === 0 ? 1 : repositories.repositories.relevants.length
    }
    return {
      HP: parseInt(hp),
      MP: parseInt(mp),
      P_ATCK: parseInt(pAtack),
      P_DEF: parseInt(pDef),
      CAST_SPEED: parseInt(castSpeed),
      CRITICAL: parseInt(criticalChance),
      ACCURACY: parseInt(accuracy),
      STAMINA: parseInt(stamina),
      BATTLE: 1000
    }
  }

  export default {
    name: 'game',
    props: {
      width: {
        default: (window.innerWidth - 50),
        type: Number
      },
      height: {
        default: (window.innerHeight),
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
      isTrueBattle () {
        return (this.heroAvatar || false) && (this.heroAvatar.HP || false) && this.isBattle
      },
      cleanText () {
        this.cleanBar()
      },
      preload () {
        this.game.load.spritesheet('hero', 'static/game/img/char.png', 161, 106, 18)
        this.game.load.spritesheet('enemy', 'static/game/img/enemy.png', 385, 318, 18)
      },
      create (phaser) {
        const hero = this.game.add.sprite(this.width - 500, 350, 'hero')
        const walk = hero.animations.add('walk')
        walk.enableUpdate = true
        hero.animations.play('walk', 2, true)
        walk.onUpdate.add(this.onUpdate, this)
        const enemy = this.game.add.sprite(300, 135, 'enemy')
        const walkEnemy = enemy.animations.add('walk')
        walkEnemy.enableUpdate = true
        enemy.animations.play('walk', 2, true)
        this.heroName = this.game.add.text(200, 32, 'heroName', { font: '28px Arial', fill: '#6B9800' })
        this.enemyName = this.game.add.text(this.width - 350, 32, 'enemyName', { font: '28px Arial', fill: '#6B9800' })
      },
      update (phaser) {
      },
      onUpdate (anim, frame) {
        this.heroName.text = this.hero
        this.enemyName.text = this.enemy
        if (this.isTrueBattle()) {
          this.createBattle()
          this.updateAvatarBar()
        }
      },
      createBattle () {
        let punchHero = Math.floor(this.heroAvatar.P_DEF / 100)
        let punchEnemy = Math.floor(this.enemyAvatar.P_DEF / 100)
        this.enemyAvatar.HP -= Math.floor(this.heroAvatar.P_ATCK / 100) + punchHero
        this.heroAvatar.HP -= Math.floor(this.enemyAvatar.P_ATCK / 100) + punchEnemy
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
        } else if (this.heroAvatar.HP <= 0 && this.isBattle) {
          this.isBattle = false
          this.heroAvatar.HP = 0
          this.isFindingAvatar = false
          if (this.enemyAvatar.HP <= 0) {
            this.enemyAvatar.HP = 0
          }
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
        this.heroText = this.game.add.text(32, 100, 'heroAvatar', { font: '28px Arial', fill: '#6B9800' })
        this.heroText.text = `HP: ${this.heroAvatar.HP}\nMP: ${this.heroAvatar.MP}\nP. ATCK: ${this.heroAvatar.P_ATCK}\nP. DEF: ${this.heroAvatar.P_DEF}\nCAST SPEED: ${this.heroAvatar.CAST_SPEED}\nCRITICAL: ${this.heroAvatar.CRITICAL}\nACCURACY: ${this.heroAvatar.ACCURACY}\nSTAMINA: ${this.heroAvatar.STAMINA}`
        this.enemyText = this.game.add.text(980, 100, 'enemyAvatar', { font: '28px Arial', fill: '#6B9800' })
        this.enemyText.text = `HP: ${this.enemyAvatar.HP}\nMP: ${this.enemyAvatar.MP}\nP. ATCK: ${this.enemyAvatar.P_ATCK}\nP. DEF: ${this.enemyAvatar.P_DEF}\nCAST SPEED: ${this.enemyAvatar.CAST_SPEED}\nCRITICAL: ${this.enemyAvatar.CRITICAL}\nACCURACY: ${this.enemyAvatar.ACCURACY}\nSTAMINA: ${this.enemyAvatar.STAMINA}`
      },
      find () {
        this.isFindingAvatar = true
        this.cleanText()
        const getHeroRepository = axios.get(`https://legend-of-github-api.herokuapp.com/repository/format?username=${this.hero}`).then(res => {
          return res.data
        }).catch(e => {
          console.log(e)
        })
        const getEnemyRepository = axios.get(`https://legend-of-github-api.herokuapp.com/repository/format?username=${this.enemy}`).then(res => {
          return res.data
        }).catch(e => {
          console.log(e)
        })
        const getHeroInformation = axios.get(`https://legend-of-github-api.herokuapp.com/user/full?username=${this.hero}`).then(res => {
          return res.data
        }).catch(e => {
          console.log(e)
        })
        const getEnemyInformation = axios.get(`https://legend-of-github-api.herokuapp.com/user/full?username=${this.enemy}`).then(res => {
          return res.data
        }).catch(e => {
          console.log(e)
        })
        const getHeroCurrentStreak = axios.get(`https://legend-of-github-api.herokuapp.com/streak/full?username=${this.hero}`).then(res => {
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
        const getEnemyCurrentStreak = axios.get(`https://legend-of-github-api.herokuapp.com/streak/full?username=${this.enemy}`).then(res => {
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
        ]).then((data) => {
          const getHeroRepository = data[0]
          const getHeroUserInformation = data[1]
          const getHeroUserCurrentStreak = data[2]

          const heroAvatar = {
            repository: getHeroRepository,
            information: getHeroUserInformation,
            currentStreak: getHeroUserCurrentStreak
          }

          const getEnemyRepository = data[3]
          const getEnemyUserInformation = data[4]
          const getEnemyUserCurrentStreak = data[5]

          const enemyAvatar = {
            repository: getEnemyRepository,
            information: getEnemyUserInformation,
            currentStreak: getEnemyUserCurrentStreak
          }
          this.heroAvatar = calculate(heroAvatar)
          this.enemyAvatar = calculate(enemyAvatar)
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
        isFindingAvatar: false
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
