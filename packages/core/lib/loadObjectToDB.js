const loadObjectToDB = (obj) => {
    var collection = Cretor.getCollection('Objects');
    collection.upsert({
        name: obj.name
    }, obj);
}

module.exports = loadObjectToDB;