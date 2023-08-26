import express from 'express'
import * as idempotency from '../index'

const app = express()

const idempotencyConfig = {
    adapter: 'redis',
    ttl    : 86400,
    redis  : {
        hostname: 'localhost',
        port    : 6379,
    },
}

app.use(idempotency.init(idempotencyConfig))
app.use(express.urlencoded())
app.use(express.json())

app.post('/students', idempotency.set(10), (request: express.Request, response: express.Response) =>
{
    response.json({
        status : 200,
        message: 'Hello World',
        payload: request.body,
    })
})

app.listen(3000, () => console.log('Listening o port 3000'))
