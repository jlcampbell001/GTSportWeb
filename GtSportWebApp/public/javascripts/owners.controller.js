app.controller('ownersController', function ($scope, $rootScope) {
    var blankOwner = { primaryKey: '', name: '', default: false, current: false };
    var minOwnerListSize = 5;
    var maxOwnerListSize = 20;

    $scope.newOwner = { primaryKey: '', name: '--New Owner--', default: false, current: false };
    $scope.owner = { primaryKey: '', name: '', default: false, current: false };

    if (typeof $rootScope.owners === 'undefined') {
        $rootScope.owners = [{ primaryKey: 'OWN9000000001', name: 'Owner 1', default: true, current: false },
            { primaryKey: 'OWN9000000002', name: 'Owner 2', default: false, current: false },
            { primaryKey: 'OWN9000000003', name: 'Owner 3', default: false, current: false }];
    }

    for (var i = 0; i < $rootScope.owners.length; i++) {
        if ($rootScope.owners[i].primaryKey === $rootScope.current_owner.primaryKey) {
            $rootScope.owners[i].current = true;
        }
    }

    $scope.selectedOwner = $scope.newOwner.primaryKey;

    $scope.getOwnerSelectName = function (owner) {
        var selectName = owner.name;

        if (owner.current) {
            selectName = "(C) " + selectName;
        }
        return selectName;
    }

    $scope.setOwnerListSize = function () {
        var listSize = $rootScope.owners.length + 1;

        if (listSize < minOwnerListSize) {
            listSize = minOwnerListSize;
        }

        if (listSize > maxOwnerListSize) {
            listSize = maxOwnerListSize;
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

        var newOwner = findOwnerByKey($scope.owner.primaryKey);
        newOwner.current = true;

        $scope.owner = jQuery.extend({}, newOwner);

        $rootScope.current_owner = jQuery.extend({}, newOwner);
    }

    $scope.ownerDelete = function () {
        for (var i = 0; i < $rootScope.owners.length; i++) {
            if ($scope.owner.primaryKey === $rootScope.owners[i].primaryKey) {
                $rootScope.owners.splice(i, 1);
            }
        }
        $scope.selectedOwner = "";
        $scope.ownerSelect();
    }

    $scope.ownerSubmit = function () {
        if ($scope.owner.primaryKey === "") {
            var lastOwnerNumber = $rootScope.owners.length;

            $scope.owner.primaryKey = "OWN000000000" + lastOwnerNumber.toString();

            $rootScope.owners.push(jQuery.extend({}, $scope.owner));

            $scope.selectedOwner = $scope.owner.primaryKey;
        } else {
            var oldOwner = findOwnerByKey($scope.owner.primaryKey);
            oldOwner.name = $scope.owner.name;
            oldOwner.default = $scope.owner.default;
        }

        if ($scope.owner.current) {
            $rootScope.current_owner = jQuery.extend({}, $scope.owner);
        }
    }

    function findOwnerByKey(primaryKey) {
        var result;
        for (var i = 0; i < $rootScope.owners.length; i++) {
            if ($rootScope.owners[i].primaryKey === primaryKey) {
                result = $rootScope.owners[i];
            }
        }
        return result;
    }
});