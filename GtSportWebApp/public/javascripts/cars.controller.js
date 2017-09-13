app.controller('carsController', function ($scope, $rootScope) {
    var blankCar = new car('', '', '', 0, 0, 0, 0.00, '', 0, '', 0.00, '', '', '', 0.00, 0.00, 0.00, 0);

    var minCarListSize = 10;
    var maxCarListSize = 20;

    $scope.newCar = new car('', '--New Car--', '', 0, 0, 0, 0.00, '', 0, '', 0.00, '', '', '', 0.00, 0.00, 0.00, 0);

    // The car the user is currently working on.
    $scope.workCar = new dealer('', '', '', 0, 0, 0, 0.00, '', 0, '', 0.00, '', '', '', 0.00, 0.00, 0.00, 0);

    // Currently selected car in the car select list.
    $scope.selectedCar = $scope.newCar.primaryKey;

    // List of all the cars.
    $scope.cars = getAllCars();

    // List of all the dealers.
    $scope.dealers = getAllDealers();

    // Sets the car list to a min size or max size.
    $scope.setCarListSize = function () {
        var listSize = $scope.cars.length + 1;

        if (listSize < minCarListSize) {
            listSize = minCarListSize;
        }

        if (listSize > maxCarListSize) {
            listSize = maxCarListSize;
        }
        return listSize;
    }
});