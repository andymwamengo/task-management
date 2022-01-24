/**
 * Users Controller
 */

import { UserEntity } from "../entity/user";
import { CreateUserDto } from "../dto/user.dto";
import { UsersService } from "../services/user.service";
import { Router, Request, Response, NextFunction } from "express";
import { AuthMiddleware } from '../../middleware/auth.middleware';

export class UserController {
    public path = "/users";
    public router = Router();
    public usersService = new UsersService();
    public authMiddleware = new AuthMiddleware();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
      this.router.get(`${this.path}/results`,  this.usersFind);
      this.router.get(`${this.path}/find/:id`, this.userById);
      this.router.patch(`${this.path}/update/:id`,
       this.authMiddleware.authUsers, this.userUpdate);
      this.router.delete(`${this.path}/delete/:id`
      , this.authMiddleware.authUsers, this.userDelete);
    }

  private usersFind = async (_request: Request,
    response: Response, _next: NextFunction) => {
    const users: UserEntity[] = await this.usersService.getAllUsers();
    response.status(200).send(users);
  };


  private userById = async (request: Request,
     response: Response, next: NextFunction) => {
    const id = request.params.id;
    const users: UserEntity | undefined = await this.usersService.getUserById(id);
    if (users) {
      response.status(200).send(users);
    } else {
      next(new Error('Error while updating user'));
    }
  }


  private userUpdate = async (request: Request,
     response: Response, next: NextFunction) => {
    const id: number = +request.params.id;
    const userData: CreateUserDto = request.body;
    const user = await this.usersService.updateUser(id, userData,);
    if (user) {
      response.status(200).send(user);
    } else {
      next(new Error('Error Occured while updating user'));
    }
  }


  private userDelete = async (request: Request,
     response: Response, next: NextFunction) => {
    const id: number = +request.params.id;
    const successResponse = await this.usersService.deleteUserById(id);
    if (successResponse) {
      response.status(200).send('User deleted successfully');
    } else {
      next(new Error('Failed to delete user'));
    }
  }
}
