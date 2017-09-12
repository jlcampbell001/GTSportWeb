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
    regionsRootScope.regions = [new region('REG000000001', 'North America'),
        new region('REG000000002', 'Asia'),
        new region('REG000000003', 'Europe')];
}

/*
Looks for a region by the passed primary key.
*/
function findRegionByKey(primaryKey) {
    var result;

    for (var i = 0; i < regionsRootScope.regions.length; i++) {
        if (regionsRootScope.regions[i].primaryKey === primaryKey) {
            result = regionsRootScope.regions[i];
        }
    }

    return result;
}

/*
Delete the region that matches the passed primary key.
*/
function deleteRegion(primaryKey) {
    for (var i = 0; i < regionsRootScope.regions.length; i++) {
        if (primaryKey === regionsRootScope.regions[i].primaryKey) {
            regionsRootScope.regions.splice(i, 1);
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

        regionsRootScope.regions.push(jQuery.extend({}, region));

    } else {
        var oldRegion = findRegionByKey(region.primaryKey);
        oldRegion.description = region.description;
    }
}

// BackEndTemp - remove this function once the link to the backend is done
function getNextRegionKey() {
    var lastRegionNumber = regionsRootScope.regions.length;

    var result = "REG000000000" + lastRegionNumber.toString();

    return result;
}

