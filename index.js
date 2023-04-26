'use strict';

const mung = require('express-mung');

global.idempotencyConfig = {
    adapter : 'adapter',
    hostname: 'hostname',
    ttl     : 86400,
};

function intercept(ttl)
{
    return (body, request, response) =>
    {
        ttl = ttl || global.idempotencyConfig.ttl;

        console.log({ body, ttl });

        response.header('idempotency-id', '123');
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
