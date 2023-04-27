'use strict'

class Idempotency
{
    get defaultConfig() { return { adapter: 'memory' } }

    /**
     * @param {Object} config
     */
    constructor(config)
    {
        this.config  = config || this.defaultConfig
        this.adapter = this._getAdapter()
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
    getKey(request)
    {
        return 'caculatedKeyFromRequest'
    }

    _getAdapter()
    {
        try {
            const name   = String(this.config.adapter).trim().toLowerCase()
            const driver = require(`./adapter/${name}`)

            return new driver(this.config)
        } catch (e) {
            const message = `Cannot instantiate idempotency driver: ${adapterName}`
            throw Error(message)
        }
    }
}

module.exports = Idempotency
