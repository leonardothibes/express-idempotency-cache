'use strict';

const mung = require('express-mung');

global.idempotencyConfig = {
    adapter   : 'adapter',
    hostname  : 'hostname',
    defaultTtl: 'defaultTtl',
};

function intercept(ttl)
{
    return (body, request, response) =>
    {
        ttl = ttl || global.idempotencyConfig.defaultTtl;

        console.log({ body, ttl });

        body.message = 'nananinanao';

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
