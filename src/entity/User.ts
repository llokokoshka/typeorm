import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,   
    OneToMany,
    JoinColumn, 
} from "typeorm"

import { Todos } from "./Todos" 

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

    @Column()
    password: string

    @OneToMany(()=> Todos, (todos)=>todos.user)
    todos: Todos[]
}
