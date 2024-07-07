import dotenv from 'dotenv';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { verify } from "jsonwebtoken";

dotenv.config();

export function AuthMiddlewares(request: FastifyRequest, replay: FastifyReply, done: HookHandlerDoneFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        return replay.code(403).send({ errors: 'No token provided' });
    }

    const parts = authorization.split(' ');

    if (parts.length !== 2) {
        return replay.code(403).send({ errors: 'Token Error' });
    }

    const [scheme, token] = parts;


    if (!/^Bearer$/i.test(scheme)) {
        return replay.code(403).send({ errors: 'Token malformatted' });
    }

    const secret = process.env.SECRET;
    // Add this line to assign the value of process.env.SECRET to a variable

    if (!secret) {
        return replay.code(403).send({ errors: 'Secret not defined' }); // Add this line to handle the case when process.env.SECRET is undefined
    }
    verify(token, secret, (err, decoded: any) => { // Add type annotation to 'decoded'

        if (err)
            return replay.code(403).send({ errors: 'Token invalid' });

        const validate = {
            email: decoded.generateToken.email,
            token: decoded.generateToken.token,
            validate: token
        }

        request.headers = validate;
        request.headers = decoded.generateToken;


        return done();

    })

}






