(function(angular) {
  'use strict';

  angular.module('Legend')

  .factory("CalculateSkillsService", ['$http', ($http) => {

    const calculate = (avatar) => {
      const repositories = avatar.repository;
      const streak = avatar.currentStreak;
      const information = avatar.information;
      const hp = calculateHP();
      const mp = calculateMP();
      const pAtack = calculatePAtack();
      const pDef = calculatePDef();
      const cast_speed = calculateCastSpeed();
      const criticalChance = calculateCriticalChance();
      const accuracy = calculateAccuracy();
      const stamina = calculateStamina();

      function calculateHP() {
        return ((information.commits + streak) * information.commitsAvarage) + (information.fallowers + getFallowingInformation() + getStartInformation());
      }

      function calculateMP() {
        return ((information.commits + streak) * information.commitsAvarage);
      }

      function calculatePAtack() {
        return ((getRepositoryForks() + getRepositoryStar() + repositories.repositories.full.length + information.commits) * getRepositoriesRelevants());
      }

      function calculatePDef() {
        return ((getRepositoryForks() + information.fallowers + getFallowingInformation() + getRepositoryStar() + repositories.repositories.full.length) * getRepositoriesRelevants()) +
          (information.commits * information.commitsAvarage);
      }

      function calculateCastSpeed() {
        return (information.commits + streak) * getInformationOrganization();
      }

      function calculateCriticalChance() {
        return (information.commits + streak + information.fallowers + getFallowingInformation()) * getInformationOrganization();
      }

      function calculateAccuracy() {
        return ((information.fallowers + getFallowingInformation() + streak) * (getInformationOrganization() + information.commitsAvarage + getRepositoriesRelevants()));
      }

      function calculateStamina() {
        return (information.commits * information.commitsAvarage);
      }
      

      function getInformationOrganization() {
        return information.organizations === 0 ? 1 : information.organizations;
      }

      function getStartInformation() {
        return information.stars > 1000 ? 1000 : information.stars;
      }

      function getFallowingInformation() {
        return information.fallowing > 1000 ? 1000 : information.fallowing;
      }

      function getRepositoryStar() {
        return repositories.stars >= 4 ? (repositories.stars / 2) : 1;
      }

      function getRepositoryForks() {
        return repositories.forks >= 4 ? (repositories.forks / 2) : 1;
      }

      function getRepositoriesRelevants() {
        return repositories.repositories.relevants.length == 0 ? 1 : repositories.repositories.relevants.length;
      }

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