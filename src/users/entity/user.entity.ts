import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column()
  phone: number;

  @OneToMany(() => Address, (address) => address.user)
  addresses?: Address[];
}
