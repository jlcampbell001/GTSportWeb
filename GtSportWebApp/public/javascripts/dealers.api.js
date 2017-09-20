//var router = express.Router();

// Dealer schema.
function dealer(primaryKey, name, countryKey) {
    this.primaryKey = primaryKey;
    this.name = name;
    this.countryKey = countryKey;
}

// Variable to hold the root scope.
var dealersRootScope;

// BackEndTemp - remove this funciton once linked to the backend
function initializeDealers($rootScope) {
    dealersRootScope = $rootScope;
    dealersRootScope.dealersData = [new dealer('DEA000000001', 'Toyota', 'COU000000001'),
        new dealer('DEA000000002', 'Dodge', 'COU000000002'),
        new dealer('DEA000000003', 'BMW', 'COU000000006'),
        new dealer('DEA000000004', 'Chevrolet', 'COU000000002'),
        new dealer('DEA000000005', 'Pontiac', 'COU000000002'),
        new dealer('DEA000000006', 'Panoz', 'COU000000002'),
        new dealer('DEA000000007', 'Fiat', 'COU000000003'),
        new dealer('DEA000000008', 'Abarth', 'COU000000003'),
        new dealer('DEA000000009', 'Ferrari', 'COU000000003'),
        new dealer('DEA000000010', 'Gran Turismo', 'COU000000009'),
        new dealer('DEA000000011', 'SRT', 'COU000000002')];
    dealersRootScope.lastDealerNumber = 11;
}

/*
Get a list of all the dealers.
*/
function getAllDealers() {
    var result = [];

    for (var i = 0; i < dealersRootScope.dealersData.length; i++) {
        result.push(jQuery.extend({}, dealersRootScope.dealersData[i]));
    }

    return result;
}

/*
Looks for a dealer by the passed primary key.
*/
function findDealerByKey(primaryKey) {
    var result;

    for (var i = 0; i < dealersRootScope.dealersData.length; i++) {
        if (dealersRootScope.dealersData[i].primaryKey === primaryKey) {
            result = dealersRootScope.dealersData[i];
        }
    }

    return result;
}

/*
Delete the dealer that matches the passed primary key.
*/
function deleteDealer(primaryKey) {
    for (var i = 0; i < dealersRootScope.dealersData.length; i++) {
        if (primaryKey === dealersRootScope.dealersData[i].primaryKey) {
            dealersRootScope.dealersData.splice(i, 1);
        }
    }
}

/*
Save the passed dealer.
BackEndTemp - If new it will create a new key.
*/
function saveDealer(dealer) {
    if (dealer.primaryKey === "") {
        dealer.primaryKey = getNextDealerKey();

        dealersRootScope.dealersData.push(jQuery.extend({}, dealer));

    } else {
        var oldDealer = findDealerByKey(dealer.primaryKey);
        oldDealer.name = dealer.name;
        oldDealer.countryKey = dealer.countryKey;
    }
}

// BackEndTemp - remove this function once the link to the backend is done
function getNextDealerKey() {
    dealersRootScope.lastDealerNumber++;

    var result = "DEA000000000" + dealersRootScope.lastDealerNumber.toString();

    return result;
}

/*
router.route('/dealers/:id')
    .get(function (req, res) {
        findDealerByKey(req.params.id)
    });
*/