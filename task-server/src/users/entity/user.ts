/**
 * User Entity
 */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm";
import { UserRole } from "./role";
import * as bcrypt from "bcryptjs";
import { TasksEntity } from "../../tasks/entity/task";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    firstName: string;

    @Column({ type: "varchar", nullable: false })
    lastName: string;

    @Column({ type: "varchar", nullable: false, unique: true })
    email: string;

    @Column({ type: "varchar", nullable: false })
    password: string;

    @Column({ type: "varchar", default: UserRole.NORMAL })
    role: UserRole;

    @Column({ type: "boolean", nullable: false, default: true })
    isActive: boolean;

    @Column({ type: "boolean", nullable: false, default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @OneToMany(() => TasksEntity, (task: TasksEntity) => task.user, {
        eager: true,
        cascade: true,
    })
    tasks: TasksEntity[];

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        role: UserRole,
        isActive: boolean,
        isDeleted: boolean,
        createdAt: Date,
        updatedAt: Date,
        tasks: TasksEntity[]
    ) {
        (this.id = id),
            (this.firstName = firstName),
            (this.lastName = lastName),
            (this.email = email),
            (this.password = password),
            (this.role = role),
            (this.isActive = isActive),
            (this.isDeleted = isDeleted),
            (this.createdAt = createdAt),
            (this.updatedAt = updatedAt),
            (this.tasks = tasks);
    }
}
