import { UserEntity } from './user.model';
/**
 * TaskEntity
 */

export interface TaskEntity {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: UserEntity;
}
