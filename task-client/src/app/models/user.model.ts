import { TaskEntity } from './task.model';
/**
 * UserEntity
 */

export interface UserEntity {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
  tasks: TaskEntity[];
}
