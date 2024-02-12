exports.filterObjects = (object, keys) => {
    let filtered = {}
    for(const key of keys) {
        if(object.hasOwnProperty(key)){
            filtered[key] = object[key]
        }
    }

    return filtered
}

exports.castObject = (obj) => {
    return Object.create(Object.prototype, Object.getOwnPropertyDescriptors(obj))
}

exports.isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

