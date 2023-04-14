'use strict';

module.exports = (input) =>
{
    if (input) {
        if (Object.is(input)) {
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
