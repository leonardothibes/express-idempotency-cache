'use strict'

const mung        = require('express-mung')
const config      = require('./src/config')
const Idempotency = require('./src/idempotency')

function intercept(input)
{
    // Config
    if (input && typeof input === 'object') {
        config.apply(input)
        return (req, res, nxt) => nxt()
    }
    // Config

    // Cache adapter
    const idempotency = Idempotency.getInstance(global.idempotencyConfig)

    // Middleware
    return async (body, request, response) =>
    {
        const key = idempotency.key(request)
        response.header('idempotency-key', key)

        const cached = await idempotency.adapter.get(key)
        if (cached) return cached

        const ttl = input || global.idempotencyConfig.ttl
        await idempotency.adapter.set(key, body, ttl)

        return body
    }
    // Middleware
}

module.exports = (input) => mung.json(intercept(input))
