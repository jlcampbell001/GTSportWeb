//var router = express.Router();

// Manufacturer schema.
function manufacturer(primaryKey, name, countryKey) {
    this.primaryKey = primaryKey;
    this.name = name;
    this.countryKey = countryKey;
}

// Variable to hold the root scope.
var manufacturersRootScope;

// BackEndTemp - remove this funciton once linked to the backend
function initializeManufacturers($rootScope) {
    manufacturersRootScope = $rootScope;
    manufacturersRootScope.manufacturersData = [new manufacturer('MA000000001', 'Toyota', 'COU000000001'),
        new manufacturer('MAN000000002', 'Dodge', 'COU000000002'),
        new manufacturer('MAN000000003', 'BMW', 'COU000000006'),
        new manufacturer('MAN000000004', 'Chevrolet', 'COU000000002'),
        new manufacturer('MAN000000005', 'Pontiac', 'COU000000002'),
        new manufacturer('MAN000000006', 'Panoz', 'COU000000002'),
        new manufacturer('MAN000000007', 'Fiat', 'COU000000003'),
        new manufacturer('MAN000000008', 'Abarth', 'COU000000003'),
        new manufacturer('MAN000000009', 'Ferrari', 'COU000000003'),
        new manufacturer('MAN000000010', 'Gran Turismo', 'COU000000009'),
        new manufacturer('MAN000000011', 'SRT', 'COU000000002')];
    manufacturersRootScope.lastManufacturerNumber = 11;
}

/*
Get a list of all the manufacturers.
*/
function getAllManufacturers() {
    var result = [];

    for (var i = 0; i < manufacturersRootScope.manufacturersData.length; i++) {
        result.push(jQuery.extend({}, manufacturersRootScope.manufacturersData[i]));
    }

    return result;
}

/*
Looks for a manufacturer by the passed primary key.
*/
function findManufacturerByKey(primaryKey) {
    var result;

    for (var i = 0; i < manufacturersRootScope.manufacturersData.length; i++) {
        if (manufacturersRootScope.manufacturersData[i].primaryKey === primaryKey) {
            result = manufacturersRootScope.manufacturersData[i];
        }
    }

    return result;
}

/*
Delete the manufacturer that matches the passed primary key.
*/
function deleteManufacturer(primaryKey) {
    for (var i = 0; i < manufacturersRootScope.manufacturersData.length; i++) {
        if (primaryKey === manufacturersRootScope.manufacturersData[i].primaryKey) {
            manufacturersRootScope.manufacturersData.splice(i, 1);
        }
    }
}

/*
Save the passed manufacturer.
BackEndTemp - If new it will create a new key.
*/
function saveManufacturer(manufacturer) {
    if (manufacturer.primaryKey === "") {
        manufacturer.primaryKey = getNextManufacturerKey();

        manufacturersRootScope.manufacturersData.push(jQuery.extend({}, manufacturer));

    } else {
        var oldManufacturer = findManufacturerByKey(manufacturer.primaryKey);
        oldManufacturer.name = manufacturer.name;
        oldManufacturer.countryKey = manufacturer.countryKey;
    }
}

// BackEndTemp - remove this function once the link to the backend is done
function getNextManufacturerKey() {
    manufacturersRootScope.lastmanufacturerNumber++;

    var result = "MAN000000000" + manufacturersRootScope.lastManufacturerNumber.toString();

    return result;
}

/*
router.route('/manufacturers/:id')
    .get(function (req, res) {
        findmanufacturerByKey(req.params.id)
    });
*/