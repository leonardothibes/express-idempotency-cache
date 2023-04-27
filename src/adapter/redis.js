'use strict'

const Base  = require('./base')
const Redis = require('async-redis')

module.exports = class extends Base
{
    /**
     * Create Redis connection.
     *
     * @param {Object} options
     * @param {String} options.port
     * @param {String} options.hostname
     * @param {String} [options.username]
     * @param {String} [options.password]
     * @param {String} [options.database]
     */
    async _connect(options)
    {
        try {
            this.redis = Redis.createClient(options.port, options.hostname)

            this.redis.on('error', e => {
                throw Error(e)
            })

            this.connected = true
        } catch (e) {
            this.connected = false
            throw Error(e)
        }
    }

    /**
     * Get the cache value from Redis.
     *
     * @param {String} key
     *
     * @return {Promise<any>}
     */
    async get(key)
    {
        if (!this.connected) this._connect(this.config.redis)

        return await this.redis.get(key)
    }

    /**
     * Set the cache value into Redis.
     *
     * @param {String}        key
     * @param {String|Object} val
     * @param {Number}        ttl
     *
     * @return {Promise<void>}
     */
    async set(key, val, ttl)
    {
        if (!this.connected) this._connect(this.config.redis)

        await this.redis.set(key, this.json(val))
        await this.redis.expire(key, Number(ttl))
    }
}
