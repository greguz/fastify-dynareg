# fastify-dynareg

[![npm version](https://badge.fury.io/js/fastify-dynareg.svg)](https://badge.fury.io/js/fastify-dynareg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.com/greguz/fastify-dynareg.svg?branch=master)](https://travis-ci.com/greguz/fastify-dynareg) [![Coverage Status](https://coveralls.io/repos/github/greguz/fastify-dynareg/badge.svg?branch=master)](https://coveralls.io/github/greguz/fastify-dynareg?branch=master)

This package is technically a plugin builder for Fastify. It exports a single function that accepts two arguments, a package name and a boolean indicating if that package is required, and returns a valid Fastify plugin. This library can be used to define both **optional** or **parametric** plugins.

## dynareg(packageName[, isRequired])

- `packageName` `<String>` The plugin's package name to `require()`.
- `isRequired` `<Boolean>` Defaults to `false`.
- Returns: `<FastifyPlugin>`

### Optional plugin presence

In the next example, this library is used to make a plugin (`fastify-blipp`) optional. This behavior can be helpful for packages only used during development. If the plugin is not present, a nice debug log is written, and no errors are thrown.

```javascript
const fastify = require('fastify')
const dynareg = require('fastify-dynareg')

const app = fastify()

// This plugin will try to register fastify-blipp if It's installed
const optionalBlipp = dynareg('fastify-blipp')

// You can still pass plugin options as usual
app.register(optionalBlipp, {
  my: 'options'
})

app.addHook('onReady', async () => {
  // Because fastify-blipp is now optional
  if (app.blipp) {
    app.blipp()
  }
})

// TODO: Setup and start you application...
```

### Parametric plugin presence

The plugin presence can also be parametric. Passing `true` as second argument will require the plugin presence.

```javascript
const fastify = require('fastify')
const dynareg = require('fastify-dynareg')

const app = fastify()

// Force fastify-blipp presence during development
const developmentBlipp = dynareg(
  'fastify-blipp',
  process.env.NODE_ENV !== 'production'
)

app.register(developmentBlipp)

app.addHook('onReady', async () => {
  // Because fastify-blipp is now optional
  if (app.blipp) {
    app.blipp()
  }
})

// TODO: Setup and start you application...
```

### Fully parametric plugin

In the last example, both plugin's name and presence are parametric.

```javascript
const fastify = require('fastify')
const dynareg = require('fastify-dynareg')

const app = fastify()

// Declare a dynamic production plugin
const myDynamicPlugin = dynareg(
  process.env.FASTIFY_PLUGIN,
  process.env.NODE_ENV === 'production'
)

app.register(myDynamicPlugin, {
  my: 'options'
})

// TODO: Setup and start you application...
```

## Example

```javascript
const fastify = require('fastify')
const dynareg = require('fastify-dynareg')

const app = fastify({
  logger: true
})

// Force fastify-blipp to be registered when env is not production
app.register(
  dynareg(
    'fastify-blipp',
    process.env.NODE_ENV !== 'production'
  )
)

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
