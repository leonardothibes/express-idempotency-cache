'use strict';

const mung        = require('express-mung')
const config      = require('./src/config')
const idempotency = require('./src/idempotency')

function intercept(input)
{
    // Config
    if (input && typeof input === 'object') {
        config.apply(input);
        return (req, res, nxt) => nxt();
    }
    // Config

    // Cache adapter
    const adapter = idempotency.getInstance(global.idempotencyConfig)

    // Middleware
    return (body, request, response) =>
    {
        const ttl = input || global.idempotencyConfig.ttl
        const key = adapter.key(request)

        console.log({ body, ttl, adapter: adapter.adapterName });

        response.header('idempotency-key', key);
        body.message = 'intercepted: ' + body.message;

        return body;
    };
    // Middleware
}

module.exports = (input) => mung.json(intercept(input))
