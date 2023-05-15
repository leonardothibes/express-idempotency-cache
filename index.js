'use strict'

const mung        = require('express-mung')
const config      = require('./src/config')
const Idempotency = require('./src/idempotency')

/**
 * Init the idempotency configuration into Express.
 *
 * @param {Object} input Config params
 *
 * @return {Function}
 */
exports.init = (input) =>
{
    const idempotencyConfig = config.apply(input)
    const idempotency       = Idempotency.getInstance(idempotencyConfig)

    return async (request, response, next) =>
    {
        const key = idempotency.key(request)
        response.header('idempotency-key', key)

        const cached = await idempotency.adapter.get(key)
        if (cached) return response.json(cached)

        next()
    }
}

/**
 * Intercep all request to be cached.
 *
 * @param {Number} input Cache expiration time to live
 *
 * @return {Function}
 */
function intercept(input)
{
    const options     = global.idempotencyConfig
    const idempotency = Idempotency.getInstance(options)

    return (body, request, response) =>
    {
        (async () =>
        {
            const key = idempotency.key(request)
            response.header('idempotency-key', key)

            const ttl = Number(input || global.idempotencyConfig.ttl)
            await idempotency.adapter.set(key, body, ttl)

            response.body = body
        })()
    }
}

/**
 * Set idempotency configuration in a endpoint.
 *
 * @param {Number} ttl Cache expiration time to live
 *
 * @return {Function}
 */
exports.set = (ttl) => mung.json(intercept(ttl))
