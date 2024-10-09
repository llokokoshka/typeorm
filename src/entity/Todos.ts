import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Todos {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    value: string

    @ManyToOne(() => User, (user) => user.todos)
    user: User
}
