# fastify-dynareg

```javascript
const fastify = require('fastify')

const dynareg = require('fastify-dynareg')

const app = fastify({
  logger: true
})

// Force fastify-blipp to be registered when env is not production
app.register(dynareg('fastify-blipp', process.env.NODE_ENV !== 'production'))

app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await app.listen(3000)
    // Use conditional blipp
    if (app.blipp) {
      app.blipp()
    }
    app.log.info(`server listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
```
