angular.module('Legend', ['ngMaterial', 'chart.js', 'ngProgress'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark');
  }).config(['ChartJsProvider', function(ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#222222'],
      responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
  }]);