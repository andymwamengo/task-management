/**
 * Auth Service
 */
import * as bcrypt from 'bcryptjs';
import { Repository, getManager } from 'typeorm';
import { UserEntity } from '../../users/entity/user';
import * as jwt from "jsonwebtoken";
import { JwtSecret, TokenPayload } from '../interface/jwt.config';
import { LoggerMiddleware } from '../../middleware/logger.middleware';


 export class AuthService{
    userRepository: Repository<UserEntity>;
    public logger = new LoggerMiddleware();

    constructor() {
        this.userRepository = getManager().getRepository(UserEntity);
    }

    public async createToken(user: UserEntity): Promise<any>  {
        const expires = 10 * 60; // an hour
        const tokenPayload: TokenPayload = {
          id: user.id, email: user.email, role: user.role
        };
        const token = jwt.sign(tokenPayload, JwtSecret.secret, {expiresIn: expires})
        return token;
    }
    

    public async comparePassword(inputPass: string, presentPass: string): Promise<any>{
      const compre = await  bcrypt.compare(inputPass, presentPass);
      if(compre){
          return compre;
      }else{
          return new Error('Failed to compare password');
      }
    }
 }