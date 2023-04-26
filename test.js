'use strict'

const app         = require('express')()
const idempotency = require('./index')

app.use(idempotency({
    foo: 'bar'
}))

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
