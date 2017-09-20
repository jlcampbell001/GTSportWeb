// Owned Cars Schema
function ownedcar(primaryKey, ownerKey, carKey, carId, colour, powerPoints, dateAquired) {
    this.primaryKey = primaryKey;
    this.ownerKey = ownerKey;
    this.carKey = carKey;
    this.carId = carId;
    this.colour = colour;
    this.powerPoints = powerPoints;
    this.dateAquired = dateAquired;
}

// Owned Cars List Schema
function ownedcarListItem(carKey, carName, carCount) {
    this.carKey = carKey;
    this.carName = carName;
    this.carCount = carCount;
}

// Variable to hold the root scope.
var ownedcarsRootScope;

// BackEndTemp - remove this funciton once linked to the backend
function initializeOwnedCars($rootScope) {
    ownedcarsRootScope = $rootScope;
    ownedcarsRootScope.ownedcarsData = [new ownedcar('OWC000000001', 'OWN9000000001', 'CAR000000003',
        'My Favorate Race Car', 'Silver', 633, new Date(2017, 0, 31)),
        new ownedcar('OWC000000002', 'OWN9000000001', 'CAR000000008', 'Formula Gran Turismo - 1',
            'Yellow', 633, new Date(2017, 2, 3)),
        new ownedcar('OWC000000003', 'OWN9000000001', 'CAR000000008', 'Formula Gran Turismo - 2',
            'Blue', 633, new Date(2017, 7, 3)),
        new ownedcar('OWC000000004', 'OWN9000000001', 'CAR000000005', "1500 Biposto Bertone B.A.T. 1 '52 - 1",
            'Red', 633, new Date(2017, 7, 12)),
        new ownedcar('OWC000000005', 'OWN9000000001', 'CAR000000005', "1500 Biposto Bertone B.A.T. 1 '52 - 2",
            'Green', 633, new Date(2017, 6, 11)),
        new ownedcar('OWC000000006', 'OWN9000000001', 'CAR000000007', 'Chaparral 2X Vision Gran Turismo - 1',
            'Black', 633, new Date(2017, 3, 5)),
        new ownedcar('OWC000000007', 'OWN9000000002', 'CAR000000006', "599 '06 - 1",
            'White', 633, new Date(2016, 9, 20)),
        new ownedcar('OWC000000008', 'OWN9000000002', 'CAR000000001', "Corvette Coupe (C2) '63 - 1",
            'Yellow', 633, new Date(2017, 0, 27)),
        new ownedcar('OWC000000009', 'OWN9000000002', 'CAR000000005', "1500 Biposto Bertone B.A.T. 1 '52 - 1",
            'Red', 633, new Date(2017, 6, 24)),
        new ownedcar('OWC000000010', 'OWN9000000002', 'CAR000000009', 'Tomahawk X Vision Gran Turismo - 1',
            'Silver', 633, new Date(2016, 10, 16)),
        new ownedcar('OWC000000011', 'OWN9000000002', 'CAR000000001', "Corvette Coupe (C2) '63 - 2",
            'Blue', 633, new Date(2016, 9, 4)),
        new ownedcar('OWC000000012', 'OWN9000000003', 'CAR000000003', "Esperante GTR-1 Race Car '98 - 1",
            'Silver', 633, new Date(2017, 3, 6))
    ];

    ownedcarsRootScope.lastOwnedcarNumber = 12;
}

/*
Get a list of all the owned cars for the passed owner.
*/
function getAllOwnedcarsByOwner(ownerKey) {
    var result = [];

    for (var i = 0; i < ownedcarsRootScope.ownedcarsData.length; i++) {
        if (carsRootScope.ownedcarsData[i].ownerKey === ownerKey) {
            result.push(jQuery.extend({}, carsRootScope.ownedcarsData[i]));
        }
    }

    return result;
}

/*
Get a list of all the owned cars for the passed owner and car.
*/
function getAllOwnedcarsByOwnerAndCar(ownerKey, carKey) {
    var result = [];

    for (var i = 0; i < ownedcarsRootScope.ownedcarsData.length; i++) {
        if (carsRootScope.ownedcarsData[i].ownerKey === ownerKey
            && carsRootScope.ownedcarsData[i].carKey === carKey) {
            result.push(jQuery.extend({}, ownedcarsRootScope.ownedcarsData[i]));
        }
    }

    return result;
}