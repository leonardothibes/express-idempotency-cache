'use strict';

module.exports = class
{
    constructor(config)
    {
        this.config = config
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
        return null
    }

    /**
     * Set the cache value identified by a key.
     *
     * @param {String}        key
     * @param {String|Object} val
     * @param {Number}        ttl
     *
     * @return {Promise<any>}
     */
    async set(key, val, ttl)
    {
        return null
    }
}
