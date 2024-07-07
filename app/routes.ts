import { FastifyReply } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { FastifyRequest } from "fastify/types/request";
import { AuthController } from "./components/auth/authController";
import { CreateUserController } from "./components/create/createUserController";
import { RefreshToken } from "./components/refresh-token/refreshTokenController";
import { AuthMiddlewares } from "./middlewares/auth.middlewares";




export async function routes(fastify: FastifyInstance, options: any) {
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
        return { title: "🔒 Perebas Fut Online" };
    })
    fastify.get("/health", async (request: FastifyRequest, reply: FastifyReply) => {
        return { status: "Online" };
    })

    fastify.post("/register", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().execute(request, reply);
    })

    fastify.post("/auth/", async (request: FastifyRequest, reply: FastifyReply) => {
        return new AuthController().execute(request, reply);
    })
    fastify.get("/refresh_token/", { onRequest: [AuthMiddlewares] }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new RefreshToken().execute(request, reply);
    })
}