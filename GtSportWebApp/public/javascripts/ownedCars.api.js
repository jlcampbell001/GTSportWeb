// Owned Cars Schema
function ownedcar(primaryKey, ownerKey, carKey, carId, colour, maxPower,
    powerLevel, weightReductonLevel, dateAcquired) {
    this.primaryKey = primaryKey;
    this.ownerKey = ownerKey;
    this.carKey = carKey;
    this.carId = carId;
    this.colour = colour;
    this.maxPower = maxPower;
    this.powerLevel = powerLevel;
    this.weightReductonLevel = weightReductonLevel;
    this.dateAcquired = dateAcquired;
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
function initializeOwnedcars($rootScope) {
    ownedcarsRootScope = $rootScope;
    ownedcarsRootScope.ownedcarsData = [new ownedcar('OWC000000001', 'OWN9000000001', 'CAR000000003',
        'My Favorate Race Car', 'Silver', 633, 0, 0, new Date(2017, 0, 31)),
        new ownedcar('OWC000000002', 'OWN9000000001', 'CAR000000008', 'Formula Gran Turismo - 1',
            'Yellow', 633, 0, 0, new Date(2017, 2, 3)),
        new ownedcar('OWC000000003', 'OWN9000000001', 'CAR000000008', 'Formula Gran Turismo - 2',
            'Blue', 633, 0, 0, new Date(2017, 7, 3)),
        new ownedcar('OWC000000004', 'OWN9000000001', 'CAR000000005', "1500 Biposto Bertone B.A.T. 1 '52 - 1",
            'Red', 633, 1, 0, new Date(2017, 7, 12)),
        new ownedcar('OWC000000005', 'OWN9000000001', 'CAR000000005', "1500 Biposto Bertone B.A.T. 1 '52 - 2",
            'Green', 633, 0, 2, new Date(2017, 6, 11)),
        new ownedcar('OWC000000006', 'OWN9000000001', 'CAR000000007', 'Chaparral 2X Vision Gran Turismo - 1',
            'Black', 633, 2, 0, new Date(2017, 3, 5)),
        new ownedcar('OWC000000007', 'OWN9000000002', 'CAR000000006', "599 '06 - 1",
            'White', 633, 0, 1, new Date(2016, 9, 20)),
        new ownedcar('OWC000000008', 'OWN9000000002', 'CAR000000001', "Corvette Coupe (C2) '63 - 1",
            'Yellow', 633, 0, 0, new Date(2017, 0, 27)),
        new ownedcar('OWC000000009', 'OWN9000000002', 'CAR000000005', "1500 Biposto Bertone B.A.T. 1 '52 - 1",
            'Red', 633, 0, 4, new Date(2017, 6, 24)),
        new ownedcar('OWC000000010', 'OWN9000000002', 'CAR000000009', 'Tomahawk X Vision Gran Turismo - 1',
            'Silver', 633, 0, 0, new Date(2016, 10, 16)),
        new ownedcar('OWC000000011', 'OWN9000000002', 'CAR000000001', "Corvette Coupe (C2) '63 - 2",
            'Blue', 633, 0, 0, new Date(2016, 9, 4)),
        new ownedcar('OWC000000012', 'OWN9000000003', 'CAR000000003', "Esperante GTR-1 Race Car '98 - 1",
            'Silver', 633, 0, 0, new Date(2017, 3, 6))
    ];

    ownedcarsRootScope.lastOwnedcarNumber = 12;
}

/*
Get a list of all the owned cars for the passed owner.
*/
function getAllOwnedcarsByOwner(ownerKey) {
    var result = [];

    for (var i = 0; i < ownedcarsRootScope.ownedcarsData.length; i++) {
        if (ownedcarsRootScope.ownedcarsData[i].ownerKey === ownerKey) {
            result.push(jQuery.extend({}, ownedcarsRootScope.ownedcarsData[i]));
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
        if (ownedcarsRootScope.ownedcarsData[i].ownerKey === ownerKey
            && ownedcarsRootScope.ownedcarsData[i].carKey === carKey) {
            result.push(jQuery.extend({}, ownedcarsRootScope.ownedcarsData[i]));
        }
    }

    return result;
}

/*
Looks for a owned car by the passed primary key.
*/
function findOwnedcarByKey(primaryKey) {
    var result;

    for (var i = 0; i < ownedcarsRootScope.ownedcarsData.length; i++) {
        if (ownedcarsRootScope.ownedcarsData[i].primaryKey === primaryKey) {
            result = ownedcarsRootScope.ownedcarsData[i];
        }
    }

    return result;
}

/*
Delete the owned car that matches the passed primary key.
*/
function deleteOwnedcar(primaryKey) {
    for (var i = 0; i < ownedcarsRootScope.ownedcarsData.length; i++) {
        if (primaryKey === ownedcarsRootScope.ownedcarsData[i].primaryKey) {
            ownedcarsRootScope.ownedcarsData.splice(i, 1);
        }
    }
}


/*
Save the passed owned car.
BackEndTemp - If new it will create a new key.
*/
function saveOwnedcar(ownedcar) {
    if (ownedcar.primaryKey === "") {
        ownedcar.primaryKey = getNextOwnedcarKey();

        ownedcarsRootScope.ownedcarsData.push(jQuery.extend({}, ownedcar));

    } else {
        var oldOwnedcar = findOwnedcarByKey(ownedcar.primaryKey);
        oldOwnedcar.carId = ownedcar.carId;
        oldOwnedcar.colour = ownedcar.colour;
        oldOwnedcar.maxPower = ownedcar.maxPower;
        oldOwnedcar.powerLevel = ownedcar.powerLevel;
        oldOwnedcar.weightReductonLevel = ownedcar.weightReductonLevel;
        oldOwnedcar.dateAcquired = ownedcar.dateAcquired;
    }
}

// BackEndTemp - remove this function once the link to the backend is done
function getNextOwnedcarKey() {
    ownedcarsRootScope.lastOwnedcarNumber++;

    var result = "OWC000000000" + ownedcarsRootScope.lastOwnedcarNumber.toString();

    return result;
}
