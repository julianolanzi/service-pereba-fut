import { Users } from "../models/user.model";


class RefreshTokenService {
    async refreshToken(id: string) {

        const user = await Users.findById(id);
        return user;
    }
}

export { RefreshTokenService };
