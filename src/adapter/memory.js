'use strict'

const Base  = require('./base')
const Cache = require('ttl-cache')

module.exports = class extends Base
{
    /**
     * @param {Object} config
     */
    constructor(config)
    {
        super(config)
        this.cache = new Cache()
    }

    /**
     * Get the cache value.
     *
     * @param {String} key
     *
     * @return {Promise<any>}
     */
    async get(key)
    {
        return this.cache.get(key)
    }

    /**
     * Set the cache value identified by a key.
     *
     * @param {String}        key
     * @param {String|Object} val
     * @param {Number}        ttl
     *
     * @return {Promise<void>}
     */
    async set(key, val, ttl)
    {
        await this.cache.set(key, val)
        await this.cache.ttl(key, Number(ttl))
    }
}
