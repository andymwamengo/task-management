/**
 * Users Services
 */
import { UserEntity } from "../entity/user";
import { LoggerMiddleware } from "../../middleware/logger.middleware";
import { DeleteResult, getManager, Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "../dto/user.dto";
import { UserNotFoundException } from '../../middleware/error.middleware';

export class UsersService {
    userRepository: Repository<UserEntity>;
    public logger = new LoggerMiddleware();

    constructor() {
        this.userRepository = getManager().getRepository(UserEntity);
    }

    /** Inserts a new User into the database. */
    async createUser(userDto: CreateUserDto): Promise<CreateUserDto> {
        this.logger.loggerMiddleware.info("Create a new user", userDto);
        const user = await this.getUsersByEmail(userDto.email);
        if(user){
            throw new Error('The User With Email Arleady Exist');
        }else{
            const newUser = this.userRepository.create(userDto);
            return await this.userRepository.save(newUser);
        }
    }

    /** Returns array of all users from db */
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find(
            {where: {isActive: true, isDeleted: false}});
    }

    /** Returns a user by given id */
    async getUserById(id: string | number): Promise<UserEntity | undefined> {
        this.logger.loggerMiddleware.info("Fetching user by id: ", id);
        if (id) {
            return await this.userRepository.findOne(id);
        }
        return Promise.reject(false);
    }

    /** Returns a user by email */
    public async getUsersByEmail(email: string): Promise<UserEntity | undefined> {
        return await this.userRepository.findOne({
            where: {isActive: true, isDeleted: false, email: email},
        });
    }

    /** Returns a user by email */
    async getUserByEmail(email: string): Promise<UserEntity | undefined> {
        const users = await this.userRepository.findOne({
            where: {isActive: true, isDeleted: false, email: email},
        });
        if (!users) {
            throw new Error('The user does not exist');
        } else {
            return users; 
        }
    }

    /** Updates a user */
    async updateUser(id: number, user: CreateUserDto): Promise<UpdateResult> {
        try {
            const updatedUser = await this.userRepository.update(id, user);
            return updatedUser;
        } catch (error) {
            throw new UserNotFoundException();
        }
    }

    /** delete user by id */
    async deleteUserById(id: number): Promise<DeleteResult> {
       const user = await this.userRepository.delete(id);
       return user;
    }
}