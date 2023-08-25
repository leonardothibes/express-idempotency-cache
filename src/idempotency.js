'use strict'

const md5 = require('md5')

class Idempotency
{
    get defaultConfig() { return { adapter: 'memory', ttl: 86400 } }

    /**
     * @param {Object} config
     */
    constructor(config)
    {
        this.config      = config || this.defaultConfig
        this.adapterName = String(this.config.adapter).trim().toLowerCase()
        this.adapter     = this._getAdapter()
    }

    /**
     * @param {Object} config
     */
    static getInstance(config)
    {
        if (!this.instance) {
            this.instance = new Idempotency(config)
        }

        return this.instance
    }

    /**
     * Calculate idempotency id from request.
     */
    key(request)
    {
        const body = this.decode(request)

        return md5(`${request.url}:${body}`)
    }

    /**
     * Decodes a request body.
     *
     * @return {String}
     */
    decode(request)
    {
        if (request.method === 'GET') return '{}'

        return this.stringify(request.body)
    }

    /**
     * Stringify the request body.
     */
    stringify(body)
    {
        try {
            return JSON.stringify(body || {})
        } catch (e) {
            return '{}'
        }
    }

    _getAdapter()
    {
        try {
            const adapter = require(`./adapter/${this.adapterName}`)
            return new adapter(this.config)
        } catch (e) {
            const message = `Cannot instantiate idempotency adapter: ${this.adapterName}`
            throw Error(message)
        }
    }
}

module.exports = Idempotency
