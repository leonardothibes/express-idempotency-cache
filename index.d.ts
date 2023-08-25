export interface IdempotencyParams
{
    adapter: 'redis' | 'memory',
    ttl: number
    redis?: IdempotencyParamsRedis
}

export interface IdempotencyParamsRedis
{
    hostname: string
    port: number
}

/**
 * Init the idempotency configuration into Express.
 *
 * @param {Object} input Config params
 */
export const init: (input: IdempotencyParams) => any

/**
 * Set idempotency configuration in a endpoint.
 *
 * @param {Number} ttl Cache expiration time to live
 */
export const set: (ttl: number) => any
