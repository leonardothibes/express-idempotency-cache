'use strict'

const express     = require('express')
const app         = express()
const idempotency = require('./index')

idempotency({
    ttl    : 60,
    adapter: 'redis',
    redis  : {
        hostname: 'localhost',
    },
});

app.use(express.json())

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

app.post('/customer', idempotency(10), function(request, response)
{
    response.json({
        status : 200,
        message: 'Sucesso total!',
    })
})

app.listen(3000, () => console.log('Listening o port 3000'))
