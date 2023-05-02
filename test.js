'use strict'

const express     = require('express')
const app         = express()
const idempotency = require('./src/index')

const idempotencyConfig = {
    ttl    : 60,
    adapter: 'redis',
    redis  : {
        hostname: 'localhost',
    },
}

app.use(express.json())
app.use(idempotency.init(idempotencyConfig))

app.get('/hello', (request, response) =>
{
    response.json({
        status : 200,
        message: 'Hello World',
    })
})

// app.get('/hello1', idempotency(10), (request, response) =>
// {
//     response.json({
//         status : 200,
//         message: 'Hello World',
//     })
// })

// app.get('/hello2', idempotency(20), (request, response) =>
// {
//     response.json({
//         status : 200,
//         message: 'Hello World',
//     })
// })

app.post('/customer', idempotency.set(500), function(request, response)
{
    console.log('AKI');

    response.json({
        status  : 200,
        message : 'Sucesso total!!',
        datetime: new Date(),
    })
})

app.listen(3000, () => console.log('Listening o port 3000'))
