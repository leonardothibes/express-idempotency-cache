'use strict'

const app         = require('express')()
const { idempotency, idempotencyConfig } = require('./index')

idempotencyConfig({
    adapter   : 'redis',
    hostname  : 'localhost',
    defaultTtl: 8400,
});

// app.get('', (request, response) =>
// {
//     response.send('Hello World')
// })

app.post('/customer', idempotency(8600), function(request, response)
// app.post('/customer', idempotency(), function(request, response)
{
    response.json({
        status : 200,
        message: 'Sucesso total!',
    })
})

app.listen(3000, () => console.log('Listening o port 3000'))
