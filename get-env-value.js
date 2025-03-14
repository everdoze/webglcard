function getValue(prop, defaultValue) {
    let val = process.env[prop];

    if (val === 'true') {
        val = true;
    } else if (val === 'false') {
        val = false;
    } else if (val === 'null') {
        val = null;
    } else if (val === 'undefined') {
        val = undefined;
    }

    if (typeof val === 'undefined') {
        return defaultValue;
    }

    return val;
}

module.exports = getValue;
