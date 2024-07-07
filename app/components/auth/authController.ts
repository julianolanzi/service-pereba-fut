import { compare } from 'bcryptjs';
import dotenv from 'dotenv';
import { FastifyReply, FastifyRequest } from "fastify";
import { sign } from 'jsonwebtoken';
import { authLoginService } from "./authService";

dotenv.config();
class AuthController {
    async execute(request: FastifyRequest, reply: FastifyReply) {
        const service = new authLoginService();
        try {
            const { email, password } = request.body as { email: string, password: string };

            const user = await service.login(email);
            if (!user) {
                return reply.code(400).send({ errors: "Usuário nao encontrado" });
            }
            const passwordMatch = await compare(password, user.password!);

            if (!passwordMatch) {
                return reply.code(400).send({ errors: 'Senha inválida' });
            }
            user.password = undefined;

            const generateToken = {
                _id: user._id,
                email: user.email,
                apelido: user.apelido,
                permission: {
                    roles: user.permission.roles,
                    plan: user.permission.plan,
                    roleTeam: user.permission.roleTeam,
                }
            };

            const payload = {
                ...user.toJSON(),
                token: sign({ generateToken }, process.env.SECRET, {
                    expiresIn: 6000,
                })
            }

            return reply.code(200).send(payload);

        } catch (error) {
            console.log(error);
            return reply.code(400).send({ errors: 'Erro no login, aguarde uns instantes e tente novamente.' });
        }
    }
}
export { AuthController };
