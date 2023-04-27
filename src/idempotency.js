'use strict'

class Idempotency
{
    /**
     * @param {Object} config
     */
    constructor(config)
    {
        this.config      = config
        this.adapterName = String(config.adapter).trim().toLowerCase()
        this.adapter     = this.getAdapter(this.adapterName)
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

    getAdapter(adapterName)
    {
        try {
            const driver  = require(`./adapter/${adapterName}`)
            return new driver(this.config)
        } catch (e) {
            const message = `Cannot instantiate idempotency driver: ${adapterName}`
            throw new Error(message)
        }
    }
}

module.exports = Idempotency
