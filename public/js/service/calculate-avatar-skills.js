(function(angular) {
  'use strict';

  angular.module('Legend')

  .factory("CalculateSkillsService", ['$http', ($http) => {

    const calculate = (avatar) => {
      const repositories = avatar.repository;
      const streak = avatar.currentStreak;
      const information = avatar.information;
      const hp = ((information.commits + streak) * information.commitsAvarage) + ((information.fallowers + information.fallowing + information.stars) * (information.organizations === 0 ? 1 : information.organizations));
      const mp = ((information.commits + streak) * information.commitsAvarage);
      const pAtack = ((repositories.forks + repositories.stars + repositories.repositories.full.length) * repositories.repositories.relevants.length) +
        ((information.commits) * (information.commitsAvarage + information.organizations));
      const pDef   = ((repositories.forks + information.fallowers + information.fallowing + repositories.stars + repositories.repositories.full.length) * (repositories.repositories.relevants.length === 0 ? 1 : repositories.repositories.relevants.length)) +
        (information.commits * information.commitsAvarage);
      const cast_speed = (information.commits + ((streak === 0 ? 1 : streak) * (information.organizations === 0 ? 1 : information.organizations)));
      const accuracy = ((information.fallowers + information.fallowing) * (information.organizations === 0 ? 1 : information.organizations));
      const stamina = (information.commits * information.commitsAvarage);
      const criticalChance = (information.commits + streak);

      return {
        HP: parseInt(hp),
        MP: parseInt(mp),
        P_ATCK: parseInt(pAtack),
        P_DEF: parseInt(pDef),
        CAST_SPEED: parseInt(cast_speed),
        CRITICAL: parseInt(criticalChance),
        ACCURACY: parseInt(accuracy),
        STAMINA: parseInt(stamina)
      };
    };

    return {
      calculate
    };
  }]);

})(window.angular);