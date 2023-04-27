'use strict'

const app         = require('express')()
const idempotency = require('./index')

idempotency({
    adapter   : 'redis',
    hostname  : 'localhost',
    defaultTtl: 8400,
});

app.get('/hello', (request, response) =>
{
    response.json({
        status : 200,
        message: 'Hello World',
    })
})

app.get('/hello1', idempotency(1), (request, response) =>
{
    response.json({
        status : 200,
        message: 'Hello World',
    })
})

app.get('/hello2', idempotency(2), (request, response) =>
{
    response.json({
        status : 200,
        message: 'Hello World',
    })
})

app.post('/customer', idempotency(), function(request, response)
{
    response.json({
        status : 200,
        message: 'Sucesso total!',
    })
})

app.listen(3000, () => console.log('Listening o port 3000'))
