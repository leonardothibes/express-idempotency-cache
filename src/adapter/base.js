'use strict';

module.exports = class
{
    /**
     * @param {Object} config
     */
    constructor(config)
    {
        this.config    = config
        this.connected = false
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
     * @return {Promise<void>}
     */
    async set(key, val, ttl)
    {

    }

    /**
     * Convert a data in JSON, if its necessary.
     *
     * @param {String|Object} input
     *
     * @return {String}
     */
    toJson(input)
    {
        try {
            return JSON.stringify(input)
        } catch (e) {
            return input
        }
    }

    /**
     * Convert a JSON data into JavaScript object, if its necessary.
     *
     * @param {String} input
     *
     * @return {Object|String}
     */
    fromJson(input)
    {
        try {
            return JSON.parse(input)
        } catch (e) {
            return input
        }
    }
}
