var app = angular.module('gtsportApp', ['ngRoute',
    'ngResource']).run(function ($http, $rootScope) {
        // BackEndTemp - remove all the initialize code one I link the backend
        initializeOwners($rootScope);
        initializeRegions($rootScope);

        var defaultOwner = getDefaultOwner();

        setCurrentOwner('', defaultOwner.primaryKey);
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'ownedcars.html',
            controller: 'ownedcarsController'
        })
        .when('/regions', {
            templateUrl: 'regions.html',
            controller: 'regionsController'
        })
        .when('/owners', {
            templateUrl: 'owners.html',
            controller: 'ownersController'
        });
});

app.controller('ownedcarsController', function ($scope, $rootScope) {});

