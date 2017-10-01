exports.calculate = function (avatar) {
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
    return ((information.commits + streak) * information.commitsAverage) + (information.followers + getFollowingInformation() + getStarInformation())
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
    return ((information.followers) + getFollowingInformation()) * ((getInformationOrganization() * information.commitsAverage) * getRepositoriesRelevants()) + information.commits + streak
  }

  function calculateStamina () {
    return (information.commits * information.commitsAverage)
  }

  function getInformationOrganization () {
    return information.organizations === 0 ? 1 : information.organizations >= 5 ? 5 : information.organizations
  }

  function getStarInformation () {
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
    HP: parseInt(hp) <= 0 ? 1 : parseInt(hp),
    TOTAL_HP: parseInt(hp) <= 0 ? 1 : parseInt(hp),
    MP: parseInt(mp) <= 0 ? 1 : parseInt(mp),
    P_ATCK: parseInt(pAtack),
    P_DEF: parseInt(pDef),
    SPEED: parseInt(castSpeed),
    CRITICAL: parseInt(criticalChance),
    ACCURACY: parseInt(accuracy),
    STAMINA: parseInt(stamina)
  }
}
