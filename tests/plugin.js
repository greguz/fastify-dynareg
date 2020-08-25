module.exports = function plugin (fastify, opts, done) {
  fastify.get('/', (request, reply) => {
    reply.code(204).send()
  })
  done()
}
