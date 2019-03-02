exports.loadObjectToDB = function (obj) {
    var collection = Cretor.getCollection('Objects');
    collection.upsert({
        name: obj.name
    }, obj);
}

exports.loadTriggerToDB = function (trigger) {
    var collection = Cretor.getCollection('Objects');
    collection.upsert({
        name: trigger.name
    }, trigger);
}