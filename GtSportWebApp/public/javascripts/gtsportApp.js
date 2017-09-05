var app = angular.module('gtsportApp', ['ngRoute', 'ngResource']).run(function ($http, $rootScope) {
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

app.controller('ownersController', function ($scope, $rootScope) {
    var blankOwner = { primaryKey: '', name: '', default: false, current: false };
    var minOwnerListSize = 5;

    $scope.newOwner = { primaryKey: '', name: '--New Owner--', default: false, current: false };
    $scope.owner = { primaryKey: '', name: '', default: false, current: false };


    $scope.owners = [$scope.newOwner,
        { primaryKey: 'OWN9000000001', name: 'Owner 1', default: true, current: false },
        { primaryKey: 'OWN9000000002', name: 'Owner 2', default: false, current: false },
        { primaryKey: 'OWN9000000003', name: 'Owner 3', default: false, current: false }];
    
    for (var i = 0; i < $scope.owners.length; i++) {
        if ($scope.owners[i].primaryKey === $rootScope.current_owner.primaryKey) {
            $scope.owners[i].current = true;
        }
    }

    $scope.selectedOwner = $scope.owners[0].primaryKey;

    $scope.getOwnerSelectName = function (owner) {
        var selectName = owner.name;

        if (owner.current) {
            selectName = "(C) " + selectName;
        }
        return selectName;
    }

    $scope.setOwnerListSize = function () {
        var listSize = $scope.owners.length + 1;

        if (listSize < minOwnerListSize) {
            listSize = minOwnerListSize;
        }
        return listSize;
    }

    $scope.ownerSelect = function () {
        var primaryKey = $scope.selectedOwner;
        if (primaryKey === "") {
            $scope.owner = jQuery.extend({}, blankOwner);
        } else {
            $scope.owner = jQuery.extend({}, findOwnerByKey(primaryKey));
            }
        }

    $scope.ownerAllowDelete = function () {
        var deleteOK = true;

        if ($scope.owner.current) {
            deleteOK = false;
        }

        if ($scope.owner.primaryKey === "") {
            deleteOK = false;
        }

        return deleteOK;
    }

    $scope.ownerAllowSetToCurrent = function () {
        var setToCurrentOK = true;

        if ($scope.owner.current) {
            setToCurrentOK = false;
        }

        if ($scope.owner.primaryKey === "") {
            setToCurrentOK = false;
        }

        return setToCurrentOK;
    }
    
    $scope.ownerSetCurrent = function () {
        var oldOwner = findOwnerByKey($rootScope.current_owner.primaryKey);
        oldOwner.current = false;

        $rootScope.current_owner = jQuery.extend({}, $scope.owner);

        var newOwner = findOwnerByKey($rootScope.current_owner.primaryKey);
        newOwner.current = true;
        $scope.owner.current = true;
    }

    $scope.ownerDelete = function () {
        for (var i = 0; i < $scope.owners.length; i++) {
            if ($scope.owner.primaryKey === $scope.owners[i].primaryKey) {
                $scope.owners.splice(i, 1);
            }
        }
        $scope.selectedOwner = "";
        $scope.ownerSelect();
    }

    $scope.ownerSubmit = function () {
        if ($scope.owner.primaryKey === "") {
            var lastOwnerNumber = $scope.owners.length;

            $scope.owner.primaryKey = "OWN000000000" + lastOwnerNumber.toString();

            $scope.owners.push(jQuery.extend({}, $scope.owner));

            $scope.selectedOwner = $scope.owner.primaryKey;
        } else {
            var oldOwner = findOwnerByKey($scope.owner.primaryKey);
            oldOwner.name = $scope.owner.name;
            oldOwner.default = $scope.owner.default;
        }
    }

    function findOwnerByKey(primaryKey) {
        var result;
        for (var i = 0; i < $scope.owners.length; i++) {
            if ($scope.owners[i].primaryKey === primaryKey) {
                result = $scope.owners[i];
            }
        }
        return result;
    }
});