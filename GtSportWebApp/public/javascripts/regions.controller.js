app.controller('regionsController', function ($scope, $rootScope) {
    var blankRegion = new region('', '');

    var minRegionListSize = 6;
    var maxRegionListSize = 20;

    $scope.newRegion = new region('', '--New Region--');

    // The region that the user is currently working on.
    $scope.workRegion = new region('', '');

    // Currently selected region in the select object.
    $scope.selectedRegion = $scope.newRegion.primaryKey;

    // List of all the regions.
    $scope.regions = getAllRegions();
    
    // Sets the region list to a min size or max size.
    $scope.setRegionListSize = function () {
        var listSize = $scope.regions.length + 1;

        if (listSize < minRegionListSize) {
            listSize = minRegionListSize;
        }

        if (listSize > maxRegionListSize) {
            listSize = maxRegionListSize;
        }
        return listSize;
    }

    // Selecting a region in the region select list.
    $scope.regionSelect = function () {
        var primaryKey = $scope.selectedRegion;

        if (primaryKey === '') {
            $scope.workRegion = jQuery.extend({}, blankRegion);
        } else {
            $scope.workRegion = jQuery.extend({}, findRegionByKey(primaryKey));
        }
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
        $scope.regionSelect();
    }

    // Save a new or update a selected region.
    $scope.regionSubmit = function () {
        saveRegion($scope.workRegion);

        $scope.regions = getAllRegions();
        $scope.selectedRegion = $scope.workRegion.primaryKey;
    }

});