app.controller('countriesController', function ($scope, $rootScope) {
    var blankCountry = new country('', '', '');

    var minCountryListSize = 6;
    var maxCountryListSize = 20;

    $scope.newCountry = new country('', '--New Country--', '');

    // The country the user is currently working on.
    $scope.workCountry = new country('', '', '');

    // Currently selected country in the counrty select list.
    $scope.selectedCountry = $scope.newCountry.primaryKey;

    // List of all the countries.
    $scope.countries = getAllCountries();

    // List of all the regions.
    $scope.regions = getAllRegions();

    // Sets the country list to a min size or max size.
    $scope.setCountryListSize = function () {
        var listSize = $scope.countries.length + 1;

        if (listSize < minCountryListSize) {
            listSize = minCountryListSize;
        }

        if (listSize > maxCountryListSize) {
            listSize = maxCountryListSize;
        }
        return listSize;
    }

    // Selecting a country in the country select list.
    $scope.countrySelect = function () {
        var primaryKey = $scope.selectedCountry;

        if (primaryKey === '') {
            $scope.workCountry = jQuery.extend({}, blankCountry);
        } else {
            $scope.workCountry = jQuery.extend({}, findCountryByKey(primaryKey));
        }
    }

    // Check and see if the currently selected country can be deleted.
    $scope.countryAllowDelete = function () {
        var deleteOK = true;

        if ($scope.workCountry.primaryKey === '') {
            deleteOK = false;
        }

        return deleteOK;
    }

    // Delete the currently selected country.
    $scope.countryDelete = function () {
        deleteCountry($scope.workCountry.primaryKey);

        $scope.countries = getAllCountries();
        $scope.selectedCountry = "";
        $scope.countrySelect();
    }

    // Save a new or update a selected country.
    $scope.countrySubmit = function () {
        saveCountry($scope.workCountry);

        $scope.countries = getAllCountries();
        $scope.selectedCountry = $scope.workCountry.primaryKey;
    }

});
