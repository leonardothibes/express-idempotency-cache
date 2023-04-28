'use strict'

const idempotency = require('../src/idempotency')

describe('idempotency', () =>
{
    it('key(request)', () =>
    {
        const config   = { adapter: 'memory' }
        const instance = idempotency.getInstance(config)

        const request = {
            method: 'POST',
            body  : { foo: 'bar' }
        }

        const key = instance.key(request)

        expect(key).toEqual('86132018186ec5005e03303957837c95')
    })
})
