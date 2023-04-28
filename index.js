'use strict'

const mung        = require('express-mung')
const config      = require('./src/config')
const Idempotency = require('./src/idempotency')

function intercept(input)
{
    // Cache adapter
    const options     = global.idempotencyConfig
    const idempotency = Idempotency.getInstance(options)
    // Cache adapter

    // Interceptor
    return (body, request, response) =>
    {
        (async () =>
        {
            const key = idempotency.key(request)
            response.header('idempotency-key', key)

            const cached = await idempotency.adapter.get(key)
            if (cached) return response.body = cached

            const ttl = input || global.idempotencyConfig.ttl
            await idempotency.adapter.set(key, body, ttl)

            response.body = body
        })()
    }
    // Interceptor
}

exports.interceptor = (ttl) =>
{

}

exports.init = (input) =>
{
    // Config
    config.apply(input)

    // Cache adapter
    const idempotency = Idempotency.getInstance(global.idempotencyConfig)

    // Cache save middleware
    return async (request, response, next) =>
    {
        const key = idempotency.key(request)
        response.header('idempotency-key', key)

        // (async () =>
        // {
            // const key = idempotency.key(request)
            // response.header('idempotency-key', key)

            const cached = await idempotency.adapter.get(key)
            if (cached) response.json(cached)

            // next()
        // })()
    }
    // Cache save middleware
}

function Oldintercept(input)
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
    return (body, request, response) =>
    {
        (async () =>
        {
            const key = idempotency.key(request)
            response.header('idempotency-key', key)

            const cached = await idempotency.adapter.get(key)
            if (cached) return response.body = cached

            const ttl = input || global.idempotencyConfig.ttl
            await idempotency.adapter.set(key, body, ttl)

            response.body = body
        })()
    }
    // Middleware
}

// module.exports = (input) => mung.json(intercept(input))


