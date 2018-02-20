var app = angular.module('gtsportApp', ['ngRoute',
    'ngResource']).run(function ($http, $rootScope) {
        // BackEndTemp - remove all the initialize code one I link the backend
        initializeOwners($rootScope);
        initializeRegions($rootScope);
        initializeCountries($rootScope);
        initializeManufacturers($rootScope);
        initializeCars($rootScope);
        initializeOwnedcars($rootScope);

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
        .when('/countries', {
            templateUrl: 'countries.html',
            controller: 'countriesController'
        })
        .when('/manufacturers', {
            templateUrl: 'manufacturers.html',
            controller: 'manufacturersController'
        })
        .when('/cars', {
            templateUrl: 'cars.html',
            controller: 'carsController'
        })
        .when('/owners', {
            templateUrl: 'owners.html',
            controller: 'ownersController'
        });
});

