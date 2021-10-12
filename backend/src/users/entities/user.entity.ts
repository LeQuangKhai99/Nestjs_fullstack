import { Article } from "../../articles/entities/article.entity";
import { Calender } from "../../calenders/entities/calender.entity";
import { Department } from "../../departments/entities/department.entity";
import { Request } from "../../requests/entities/request.entity";
import { Role } from "../../roles/entities/role.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({default: null})
  avatar: string;

  @Column({default: false})
  active: boolean;

  @Column({default: null})
  token: string;

  @Column({default: null})
  tokenExpired: Date;

  @Column({default: null})
  address: string;

  @Column({default: 0})
  gender: boolean;

  @Column({default: null})
  joinCompanyAt: Date;

  @Column({default: null})
  macAddress: string;

  @Column({default: null})
  dateOfBirth: Date;

  @Column({type: 'json'})
  constract: string;

  @Column({type: 'json'})
  device: string;

  @ManyToOne(type => Role, role => role.users)
  role: Role;

  @ManyToOne(type => Department, department => department.users)
  department: Department;

  @OneToMany(type => Calender, calender => calender.user)
  calenders: Calender[];

  @OneToMany(type => Request, request => request.userSend)
  requestSends: Request;

  @OneToMany(type => Request, request => request.userApprove)
  requestApproves: Request;

  @OneToMany(type => Article, article => article.id)
  articles: Article[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
