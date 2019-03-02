const loadTriggerToDB = (trigger) => {
    var collection = Cretor.getCollection('Objects');
    collection.upsert({
        name: trigger.name
    }, trigger);
}

module.exports = loadTriggerToDB;