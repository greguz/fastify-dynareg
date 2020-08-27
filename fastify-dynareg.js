const build = require('fastify-plugin')

function dynareg (packageName, packageRequired = false) {
  if (typeof packageName !== 'string') {
    throw new TypeError('Package name must be a string')
  }
  return build(
    function plugin (fastify, options, callback) {
      let packageObject
      try {
        packageObject = require(packageName)
      } catch (err) {
        if (err instanceof Error && err.code === 'MODULE_NOT_FOUND' && !packageRequired) {
          fastify.log.debug(`Skipping ${packageName} registration`)
        } else {
          callback(err)
          return
        }
      }
      if (packageObject) {
        fastify.register(packageObject.default || packageObject, options)
      }
      callback()
    },
    {
      name: 'fastify-dynareg',
      fastify: '^3.0.0'
    }
  )
}

dynareg.default = dynareg
module.exports = dynareg
