
/**
 * Task Service
 */
import {
    getManager,
    Repository,
    UpdateResult,
} from "typeorm";
import { TasksEntity } from "../entity/task";
import { CreateTaskDto } from "../dto/task.dto";
import { UserEntity } from '../../users/entity/user';
import { LoggerMiddleware } from '../../middleware/logger.middleware';

export class TaskService {
    taskRepository: Repository<TasksEntity>;
    public logger = new LoggerMiddleware();

    constructor() {
        this.taskRepository = getManager().getRepository(TasksEntity);
    }

    public async createTask(taskDto: CreateTaskDto,
         userEntity: UserEntity): Promise<any> {
        const task = await this.taskRepository.findOne({
            where: {name: taskDto.name},
        });
        if (task) {
            throw new Error("The Task arleady exist");
        }
        const tasks = this.taskRepository.create({
            ...taskDto, user: userEntity
        });
        const TaskRes = await this.taskRepository.save(tasks);
        try {
            return TaskRes;
        } catch (except) {
            throw new Error("Task Register Error");
        }
    }

    public async getAllTasks(): Promise<TasksEntity[]> {
        const tasks: TasksEntity[] = await this.taskRepository.find({
            where: { isActive: true, isDeleted: false },
            relations: ['user']
        });
        this.logger.loggerMiddleware.info(tasks);
        if (!tasks) {
            throw new Error("The No Tasks Found");
        }
        try {
            return tasks;
        } catch (except) {
            throw new Error("Task Register Error");
        }
    }

    async findTaskByTitle(name: string): Promise<TasksEntity[]> {
        return this.taskRepository.find(
            {where: {name: name}, relations: ['user']});
    }

    async findTaskById(id: number): Promise<TasksEntity | any> {
        return this.taskRepository.findOne(id, {relations: ['user']});
    }

    async updateTask(id: number, 
        tasksEntity: TasksEntity): Promise<UpdateResult> {
        return await this.taskRepository.update(id, tasksEntity);
    }

    async deleteTaskById(id: number): Promise<any> {
        this.taskRepository.delete(id);
    }
}
