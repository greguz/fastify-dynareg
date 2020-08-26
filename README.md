# fastify-dynareg

[![npm version](https://badge.fury.io/js/fastify-dynareg.svg)](https://badge.fury.io/js/fastify-dynareg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.com/greguz/fastify-dynareg.svg?branch=master)](https://travis-ci.com/greguz/fastify-dynareg) [![Coverage Status](https://coveralls.io/repos/github/greguz/fastify-dynareg/badge.svg?branch=master)](https://coveralls.io/github/greguz/fastify-dynareg?branch=master)

```javascript
const fastify = require('fastify')

const dynareg = require('fastify-dynareg')

const app = fastify({
  logger: true
})

// Force fastify-blipp to be registered when env is not production
app.register(dynareg('fastify-blipp', process.env.NODE_ENV !== 'production'))

// Just try to load fastify-nope
app.register(dynareg('fastify-nope'))

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
