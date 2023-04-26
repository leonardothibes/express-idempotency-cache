'use strict';

module.exports = (input) =>
{
    if (input) {
        if (typeof input === 'object') {
            console.log('CONFIG', input)
        } else {
            console.log('TTL', input)
        }
    }

    return (request, response, next) =>
    {
        console.log('AKI');

        next()
    }
}
