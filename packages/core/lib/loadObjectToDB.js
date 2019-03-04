exports.loadObjectToDB = function (obj) {
    var collection = Creator.getCollection('objects');
    // TODO fix: Meteor code must always run within a Fiber.
    collection.upsert({
        name: obj.name
    }, obj);
}

exports.loadTriggerToDB = function (trigger) {
    var collection = Creator.getCollection('objects');
    collection.upsert({
        name: trigger.name
    }, trigger);
}