'use strict'

const app = require('express')()
const { idempotency, idempotencyConfig } = require('./index')

idempotencyConfig({
    adapter   : 'redis',
    hostname  : 'localhost',
    defaultTtl: 8400,
});

app.get('', idempotency(), (request, response) =>
{
    response.json({
        status : 200,
        message: 'Hello World',
    })
})

app.get('/hello', (request, response) =>
{
    response.json({
        status : 200,
        message: 'Hello World',
    })
})

app.post('/customer', idempotency(1440), function(request, response)
{
    response.json({
        status : 200,
        message: 'Sucesso total!',
    })
})

app.listen(3000, () => console.log('Listening o port 3000'))
