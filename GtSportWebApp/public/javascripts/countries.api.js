// Country schema.
function country(primaryKey, description, regionKey) {
    this.primaryKey = primaryKey;
    this.description = description;
    this.regionKey = regionKey;
}

// Variable to hold the root scope.
var countriesRootScope;

// BackEndTemp - remove this funciton once linked to the backend
function initializeCountries($rootScope) {
    countriesRootScope = $rootScope;
    countriesRootScope.countriesData = [new country('COU000000001', 'Japan', 'REG000000002'),
        new country('COU000000002', 'USA', 'REG000000001'),
        new country('COU000000003', 'Italy', 'REG000000003'),
        new country('COU000000004', 'United Kingdom', 'REG000000003'),
        new country('COU000000005', 'France', 'REG000000003'),
        new country('COU000000006', 'Germany', 'REG000000003'),
        new country('COU000000007', 'Australia', 'REG000000002'),
        new country('COU000000008', 'Belgim', 'REG000000003'),
        new country('COU000000009', 'PDI', 'REG000000002'),
        new country('COU000000010', 'Canada', 'REG000000001'),
        new country('COU000000011', 'South Korea', 'REG000000002'),
        new country('COU000000012', 'Austria', 'REG000000003'),
        new country('COU000000013', 'Spain', 'REG000000003'),
        new country('COU000000014', 'Netherlands', 'REG000000003'),
        new country('COU000000015', 'Sweeden', 'REG000000003')];
    countriesRootScope.lastCountryNumber = 15;
}

/*
Get a list of all the countries.
*/
function getAllCountries() {
    var result = [];

    for (var i = 0; i < countriesRootScope.countriesData.length; i++) {
        result.push(jQuery.extend({}, countriesRootScope.countriesData[i]));
    }

    return result;
}

/*
Looks for a country by the passed primary key.
*/
function findCountryByKey(primaryKey) {
    var result;

    for (var i = 0; i < countriesRootScope.countriesData.length; i++) {
        if (countriesRootScope.countriesData[i].primaryKey === primaryKey) {
            result = countriesRootScope.countriesData[i];
        }
    }

    return result;
}

/*
Delete the country that matches the passed primary key.
*/
function deleteCountry(primaryKey) {
    for (var i = 0; i < countriesRootScope.countriesData.length; i++) {
        if (primaryKey === countriesRootScope.countriesData[i].primaryKey) {
            countriesRootScope.countriesData.splice(i, 1);
        }
    }
}

/*
Save the passed country.
BackEndTemp - If new it will create a new key.
*/
function saveCountry(country) {
    if (country.primaryKey === "") {
        country.primaryKey = getNextCountryKey();

        countriesRootScope.countriesData.push(jQuery.extend({}, country));

    } else {
        var oldCountry = findCountryByKey(country.primaryKey);
        oldCountry.description = country.description;
        oldCountry.regionKey = country.regionKey;
    }
}

// BackEndTemp - remove this function once the link to the backend is done
function getNextCountryKey() {
    countriesRootScope.lastCountryNumber++;

    var result = "COU000000000" + countriesRootScope.lastCountryNumber.toString();

    return result;
}


