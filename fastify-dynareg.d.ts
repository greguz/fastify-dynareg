import { FastifyPlugin } from 'fastify'

export declare function dynareg (packageName: string, packageRequired?: boolean): FastifyPlugin<{ [key: string]: any }>
export default dynareg
