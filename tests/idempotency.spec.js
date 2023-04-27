'use strict'

const idempotency = require('../src/idempotency')

describe('idempotency', () =>
{
    it('getId(request)', () =>
    {
        const config   = { adapter: 'memory' }
        const instance = idempotency.getInstance()

        const request = {}
        const key = instance.getKey(request)

        expect(key).toEqual('caculatedKeyFromRequest')
    })
})
