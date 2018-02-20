// Car schema.
function car(primaryKey, name, manufacturerKey, year, category, price,
    displacementCC, maxPower, powerRPM, torqueFTLB, torqueRPM, driveTrain, aspiration,
    length, width, height, weight, maxSpeed, acceleration, braking, cornering, stability) {
    this.primaryKey = primaryKey;
    this.name = name;
    this.manufacturerKey = manufacturerKey;
    this.year = year;
    this.category = category;
    this.price = price;
    this.displacementCC = displacementCC;
    this.maxPower = maxPower;
    this.powerRPM = powerRPM;
    this.torqueFTLB = torqueFTLB;
    this.torqueRPM = torqueRPM;
    this.driveTrain = driveTrain;
    this.aspiration = aspiration;
    this.length = length;
    this.width = width;
    this.height = height;
    this.weight = weight;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.braking = braking;
    this.cornering = cornering;
    this.stability = stability;
}

function category(value, description) {
    this.value = value;
    this.description = description;
}

// Variable to hold the root scope.
var carsRootScope;

// BackEndTemp - remove this funciton once linked to the backend
function initializeCars($rootScope) {
    carsRootScope = $rootScope;
    carsRootScope.carsData = [new car('CAR000000001', "Corvette Coupe (C2) '63", 'MAN000000004', 1963, '04N400', 
        84890.00, '5359', 249, '4400', 350.00, '2800', 'FR', 'NA', 175.10, 69.60, 49.80, 1370,
        6.6, 4.0 , 2.0, 2.0, 5.0),
        new car('CAR000000002', "Firebird Trans AM '78", 'MAN000000005', 1978, '04N400', 
            30000.00, '6558', 219, '4000', 321.00, '2800', 'FR', 'NA', 196.80, 73.40, 49.50, 1640,
            6.6, 4.0, 2.0, 2.0, 5.0),
        new car('CAR000000003', "Esperante GTR-1 Race Car '98", 'MAN000000006', 1998, '13GR1', 
            1700000.00, '', 741, '6500', 654.50, '3500', 'FR', 'NA', 175.60, 72.40, 48.60, 1150,
            6.6, 4.0, 2.0, 2.0, 5.0),
        new car('CAR000000004', "500 R '72", 'MAN000000007', 1972, '02N200', 
            15700.00, '594', 17, '4000', 28.90, '2500', 'RR', 'NA', 120.90, 54.30, 52.60, 595,
            6.6, 4.0, 2.0, 2.0, 5.0),
        new car('CAR000000005', "1500 Biposto Bertone B.A.T. 1 '52", 'MAN000000008', 1952, '03N300',
            3500000.00, '', 73, '5500', 73.70, '4000', 'FR', 'NA', 0.00, 0.00, 0.00, 870,
            6.6, 4.0, 2.0, 2.0, 5.0),
        new car('CAR000000006', "599 '06", 'MAN000000009', 2006, '05N500', 
            320300.00, '5999', 611, '7600', 448.40, '5600', 'FR', 'NA', 183.70, 77.20, 52.60, 1580,
            6.6, 4.0, 2.0, 2.0, 5.0),
        new car('CAR000000007', "Chaparral 2X Vision Gran Turismo", 'MAN000000004', 2025, '07N700', 
            1000000.00, '', 905, '9100', 0.00, '', '', '', 0.00, 0.00, 0.00, 450,
            6.6, 4.0, 2.0, 2.0, 5.0),
        new car('CAR000000008', "Formula Gran Turismo", 'MAN000000010', 0, '08N800', 
            2000000.00, '', 891, '17500', 289.30, '15500', 'MR', 'NA', 0.00, 0.00, 0.00, 550,
            6.6, 4.0, 2.0, 2.0, 5.0),
        new car('CAR000000009', "Tomahawk X Vision Gran Turismo", 'MAN000000011', 2035, '15GRX', 
            1000000.00, '7000', 2586, '13800', 898.50, '11300', '4WD', 'NA', 0.00, 0.00, 0.00, 749,
            10.0, 4.0, 2.0, 2.0, 5.0)];
    
    carsRootScope.lastCarNumber = 9;

    carsRootScope.categories = [new category('01N100', 'N100'),
        new category('02N200', 'N200'),
        new category('03N300', 'N300'),
        new category('04N400', 'N400'),
        new category('05N500', 'N500'),
        new category('06N600', 'N600'),
        new category('07N700', 'N700'),
        new category('08N800', 'N800'),
        new category('09N900', 'N900'),
        new category('10N1000', 'N1000'),
        new category('11GR4', 'GR.4'),
        new category('12GR3', 'GR.3'),
        new category('13GR1', 'GR.1'),
        new category('14GRB', 'GR.B'),
        new category('15GRX', 'GR.X')];
}

/*
Get a list of all the cars.
*/
function getAllCars(sortByName) {
    var result = [];

    for (var i = 0; i < carsRootScope.carsData.length; i++) {
        result.push(jQuery.extend({}, carsRootScope.carsData[i]));
    }

    if (sortByName)
        result = result.sort(compareCars);

    return result;
}

/*
Compare the cars by thier name.
*/
function compareCars(car1, car2) {
    var result = 0;

    if (car1.name < car2.name)
        reuslt = -1;
    if (car1.name > car2.name)
        result = 1;
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
        oldCar.manufacturerKey = car.manufacturerKey;
        oldCar.year = car.year;
        oldCar.category = car.category;
        oldCar.price = car.price;
        oldCar.displacementCC = car.displacementCC;
        oldCar.maxPower = car.maxPower;
        oldCar.powerRPM = car.powerRPM;
        oldCar.torqueFTLB = car.torqueFTLB;
        oldCar.torqueRPM = car.torqueRPM;
        oldCar.driveTrain = car.driveTrain;
        oldCar.aspiration = car.aspiration;
        oldCar.length = car.length;
        oldCar.width = car.width;
        oldCar.height = car.height;
        oldCar.weight = car.weight;
        oldCar.maxSpeed = car.maxSpeed;
        oldCar.acceleration = car.acceleration;
        oldCar.braking = car.braking;
        oldCar.cornering = car.cornering;
        oldCar.stability = car.stability;
    }
}

// BackEndTemp - remove this function once the link to the backend is done
function getNextCarKey() {
    carsRootScope.lastCarNumber++;

    var result = "CAR000000000" + carsRootScope.lastCarNumber.toString();

    return result;
}

function getCategoryDescription(categoryValue) {
    var result = '';
    for (var i = 0; i < carsRootScope.categories.length; i++) {
        if (categoryValue === carsRootScope.categories[i].value) {
            result = carsRootScope.categories[i].description;
        }
    }

    return result;
}
