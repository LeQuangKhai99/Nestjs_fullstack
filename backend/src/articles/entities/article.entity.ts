import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isPublish: boolean;

  @ManyToOne(type => User, user => user.articles)
  user: User;
}
