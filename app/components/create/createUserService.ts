import { Users } from "../models/user.model";

class CreateUserService {
    async VerifyEmail(email: string) {
        const data = await Users.find({ email });
        if (data.length != 0) {
            return true;
        }
        return false;

    }


    async createUser(data: any) {
        var user = new Users(data);
        await user.save();

        return user;
    }
}

export { CreateUserService };
