app.controller('dealersController', function ($scope, $rootScope) {
    var blankDealer = new dealer('', '', '');

    // The dealer the user is currently working on.
    $scope.workDealer = new dealer('', '', '');

    // Currently selected dealer in the dealer select list.
    $scope.selectedDealer = blankDealer.primaryKey;

    // List of all the dealers.
    $scope.dealers = getAllDealers();

    // List of all the countries.
    $scope.countries = getAllCountries();

    // Selecting a dealer in the dealer select list.
    $scope.dealerSelect = function (primaryKey) {
        if (primaryKey === '') {
            $scope.workDealer = jQuery.extend({}, blankDealer);
        } else {
            $scope.workDealer = jQuery.extend({}, findDealerByKey(primaryKey));
        }
        $scope.selectedDealer = primaryKey;
    }

    // Check and see if the currently selected dealer can be deleted.
    $scope.dealerAllowDelete = function () {
        var deleteOK = true;

        if ($scope.workDealer.primaryKey === '') {
            deleteOK = false;
        }

        return deleteOK;
    }

    // Delete the currently selected dealer.
    $scope.dealerDelete = function () {
        deleteDealer($scope.workDealer.primaryKey);

        $scope.dealers = getAllDealers();
        $scope.selectedDealer = "";
        $scope.dealerSelect('');
    }

    // Save a new or update a selected dealer.
    $scope.dealerSubmit = function () {
        saveDealer($scope.workDealer);

        $scope.dealers = getAllDealers();
        $scope.selectedDealers = $scope.workDealers.primaryKey;
    }

});