import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,   
} from "typeorm"

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
}
