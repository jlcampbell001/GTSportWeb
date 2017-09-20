// Car schema.
function car(primaryKey, name, dealerKey, year, level, powerPoints, price,
    displacementCC, horsePower, powerRPM, torqueFTLB, torqueRPM, driveTrain, aspiration,
    length, width, height, weight) {
    this.primaryKey = primaryKey;
    this.name = name;
    this.dealerKey = dealerKey;
    this.year = year;
    this.level = level;
    this.powerPoints = powerPoints;
    this.price = price;
    this.displacementCC = displacementCC;
    this.horsePower = horsePower;
    this.powerRPM = powerRPM;
    this.torqueFTLB = torqueFTLB;
    this.torqueRPM = torqueRPM;
    this.driveTrain = driveTrain;
    this.aspiration = aspiration;
    this.length = length;
    this.width = width;
    this.height = height;
    this.weight = weight;
}

// Variable to hold the root scope.
var carsRootScope;

// BackEndTemp - remove this funciton once linked to the backend
function initializeCars($rootScope) {
    carsRootScope = $rootScope;
    carsRootScope.carsData = [new car('CAR000000001', "Corvette Coupe (C2) '63", 'DEA000000004', 1963, 4, 430,
        84890.00, '5359', 249, '4400', 350.00, '2800', 'FR', 'NA', 175.10, 69.60, 49.80, 1370),
        new car('CAR000000002', "Firebird Trans AM '78", 'DEA000000005', 1978, 4, 415,
            30000.00, '6558', 219, '4000', 321.00, '2800', 'FR', 'NA', 196.80, 73.40, 49.50, 1640),
        new car('CAR000000003', "Esperante GTR-1 Race Car '98", 'DEA000000006', 1998, 6, 633,
        1700000.00, '', 741, '6500', 654.50, '3500', 'FR', 'NA', 175.60, 72.40, 48.60, 1150),
        new car('CAR000000004', "500 R '72", 'DEA000000007', 1972, 2, 221,
        15700.00, '594', 17, '4000', 28.90, '2500', 'RR', 'NA', 120.90, 54.30, 52.60, 595),
        new car('CAR000000005', "1500 Biposto Bertone B.A.T. 1 '52", 'DEA000000008', 1952, 3, 300,
        3500000.00, '', 73, '5500', 73.70, '4000', 'FR', 'NA', 0.00, 0.00, 0.00, 870),
        new car('CAR000000006', "599 '06", 'DEA000000009', 2006, 5, 545,
        320300.00, '5999', 611, '7600', 448.40, '5600', 'FR', 'NA', 183.70, 77.20, 52.60, 1580),
        new car('CAR000000007', "Chaparral 2X Vision Gran Turismo", 'DEA000000004', 2025, 7, 793,
        1000000.00, '', 905, '9100', 0.00, '', '', '', 0.00, 0.00, 0.00, 450),
        new car('CAR000000008', "Formula Gran Turismo", 'DEA000000010', 0, 8, 880,
        2000000.00, '', 891, '17500', 289.30, '15500', 'MR', 'NA', 0.00, 0.00, 0.00, 550),
        new car('CAR000000009', "Tomahawk X Vision Gran Turismo", 'DEA000000011', 2035, 9, 962,
            1000000.00, '7000', 2586, '13800', 898.50, '11300', '4WD', 'NA', 0.00, 0.00, 0.00, 749)];
    
    carsRootScope.lastCarNumber = 9;
}

/*
Get a list of all the cars.
*/
function getAllCars() {
    var result = [];

    for (var i = 0; i < carsRootScope.carsData.length; i++) {
        result.push(jQuery.extend({}, carsRootScope.carsData[i]));
    }

    return result;
}

/*
Looks for a car by the passed primary key.
*/
function findCarByKey(primaryKey) {
    var result;

    for (var i = 0; i < carsRootScope.carsData.length; i++) {
        if (carsRootScope.carsData[i].primaryKey === primaryKey) {
            result = carsRootScope.carsData[i];
        }
    }

    return result;
}

/*
Delete the car that matches the passed primary key.
*/
function deleteCar(primaryKey) {
    for (var i = 0; i < carsRootScope.carsData.length; i++) {
        if (primaryKey === carsRootScope.carsData[i].primaryKey) {
            carsRootScope.carsData.splice(i, 1);
        }
    }
}

/*
Save the passed car.
BackEndTemp - If new it will create a new key.
*/
function saveCar(car) {
    if (car.primaryKey === "") {
        car.primaryKey = getNextCarKey();

        carsRootScope.carsData.push(jQuery.extend({}, car));

    } else {
        var oldCar = findCarByKey(car.primaryKey);
        oldCar.name = car.name;
        oldCar.dealerKey = car.dealerKey;
        oldCar.year = car.year;
        oldCar.level = car.level;
        oldCar.powerPoints = car.powerPoints;
        oldCar.price = car.price;
        oldCar.displacementCC = car.displacementCC;
        oldCar.horsePower = car.horsePower;
        oldCar.powerRPM = car.powerRPM;
        oldCar.torqueFTLB = car.torqueFTLB;
        oldCar.torqueRPM = car.torqueRPM;
        oldCar.driveTrain = car.driveTrain;
        oldCar.aspiration = car.aspiration;
        oldCar.length = car.length;
        oldCar.width = car.width;
        oldCar.height = car.height;
        oldCar.weight = car.weight;
    }
}

// BackEndTemp - remove this function once the link to the backend is done
function getNextCarKey() {
    carsRootScope.lastCarNumber++;

    var result = "CAR000000000" + dealersRootScope.lastCarNumber.toString();

    return result;
}
