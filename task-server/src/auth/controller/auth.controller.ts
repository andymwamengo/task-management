/**
 * Auth Controller
 */
import { Router, Request, Response, NextFunction } from "express";
import { CreateUserDto } from "../../users/dto/user.dto";
import { UsersService } from "../../users/services/user.service";
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { CreateAccountException, EmailNotFoundException,
   InvalidPassowrdException } from '../../middleware/error.middleware';
import { RoleMiddleware } from '../../middleware/role.middleware';

 export class AuthControlller{
    public path = '/auth';
    public router = Router();
    public usersService = new UsersService();
    public authService = new AuthService();
    public roleMiddleware = new RoleMiddleware();
    public authMiddleware = new AuthMiddleware();

  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.post(`${this.path}/register`, this.userCreate);
      this.router.post(`${this.path}/login`, this.userLogin);
      this.router.get(`${this.path}/status`,
       this.authMiddleware.authUsers,  this.authStatus);
      this.router.get(`${this.path}/admin`, this.authMiddleware.authUsers,
      this.roleMiddleware.roleAuthorization,  this.authStatus);
    }

    private userCreate = async (request: Request,
      response: Response, next: NextFunction) => {
      const userData: CreateUserDto = request.body;
      try {
          const user = await this.usersService.createUser(userData);
          if(user){
            response.status(200).send(
              'The user registered successfully');
          }
      } catch (error) {
          next(new CreateAccountException());
      }
    };
    

    private userLogin = async (request: Request,
      response: Response, next: NextFunction) => {
      const logInDto: LoginDto = request.body;
      const user = await this.usersService.getUsersByEmail(logInDto.email);
      if (user) {
        const passMatch = await this.authService.comparePassword(
          logInDto.password, user.password);
        if (passMatch) {
          const userToken = await this.authService.createToken(user);
          response.status(200).send({token: userToken});
        } else {
          next(new InvalidPassowrdException());
        }
      } else {
        next(new EmailNotFoundException());
      }
    }

    private authStatus = async ( req: any, res: Response) =>{
        const user = await req.user;
        res.status(200).send(user);
      }

      private authRoleCheck = async ( req: any, res: Response) =>{
        const user = await req.user;
        res.status(200).send(user);
      }
  
}

