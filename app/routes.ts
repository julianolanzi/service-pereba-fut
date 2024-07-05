import { FastifyReply } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { FastifyRequest } from "fastify/types/request";




export async function routes(fastify: FastifyInstance, options: any) {
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
        return { title: "🔒 Perebas Fut Online" };
    })
    fastify.get("/health", async (request: FastifyRequest, reply: FastifyReply) => {
        return { status: "Online" };
    })
}