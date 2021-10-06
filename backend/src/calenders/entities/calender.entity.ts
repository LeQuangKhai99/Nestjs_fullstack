import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Calender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checkinAt: Date;

  @Column()
  checkoutAt: Date;

  @Column()
  year: number;

  @Column()
  mounth: number;

  @Column()
  day: number;

  @ManyToOne(type => User, user => user.calenders)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
