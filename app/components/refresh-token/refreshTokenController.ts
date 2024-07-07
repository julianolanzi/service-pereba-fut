import dotenv from 'dotenv';
import { FastifyReply, FastifyRequest } from 'fastify';
import { sign } from 'jsonwebtoken';
import { RefreshTokenService } from './refreshTokenService';
dotenv.config();
class RefreshToken {

    async execute(request: FastifyRequest, reply: FastifyReply) {
        const service = new RefreshTokenService();

        const id = request.headers._id as string;

        try {
            const data = await service.refreshToken(id);

            const generateToken = {
                _id: data._id,
                email: data.email,
                url: data.url,
                permission: {
                    roles: data.permission.roles,
                    plan: data.permission.plan,
                    roleTeam: data.permission.roleTeam,
                }
            };

            let response = {
                _id: data.id,
                email: data.email,
                permission: {
                    roles: data.permission.roles,
                    plan: data.permission.plan,
                    roleTeam: data.permission.roleTeam,
                },
                url: data.url,
                token: sign({ generateToken }, process.env.SECRET, {
                    expiresIn: 6000,
                })
            }
            return reply.code(200).send(response);



        } catch (error) {
            console.log(error);
            return reply.status(400).send({ errors: 'Erro ao obter os dados' });
        }
    }
}

export { RefreshToken };
