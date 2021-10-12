import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kind: string;

  @Column('text')
  reason: string;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  @Column({default: 0})
  status: boolean;

  @ManyToOne(type => User, user => user.requestSends)
  userSend: User;

  @ManyToOne(type => User, user => user.requestApproves)
  userApprove: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
