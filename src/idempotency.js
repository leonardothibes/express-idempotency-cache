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
     * @param {String} adapterName
     */
    static getInstance(adapterName)
    {
        // return this.instance || new Idempotency(adapterName)

        if (!this.instance) {
            this.instance = new Idempotency(adapterName)
        }

        return this.instance
    }

    /**
     * Calculate idempotency id from request.
     */
    getId(request)
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
