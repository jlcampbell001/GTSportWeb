var app = angular.module('gtsportApp', ['ngRoute',
    'ngResource']).run(function ($http, $rootScope) {
    $rootScope.current_owner = { primaryKey: 'OWN9000000001', name: 'Owner 1', default: true, current: true };

});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'ownedcars.html',
            controller: 'ownedcarsController'
        })
        .when('/owners', {
            templateUrl: 'owners.html',
            controller: 'ownersController'
        });
});

app.controller('ownedcarsController', function ($scope, $rootScope) {});

