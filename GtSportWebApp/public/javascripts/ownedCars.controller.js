app.controller('ownedcarsController', function ($scope, $rootScope) {
    var blankOwnedcar = new ownedcar('', $rootScope.current_owner.primaryKey, '', '', '', 0, new Date());
    
    // The car the user is currently working with.
    $scope.workcar = new car('', '', '', 0, 0, 0, 0.00, '', 0, '', 0.00, '', '', '', 0.00, 0.00, 0.00, 0);

    // Currently selected owned car in the owned car select list.
    $scope.selectedOwnedcar = '';
    
    // List of all the owned cars.
    $scope.ownedcars = getOwnedcarList();

    // Selecting a car in the owner car select list.
    $scope.ownedcarSelect = function (carKey) {
        $scope.workCar = jQuery.extend({}, findCarByKey(carKey));
        $scope.selectedOwnedcar = carKey;
    }

    // Get a list of owned cars for the current owner.
    function getOwnedcarList() {
        var cars = getAllCars();

        var result = [];
        
        for (var i = 0; i < cars.length; i++) {
            var carCount = getAllOwnedcarsByOwnerAndCar($rootScope.current_owner.primaryKey, cars[i].primaryKey).length;
            
            result.push(new ownedcarListItem(cars[i].primaryKey, cars[i].name, carCount));
        }
        
        return result;
    };
});
