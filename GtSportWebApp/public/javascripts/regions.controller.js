app.controller('regionsController', function ($scope, $rootScope) {
    var blankRegion = new region('', '');

    // The region that the user is currently working on.
    $scope.workRegion = new region('', '');

    // Currently selected region in the select object.
    $scope.selectedRegion = blankRegion.primaryKey;

    // List of all the regions.
    $scope.regions = getAllRegions();
    
    // Selecting a region in the region select list.
    $scope.regionSelect = function (primaryKey) {
        if (primaryKey === '') {
            $scope.workRegion = jQuery.extend({}, blankRegion);
        } else {
            $scope.workRegion = jQuery.extend({}, findRegionByKey(primaryKey));
        }

        $scope.selectedRegion = primaryKey;
    }

    // Check and see if the currently selected region can be deleted.
    $scope.regionAllowDelete = function () {
        var deleteOK = true;

        if ($scope.workRegion.primaryKey === '') {
            deleteOK = false;
        }

        return deleteOK;
    }

    // Delete the currently selected region.
    $scope.regionDelete = function () {
        deleteRegion($scope.workRegion.primaryKey);

        $scope.regions = getAllRegions();
        $scope.selectedRegion = "";
        $scope.regionSelect('');
    }

    // Save a new or update a selected region.
    $scope.regionSubmit = function () {
        saveRegion($scope.workRegion);

        $scope.regions = getAllRegions();
        $scope.selectedRegion = $scope.workRegion.primaryKey;
    }

});