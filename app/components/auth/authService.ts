import { Users } from "../models/user.model";


class authLoginService {

    async login(email: string) {
        const data = await Users.findOne({ email }).select('+password').exec();
        return data;
    }

}

export { authLoginService };
