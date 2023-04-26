'use strict';

const mung = require('express-mung');

global.idempotencyConfig = {
    adapter   : 'adapter',
    hostname  : 'hostname',
    defaultTtl: 86400,
};

function intercept(ttl)
{
    return (body, request, response) =>
    {
        ttl = ttl || global.idempotencyConfig.defaultTtl;

        console.log({ body, ttl });

        body.message = 'intercepted: ' + body.message;

        return body;
    };
}

exports.idempotency = ttl => mung.json(intercept(ttl));

exports.idempotencyConfig = (input) =>
{
    if (input && typeof input === 'object') {
        console.log('CONFIG', input)
    }
}
