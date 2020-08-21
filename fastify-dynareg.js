const build = require('fastify-plugin')

function dynareg(packageName, packageRequired = false) {
  return build(function (fastify, options, callback) {
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
  })
}

module.exports = dynareg
module.exports.default = dynareg