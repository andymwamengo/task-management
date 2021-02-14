/**
 * User Entity
 */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { UserEntity } from "../../users/entity/user";

@Entity('tasks')
export class TasksEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false, unique: true })
    name: string;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({ type: "boolean", nullable: false, default: true })
    isActive: boolean;

    @Column({ type: "boolean", nullable: false, default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.tasks)
    user: UserEntity;

    constructor(
        id: number,
        name: string,
        description: string,
        isActive: boolean,
        isDeleted: boolean,
        createdAt: Date,
        updatedAt: Date,
        user: UserEntity
    ) {
        (this.id = id),
            (this.name = name),
            (this.description = description),
            (this.isActive = isActive),
            (this.isDeleted = isDeleted),
            (this.createdAt = createdAt),
            (this.updatedAt = updatedAt),
            (this.user = user);
    }
}
