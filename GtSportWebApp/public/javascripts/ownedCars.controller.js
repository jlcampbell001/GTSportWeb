app.controller('ownedcarsController', function ($scope, $rootScope) {
    var blankOwnedcar = new ownedcar('', $rootScope.current_owner.primaryKey, '', '', '', 0, 0, 0, new Date());
    
    // The car the user is currently working with.
    $scope.workCar = new car('', '', '', 0, 0, 0, 0.00, '', 0, '', 0.00, '', '', '', 0.00, 0.00, 0.00, 0);

    // Currently selected owned car in the owned car select list.
    $scope.selectedOwnedcar = '';
    
    // List of all the owned cars.
    $scope.ownedcars = getOwnedcarList();

    $scope.selectedOwnedcar = $scope.ownedcars[0].carKey;
    $scope.workCar = jQuery.extend({}, findCarByKey($scope.selectedOwnedcar));
    $scope.currentOwnedcars = getOwnedcarsListForCarKey($scope.selectedOwnedcar);
    $scope.newOwnedcar = new ownedcar('', $rootScope.current_owner.primaryKey, $scope.selectedOwnedcar, '', '', 0, 0, 0, new Date());


    // Selecting a car in the owner car select list.
    $scope.ownedcarSelect = function (carKey) {
        $scope.workCar = jQuery.extend({}, findCarByKey(carKey));
        $scope.selectedOwnedcar = carKey;
        $scope.currentOwnedcars = getOwnedcarsListForCarKey($scope.selectedOwnedcar);
        $scope.newOwnedcar = new ownedcar('', $rootScope.current_owner.primaryKey, $scope.selectedOwnedcar, '', '', 0, 0, 0, new Date());
    }

    $scope.ownedcarSubmit = function (primaryKey) {
        if (primaryKey === '') {
            saveOwnedcar($scope.newOwnedcar);
            $scope.newOwnedcar = new ownedcar('', $rootScope.current_owner.primaryKey, $scope.selectedOwnedcar, '', '', 0, 0, 0, new Date());
            $scope.ownedcars = getOwnedcarList();
            $scope.currentOwnedcars = getOwnedcarsListForCarKey($scope.selectedOwnedcar);
        } else {
            for (i = 0; i < $scope.currentOwnedcars.length; i++) {
                if (primaryKey === $scope.currentOwnedcars[i].primaryKey) {
                    saveOwnedcar($scope.currentOwnedcars[i]);
                }
            }
        }
    }

    $scope.ownedcarDelete = function (primaryKey) {
        deleteOwnedcar(primaryKey);

        $scope.ownedcars = getOwnedcarList();
        $scope.currentOwnedcars = getOwnedcarsListForCarKey($scope.selectedOwnedcar);
    }
    
    function getOwnedcarsListForCarKey(carKey) {
        var result = getAllOwnedcarsByOwnerAndCar($rootScope.current_owner.primaryKey, carKey);
        return result;
    }

    // Get a list of owned cars for the current owner.
    function getOwnedcarList() {
        var cars = getAllCars(true);

        var result = [];
        
        for (var i = 0; i < cars.length; i++) {
            var carCount = getAllOwnedcarsByOwnerAndCar($rootScope.current_owner.primaryKey, cars[i].primaryKey).length;
            
            result.push(new ownedcarListItem(cars[i].primaryKey, cars[i].name, carCount));
        }
        
        return result;
    };

    $scope.getCarCategoryDesc = function (value) {
        return getCategoryDescription(value);
    }
});
