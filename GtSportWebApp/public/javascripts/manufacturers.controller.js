app.controller('manufacturersController', function ($scope, $rootScope) {
    var blankManufacturer = new manufacturer('', '', '');

    // The manufacturer the user is currently working on.
    $scope.workManufacturer = new manufacturer('', '', '');

    // Currently selected manufacturer in the manufacturer select list.
    $scope.selectedManufacturer = blankManufacturer.primaryKey;

    // List of all the manufacturers.
    $scope.manufacturers = getAllManufacturers();

    // List of all the countries.
    $scope.countries = getAllCountries();

    // Selecting a manufacturer in the manufacturer select list.
    $scope.manufacturerSelect = function (primaryKey) {
        if (primaryKey === '') {
            $scope.workManufacturer = jQuery.extend({}, blankManufacturer);
        } else {
            $scope.workManufacturer = jQuery.extend({}, findManufacturerByKey(primaryKey));
        }
        $scope.selectedManufacturer = primaryKey;
    }

    // Check and see if the currently selected manufacturer can be deleted.
    $scope.manufacturerAllowDelete = function () {
        var deleteOK = true;

        if ($scope.workManufacturer.primaryKey === '') {
            deleteOK = false;
        }

        return deleteOK;
    }

    // Delete the currently selected manufacturer.
    $scope.manufacturerDelete = function () {
        deleteManufacturer($scope.workManufacturer.primaryKey);

        $scope.manufacturers = getAllManufacturers();
        $scope.selectedManufacturer = "";
        $scope.manufacturerSelect('');
    }

    // Save a new or update a selected manufacturer.
    $scope.manufacturerSubmit = function () {
        saveManufacturer($scope.workManufacturer);

        $scope.manufacturers = getAllManufacturers();
        $scope.selectedManufacturers = $scope.workManufacturers.primaryKey;
    }

});