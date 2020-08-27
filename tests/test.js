const test = require('ava')
const fastify = require('fastify')
const dynareg = require('../fastify-dynareg')
const path = require('path')

test('optional', async t => {
  const app = fastify()

  app.register(dynareg(path.join(__dirname, 'plugin.js')))

  app.register(dynareg('fastify-nope'))

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  t.is(response.statusCode, 204)
})

test('required', async t => {
  const app = fastify()

  app.register(dynareg('fastify-nope', true))

  await t.throwsAsync(
    app.inject({
      method: 'GET',
      url: '/'
    }),
    { code: 'MODULE_NOT_FOUND' }
  )
})

test('error', t => {
  t.throws(() => dynareg(null))
  t.throws(() => dynareg(true))
  t.throws(() => dynareg(false))
  t.throws(() => dynareg({}))
  t.throws(() => dynareg([]))
})
