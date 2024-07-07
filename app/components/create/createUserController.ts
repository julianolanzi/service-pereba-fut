import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateUserService } from "./createUserService";

class CreateUserController {
    async execute(request: FastifyRequest, reply: FastifyReply) {
        const service = new CreateUserService();


        const userSchema = z.object({
            name: z.string().min(4, { message: "Nome deve conter no mínimo 4 caracteres" })
                .transform(name => name.toLocaleLowerCase()),
            apelido: z.string().min(2, { message: "Apelido deve conter no mínimo 2 caracteres" })
                .transform(name => name.toLocaleLowerCase()),
            birthday: z.string(),

            email: z.string().email({ message: "Email inválido" })
                .transform(name => name.toLocaleLowerCase()),
            password: z.string().min(6, { message: "Senha deve conter no mínimo 6 caracteres" })
        });

        type User = z.infer<typeof userSchema>;
        try {
            const payload = userSchema.parse(request.body);
            const verifyEmail = await service.VerifyEmail(payload.email);
            if (verifyEmail) {
                return reply.status(400).send({ errors: 'Email já cadastrado' });
            }
            const data = await service.createUser(payload);



            return reply.status(200).send(data);
        } catch (error) {
            console.log(error);
            return reply.status(400).send({ errors: error.errors });
        }
    }
}


export { CreateUserController };
