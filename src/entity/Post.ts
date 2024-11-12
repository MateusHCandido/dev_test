import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post
@Entity('post')
export class Post{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    title!: string;

    @Column({ length: 100 })
    description!: string;

    //relationship n:1 => the post can be only one user
    @ManyToOne(() => User, (user) => user.posts, { nullable: false, onDelete: "CASCADE" })
    userId!: number;
}
