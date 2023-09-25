exports.filterObjects = (keysToRemove, obj) => {
    // if (Array.isArray(keysToKeep) && typeof obj === 'object'){
  
    // }
    // console.log(keysToRemove, obj)
    let filtered = undefined
    const filteredEntries = Object.entries(obj).filter(([key]) => {
        keysToRemove.includes(key)
    });

    filtered = Object.fromEntries(filteredEntries)
    return filtered

}

exports.castObject = (obj) => {
    return Object.create(Object.prototype, Object.getOwnPropertyDescriptors(obj))
}

exports.isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

