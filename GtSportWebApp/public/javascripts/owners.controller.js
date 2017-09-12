app.controller('ownersController', function ($scope, $rootScope) {
    var blankOwner = new owner('', '', false, false);

    var minOwnerListSize = 5;
    var maxOwnerListSize = 20;

    $scope.newOwner = new owner('', '--New Owner--', false, false);

    // The owner that the user is currently working on.
    $scope.workOwner = new owner('', '', false, false );

    // The owner that has been selected in the owner select object.
    $scope.selectedOwner = $scope.newOwner.primaryKey;

    // Creates an owner name to be shown in the owner select list.
    $scope.getOwnerSelectName = function (owner) {
        var selectName = owner.name;
        var namePrefix = '';

        if (owner.current) {
            namePrefix = '(C) ';
        }

        if (owner.defaultOwner) {
            namePrefix = namePrefix + '(D) ';
        }

        selectName = namePrefix + selectName;

        return selectName;
    }

    // Sets the min or max size of the owner select list.
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

    // Selecting an owner in the owner select list.
    $scope.ownerSelect = function () {
        var primaryKey = $scope.selectedOwner;
        if (primaryKey === "") {
            $scope.workOwner = jQuery.extend({}, blankOwner);
        } else {
            $scope.workOwner = jQuery.extend({}, findOwnerByKey(primaryKey));
        }
    }

    // Checks to see if the owner the user is working on can be deleted.
    $scope.ownerAllowDelete = function () {
        var deleteOK = true;

        if ($scope.workOwner.current) {
            deleteOK = false;
        }

        if ($scope.workOwner.primaryKey === "") {
            deleteOK = false;
        }

        return deleteOK;
    }

    // Checks to see if the owner the user is working on can be set as the currently owner.
    $scope.ownerAllowSetToCurrent = function () {
        var setToCurrentOK = true;

        if ($scope.workOwner.current) {
            setToCurrentOK = false;
        }

        if ($scope.workOwner.primaryKey === "") {
            setToCurrentOK = false;
        }

        return setToCurrentOK;
    }

    // Sets the owner the user is working on as the curret owner.
    $scope.ownerSetCurrent = function () {
        setCurrentOwner($rootScope.current_owner.primaryKey, $scope.workOwner.primaryKey);

        $scope.owner = jQuery.extend({}, $rootScope.current_owner);
    }

    // Deletes the owner.
    $scope.ownerDelete = function () {
        deleteOwner($scope.workOwner.primaryKey);

        $scope.selectedOwner = "";
        $scope.ownerSelect();
    }

    // Saves a new or updates an owner.
    $scope.ownerSubmit = function () {
        saveOwner($scope.workOwner);

        $scope.selectedOwner = $scope.workOwner.primaryKey;

        if ($scope.owner.current) {
            $rootScope.current_owner = jQuery.extend({}, $scope.workOwner);
        }
    }
});