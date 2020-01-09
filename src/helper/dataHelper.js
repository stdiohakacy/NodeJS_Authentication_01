module.exports.isEmpty = (object) => {
    for (var prop in object) {
        if (object.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(object) === JSON.stringify({});
};

module.exports.filterModel = (source, dist) => {
    for (let key in source) {
        if (!dist.hasOwnProperty(key))
            delete source[key];
    }
    return source;
};
