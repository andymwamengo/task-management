/**
 * Task Controller
 */

import { Router, NextFunction, Response } from 'express';
import { TaskService } from '../services/task.service';
import { TasksEntity } from '../entity/task';
import { CreateTaskDto } from "../dto/task.dto";
import { HttpException } from '../../middleware/error.middleware';
import { AuthMiddleware } from '../../middleware/auth.middleware';

export class TaskController {
    public path = '/tasks';
    public router = Router();
     public taskService = new TaskService();
     public authMiddleware = new AuthMiddleware();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.get(`${this.path}/results`, this.taskFind);
      this.router.get(`${this.path}/find/:id`, this.taskById);
      this.router.post(`${this.path}/create`, this.authMiddleware.authUsers,  this.tasksCreate);
      this.router.patch(`${this.path}/update/:id`, this.authMiddleware.authUsers, this.taskUpdate);
      this.router.delete(`${this.path}/delete/:id`, this.authMiddleware.authUsers, this.taskDelete);
    }

    private tasksCreate = async ( req: any,
      res: Response, next: NextFunction) => {
        console.log(res.header, req.user);
        const taskDto: CreateTaskDto = req.body;
        try {
          const user = await this.taskService.createTask(taskDto, req.user);
          res.status(200).send(user);
        } catch (error) {
          next(error);
        }
      }
    
    private taskFind = async ( req: any,
      res: Response, next: NextFunction) => {
        console.log(req.hostname, next.name);
       const task: TasksEntity[] = await this.taskService.getAllTasks();
       res.status(200).send(task)
      }


      private taskById = async ( req: any,
      res: Response, next: NextFunction) => {
      const id = +req.params.id;
      const task: TasksEntity = await this.taskService.findTaskById(id);
      if (task) {
        res.status(200).send(task);
      } else {
        next(new Error('Error while updating user'));
      }
    }


    private taskUpdate = async ( req: any, res: Response) => {
      const id: number = +req.params.id;
      console.log(id)
      const taskDto: TasksEntity = req.body;
      const task = await this.taskService.findTaskById(taskDto.id);
      console.log(task)
      if(!req.user.email === task.user.email){
        throw new HttpException(401, 'Your are not authorized');
      }
      const user = await this.taskService.updateTask(id, task,);
      if (user) {
        res.status(200).send(user);
      } else {
        throw new HttpException(400, 'Error Occured while updating task');
      }
    }


    private taskDelete = async ( req: any,
      res: Response, next: NextFunction) => {
      const id: number = +req.params.id;
      const taskUser = await this.taskService.findTaskById(id);
      if(!req.user.email === taskUser.user.email){
        throw new HttpException(401, 'Your are not authorized');
      }
      const task = await this.taskService.deleteTaskById(id);
      if (task) {
        res.status(200).send('Task deleted successfully');
      } else {
        next(new Error('Failed to delete user'));
      }
    }
  
}
