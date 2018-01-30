app.controller('carsController', function ($scope, $rootScope) {
    var blankCar = new car('', '', '', 0, '', 0.00, '', 0, '', 0.00, '', '', '', 0.00, 0.00, 0.00, 0, 0.0 ,0.0, 0.0, 0.0 ,0.0);

    // The car the user is currently working on.
    $scope.workCar = new car('', '', '', 0, '', 0.00, '', 0, '', 0.00, '', '', '', 0.00, 0.00, 0.00, 0, 0.0, 0.0, 0.0, 0.0, 0.0);

    // Currently selected car in the car select list.
    $scope.selectedCar = blankCar.primaryKey;
    
    // List of all the cars.
    $scope.cars = getAllCars();

    // List of all the manufacturers.
    $scope.manufacturers = getAllManufacturers();


    // Selecting a car in the car select list.
    $scope.carSelect = function (primaryKey) {
        if (primaryKey === '') {
            $scope.workCar = jQuery.extend({}, blankCar);
        } else {
            $scope.workCar = jQuery.extend({}, findCarByKey(primaryKey));
        }
        $scope.selectedCar = primaryKey;
    }

    // Check and see if the currently selected car can be deleted.
    $scope.carAllowDelete = function () {
        var deleteOK = true;

        if ($scope.workCar.primaryKey === '') {
            deleteOK = false;
        }

        return deleteOK;
    }

    // Delete the currently selected car.
    $scope.carDelete = function () {
        deleteCar($scope.workCar.primaryKey);

        $scope.cars = getAllCars();
        $scope.selectedCar = "";
        $scope.carSelect('');
    }

    // Save a new or update a selected car.
    $scope.carSubmit = function () {
        saveCar($scope.workCar);

        $scope.cars = getAllCars();
        $scope.selectedCars = $scope.workCars.primaryKey;
    }


});