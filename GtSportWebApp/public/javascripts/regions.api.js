// Region schema.
function region(primaryKey, description) {
    this.primaryKey = primaryKey;
    this.description = description;
}

// Variable to hold the root scope.
var regionsRootScope;

// BackEndTemp - remove this funciton once linked to the backend
function initializeRegions($rootScope) {
    regionsRootScope = $rootScope;
    regionsRootScope.regionsData = [new region('REG000000001', 'North America'),
        new region('REG000000002', 'Asia-Pacific'),
        new region('REG000000003', 'Europe')];
    regionsRootScope.lastRegionNumber = 3;
}

/*
Get a list of all the regions.
*/
function getAllRegions() {
    var result = [];

    for (var i = 0; i < regionsRootScope.regionsData.length; i++) {
        result.push(jQuery.extend({}, regionsRootScope.regionsData[i]));
    }

    return result;
}

/*
Looks for a region by the passed primary key.
*/
function findRegionByKey(primaryKey) {
    var result;

    for (var i = 0; i < regionsRootScope.regionsData.length; i++) {
        if (regionsRootScope.regionsData[i].primaryKey === primaryKey) {
            result = regionsRootScope.regionsData[i];
        }
    }

    return result;
}

/*
Delete the region that matches the passed primary key.
*/
function deleteRegion(primaryKey) {
    for (var i = 0; i < regionsRootScope.regionsData.length; i++) {
        if (primaryKey === regionsRootScope.regionsData[i].primaryKey) {
            regionsRootScope.regionsData.splice(i, 1);
        }
    }
}

/*
Save the passed region.
BackEndTemp - If new it will create a new key.
*/
function saveRegion(region) {
    if (region.primaryKey === "") {
        region.primaryKey = getNextRegionKey();

        regionsRootScope.regionsData.push(jQuery.extend({}, region));

    } else {
        var oldRegion = findRegionByKey(region.primaryKey);
        oldRegion.description = region.description;
    }
}

// BackEndTemp - remove this function once the link to the backend is done
function getNextRegionKey() {
    regionsRootScope.lastRegionNumber++;

    var result = "REG000000000" + regionsRootScope.lastRegionNumber.toString();

    return result;
}

