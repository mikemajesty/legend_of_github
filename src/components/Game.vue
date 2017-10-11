<template>
  <div id='gameScreen'>
    <button v-on:click="find">find</button>
  </div>
</template>
<script>
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  import axios from 'axios'

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
      return ((information.followers + getFollowingInformation() + streak) * (getInformationOrganization() + information.commitsAverage + getRepositoriesRelevants())) + information.commits
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
      STAMINA: parseInt(stamina)
    }
  }

  export default {
    name: 'game',
    props: {
      width: Number,
      height: Number
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
      preload () {
        this.game.load.spritesheet('mummy', 'static/game/img/char.png', 161, 106, 18)
        this.game.load.spritesheet('enemy', 'static/game/img/enemy.png', 385, 318, 18)
      },
      create (phaser) {
        const mummy = this.game.add.sprite(450, 245, 'mummy')
        const walk = mummy.animations.add('walk')
        walk.enableUpdate = true
        mummy.animations.play('walk', 5, true)
        walk.onUpdate.add(this.onUpdate, this)
        const enemy = this.game.add.sprite(130, 30, 'enemy')
        const walkEnemy = enemy.animations.add('walk')
        walkEnemy.enableUpdate = true
        enemy.animations.play('walk', 5, true)
        this.text = this.game.add.text(300, 264, 'Frame 1', { font: '28px Arial', fill: '#ff0044' })
        this.sera = this.game.add.text(400, 400, 'Frame 1', { font: '28px Arial', fill: '#ff0044' })
      },
      update (phaser) {
      },
      onUpdate (anim, frame) {
        console.log(JSON.stringify(this.userInformation))
        this.text.text = 'Frame ' + frame.index
        this.sera.text = 'Frame ' + frame.index
      },
      find () {
        const getRepository = axios.get(`https://legend-of-github-api.herokuapp.com/repository/format?username=mikemajesty`).then(res => {
          return res.data
        }).catch(e => {
          console.log(e)
        })
        const getInformation = axios.get(`https://legend-of-github-api.herokuapp.com/user/full?username=mikemajesty`).then(res => {
          return res.data
        }).catch(e => {
          console.log(e)
        })
        const getCurrentStreak = axios.get(`https://legend-of-github-api.herokuapp.com/streak/full?username=mikemajesty`).then(res => {
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
          getRepository,
          getInformation,
          getCurrentStreak
        ]).then((data) => {
          const getUserRepository = data[0]
          const getUserInformation = data[1]
          const getUserCurrentStreak = data[2]

          const avatar = {
            repository: getUserRepository,
            information: getUserInformation,
            currentStreak: getUserCurrentStreak
          }
          console.log(avatar)
          this.userInformation = calculate(avatar)
          console.log(calculate(avatar))
        })
      }
    },
    destroyed () {
      this.game.destroy()
    },
    data () {
      return {
        game: null,
        userInformation: null,
        text: null,
        sera: null
      }
    },
    watch: {
      view: function (val) {
        this.$nextTick(() => {
          this.game.update()
        })
      }
    },
    created () {
    }
  }
</script>
<style>
  #gameScreen {
    margin: 0 auto;
  }
  
  #gameScreen canvas {
    display: block;
    margin: 0 auto;
  }

</style>
