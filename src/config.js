'use strict'

global.idempotencyConfig = {
    enabled: true,
    adapter: 'memory',
    ttl    : 86400,
    redis  : {
        hostname: 'localhost',
        password: null,
        port    : 6379,
    },
};

exports.apply = config =>
{
    if (!config || typeof input !== 'object') return

    const keys = Object.keys(config)
    if (keys.length === 0) return

    for (const key of keys) {
        global.idempotencyConfig[key] = config[key]
    }
}
