'use strict'

const idempotency = require('../src/idempotency')

describe('idempotency', () =>
{
    const methods = ['POST', 'PUT', 'PATCH', 'DELETE']

    describe('key(request)', () =>
    {
        methods.forEach(method =>
        {
            it(`key(request) [${method}]`, (done) =>
            {
                const config   = { adapter: 'mock' }
                const instance = idempotency.getInstance(config)

                const body    = { foo: 'bar' }
                const request = { method, body }

                const key = instance.key(request)
                expect(key).toEqual('86132018186ec5005e03303957837c95')

                done()
            })
        })
    })

    describe('decode(body)', () =>
    {
        methods.forEach(method =>
        {
            it(`decode(body) [${method}]`, (done) =>
            {
                const config   = { adapter: 'mock' }
                const cache  = idempotency.getInstance(config)

                const body    = { foo: 'bar' }
                const request = { method, body }

                const output = cache.decode(request)
                expect(output).toEqual(JSON.stringify(request.body))

                done()
            })
        })
    })

    describe('stringify(body)', () =>
    {
        methods.forEach(method =>
        {
            it(`stringify(body) [${method}]`, (done) =>
            {
                const config = { adapter: 'mock' }
                const cache  = idempotency.getInstance(config)

                const body   = { foo: 'bar' }
                const output = cache.stringify(body)

                expect(output).toEqual(JSON.stringify(body))
                done()
            })
        })

        it('stringify(body) [GET]', (done) =>
        {
            const config = { adapter: 'mock' }
            const cache  = idempotency.getInstance(config)

            const body   = undefined
            const output = cache.stringify(body)

            expect(output).toEqual('{}')
            done()
        })
    })
})
