'use strict'

const defaultConfig = {
    enabled: true,
    adapter: 'memory',
    ttl    : 86400,
    redis  : {
        hostname: 'localhost',
        port    : 6379,
    },
};

exports.apply = (config) =>
{
    if (!config || typeof config !== 'object') return

    const keys = Object.keys(defaultConfig)
    if (keys.length === 0) return

    if (!global.idempotencyConfig) {
        global.idempotencyConfig = config
    }

    for (const key of keys) {
        if (!global.idempotencyConfig[key]) {
            global.idempotencyConfig[key] = defaultConfig[key]
        }
    }

    return global.idempotencyConfig
}
