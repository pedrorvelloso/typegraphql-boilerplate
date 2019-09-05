import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import bcryptjs from 'bcryptjs';

@ObjectType('UserNode')
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName?: string;

  @Column()
  password: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  private hashPassword() {
    if (this.password) {
      this.password = bcryptjs.hashSync(this.password);
    }
  }
}
