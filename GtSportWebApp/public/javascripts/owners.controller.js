app.controller('ownersController', function ($scope, $rootScope) {
    var blankOwner = new owner('', '', false, false);

    // The owner that the user is currently working on.
    $scope.workOwner = new owner('', '', false, false );

    // The owner that has been selected in the owner select object.
    $scope.selectedOwner = blankOwner.primaryKey;

    // List of all the owners.
    $scope.owners = getAllOwners();

    // Selecting an owner in the owner select list.
    $scope.ownerSelect = function (primaryKey) {
        if (primaryKey === "") {
            $scope.workOwner = jQuery.extend({}, blankOwner);
        } else {
            $scope.workOwner = jQuery.extend({}, findOwnerByKey(primaryKey));
        }
        $scope.selectedOwner = primaryKey;
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
        $scope.owners = getAllOwners();
        $scope.selectedOwner = $scope.workOwner.primaryKey;
    }

    // Deletes the owner.
    $scope.ownerDelete = function () {
        deleteOwner($scope.workOwner.primaryKey);

        $scope.owners = getAllOwners();
        $scope.selectedOwner = "";
        $scope.ownerSelect('');
    }

    // Saves a new or updates an owner.
    $scope.ownerSubmit = function () {
        saveOwner($scope.workOwner);

        $scope.owners = getAllOwners();
        $scope.selectedOwner = $scope.workOwner.primaryKey;

        if ($scope.owner.current) {
            $rootScope.current_owner = jQuery.extend({}, $scope.workOwner);
        }
    }
});