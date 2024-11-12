import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Post } from "./Post";

//TODO Crie a entidade de User
@Entity('user')
export class User{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    firstName!: string;

    @Column({ length: 100 })
    lastName!: string;

    @Column({ length: 100 })
    email!: string;

    //relationship 1:n => One user can be many posts
    @OneToMany(() => Post, (post) => post.userId)
    posts!: Post[];
    

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}   
