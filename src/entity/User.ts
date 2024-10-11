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
    fullName: string

    @Column({unique:true})
    Email: string

    @Column()
    password: string

    @Column()
    Dob: Date

    @OneToMany(()=> Todos, (todos)=>todos.user)
    todos: Todos[]
}
