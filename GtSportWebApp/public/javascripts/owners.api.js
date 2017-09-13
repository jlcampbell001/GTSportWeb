// Owner schema.
function owner(primaryKey, name, defaultOwner, current) {
    this.primaryKey = primaryKey;
    this.name = name;
    this.defaultOwner = defaultOwner;
    this.current = current;
}

// Variable to hold the root scope.
var ownersRootScope;

// BackEndTemp - remove this function once linked to the backend.
function initializeOwners($rootScope) {
    ownersRootScope = $rootScope;
    ownersRootScope.ownersData = [new owner('OWN9000000001', 'Owner 1', true, false),
        new owner('OWN9000000002', 'Owner 2', false, false),
        new owner('OWN9000000003', 'Owner 3', false, false)];
    ownersRootScope.lastOwnerNumber = 3;
}

/*
 Gets the default owner.
*/
function getDefaultOwner() {
    var result;
    for (var i = 0; i < ownersRootScope.ownersData.length; i++) {
        if (ownersRootScope.ownersData[i].defaultOwner) {
            result = ownersRootScope.ownersData[i];
        }
    }
    return result;
}

/*
 Sets the current owner in use.
*/
function setCurrentOwner(oldOwnerKey, newOwnerKey) {
    if (typeof oldOwnerKey === 'undefined' || oldOwnerKey === '') {
        for (var i = 0; i < ownersRootScope.ownersData.length; i++) {
            ownersRootScope.ownersData[i].current = false;
        }
    } else {
        var oldOwner = findOwnerByKey(oldOwnerKey);
        oldOwner.current = false;
    }

    var newOwner = findOwnerByKey(newOwnerKey);
    newOwner.current = true;

    ownersRootScope.current_owner = jQuery.extend({}, newOwner);
}

/*
Get a list of all the owners.
*/
function getAllOwners() {
    var result = [];

    for (var i = 0; i < ownersRootScope.ownersData.length; i++) {
        result.push(jQuery.extend({}, ownersRootScope.ownersData[i]));
    }

    return result;
}

/*
 Looks for the owner by the primary key.
*/
function findOwnerByKey(primaryKey) {
    var result;
    for (var i = 0; i < ownersRootScope.ownersData.length; i++) {
        if (ownersRootScope.ownersData[i].primaryKey === primaryKey) {
            result = ownersRootScope.ownersData[i];
        }
    }
    return result;
}

/*
 Delete the owner for the passed primary key.
*/
function deleteOwner(primaryKey) {
    for (var i = 0; i < ownersRootScope.ownersData.length; i++) {
        if (primaryKey === ownersRootScope.ownersData[i].primaryKey) {
            ownersRootScope.ownersData.splice(i, 1);
        }
    }
}

/*
 Save the passed owner.
BackEndTemp - If new it will create a new key.
*/
function saveOwner(owner) {
    if (owner.primaryKey === "") {
        owner.primaryKey = getNextOwnerKey();

        ownersRootScope.ownersData.push(jQuery.extend({}, owner));

    } else {
        var oldOwner = findOwnerByKey(owner.primaryKey);
        oldOwner.name = owner.name;
        oldOwner.defaultOwner = owner.defaultOwner;
    }
}

// BackEndTemp - remove this function once the link to the backend is done
function getNextOwnerKey() {
    ownersRootScope.lastOwnerNumber++;

    var result = "OWN000000000" + ownersRootScope.lastOwnerNumber.toString();

    return result;
}