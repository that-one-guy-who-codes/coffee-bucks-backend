import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  phone: number;
  @Column()
  line1: string;
  @Column()
  line2?: string;
  @Column()
  landmark?: string;
  @Column()
  city: string;
  @Column()
  state: string;
  @Column()
  country: string;
  @Column()
  pincode: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
