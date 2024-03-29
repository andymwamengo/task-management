/**
 * Auth MiddleWare
 */

import * as jwt from "jsonwebtoken";
import { UserNotFoundException, UnathorizedException } from './error.middleware';
import { JwtSecret } from "../auth/interface/jwt.config";
import { UsersService } from '../users/services/user.service';

export class AuthMiddleware {

    public usersService = new UsersService();

    authUsers = async (req: any, next: any) => {
        try {
            const token = req.header("Authorization").replace("Bearer ", "");
            const verifyRes: any = jwt.verify(token, JwtSecret.secret);
            const user = await this.usersService.getUsersByEmail(verifyRes.email);
            if (!user) {
                throw new UserNotFoundException();
            }
            req.token = token;
            req.user = user;
            next();
        } catch (error) {
            throw new UnathorizedException();
        }
    };
}

