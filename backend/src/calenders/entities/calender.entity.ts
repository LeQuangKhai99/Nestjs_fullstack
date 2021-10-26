import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Calender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: null})
  checkinAt: Date;

  @Column({default: null})
  checkoutAt: Date;

  @Column()
  year: number;

  @Column()
  month: number;

  @Column()
  day: number;

  @ManyToOne(type => User, user => user.calenders)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
