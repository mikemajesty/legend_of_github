<template>
  <div id='gameScreen'></div>
</template>
<script>
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  import axios from 'axios'
  import _ from 'lodash'

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
      return ((information.commits + streak) * information.commitsAvarage) + (information.fallowers + getFallowingInformation() + getStartInformation())
    }
    function calculateMP () {
      return ((information.commits + streak) * information.commitsAvarage)
    }
    function calculatePAtack () {
      return ((getRepositoryForks() + getRepositoryStar() + repositories.repositories.full.length + information.commits) * getRepositoriesRelevants())
    }
    function calculatePDef () {
      return ((getRepositoryForks() + information.fallowers + getFallowingInformation() + getRepositoryStar() + repositories.repositories.full.length) * getRepositoriesRelevants()) +
          (information.commits * information.commitsAvarage)
    }
    function calculateCastSpeed () {
      return (information.commits + streak) * getInformationOrganization()
    }
    function calculateCriticalChance () {
      return (information.commits + streak + information.fallowers + getFallowingInformation()) * getInformationOrganization()
    }
    function calculateAccuracy () {
      return ((information.fallowers + getFallowingInformation() + streak) * (getInformationOrganization() + information.commitsAvarage + getRepositoriesRelevants()))
    }
    function calculateStamina () {
      return (information.commits * information.commitsAvarage)
    }
    function getInformationOrganization () {
      return information.organizations === 0 ? 1 : information.organizations
    }
    function getStartInformation () {
      return information.stars > 1000 ? 1000 : information.stars
    }
    function getFallowingInformation () {
      return information.fallowing > 1000 ? 1000 : information.fallowing
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
      Cast_Speed: parseInt(castSpeed),
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
        const enemy = this.game.add.sprite(130, 30, 'enemy')
        const walkEnemy = enemy.animations.add('walk')
        walkEnemy.enableUpdate = true
        enemy.animations.play('walk', 5, true)
      },
      update (phaser) {
      }
    },
    destroyed () {
      this.game.destroy()
    },
    data () {
      return {
        game: null
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
      const getRepository = axios.post(`http://localhost:8081/repository`, {
        username: 'mikemajesty'
      }).then(res => {
        const sumStarAndFork = _.max(_.map(res.data, (value) => {
          return (parseInt(value.stars) + parseInt(value.forks))
        }))
        const groupRepository = _.groupBy(res.data, function (value) { return value.language })
        const stars = _.sumBy(res.data, (value) => { return parseInt(value.stars) })
        const language = _.orderBy(groupRepository, 'length', 'desc')[0]
        const bestRepositoty = _.find(res.data, (value) => { return (parseInt(value.stars) + parseInt(value.forks)) === sumStarAndFork })
        const relevantsRepositories = _.filter(res.data, (value) => { return value.stars > 5 && value.forks > 0 })
        const forks = _.sumBy(res.data, (value) => { return parseInt(value.forks) })

        const data = {
          stars,
          forks,
          repositories: { full: res.data, relevants: relevantsRepositories },
          bestRepositoty: bestRepositoty || 'noob',
          language: language ? language[0].language : 'noob'
        }
        return data
      }).catch(e => {
        console.log(e)
      })

      const getInformation = axios.post(`http://localhost:8081/user`, {
        username: 'mikemajesty'
      }).then(res => {
        return res.data
      }).catch(e => {
        console.log(e)
      })

      const getCurrentStreak = axios.post(`http://localhost:8081/streak`, {
        username: 'mikemajesty'
      }).then(res => {
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
      ]).then(function (data) {
        const getUserRepository = data[0]
        const getUserInformation = data[1]
        const getUserCurrentStreak = data[2]

        const avatar = {
          repository: getUserRepository,
          information: getUserInformation,
          currentStreak: getUserCurrentStreak
        }
        console.log(calculate(avatar))
      })
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
