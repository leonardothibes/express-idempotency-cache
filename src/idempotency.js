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
        const methods = ['POST', 'PUT']
        const body    = methods.includes(request.method) ? JSON.stringify(request.body) : '{}'

        return md5(`${request.url}:${body}`)
    }

    _getAdapter()
    {
        try {
            const driver = require(`./adapter/${this.adapterName}`)
            return new driver(this.config)
        } catch (e) {
            const message = `Cannot instantiate idempotency driver: ${this.adapterName}`
            throw Error(message)
        }
    }
}

module.exports = Idempotency
