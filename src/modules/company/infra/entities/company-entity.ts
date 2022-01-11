import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { UserEntity } from '../../../accounts/infra/entities/user.entity';
import { UserTokensEntity } from '../../../auth/infra/entities/user-token-entity';

@Entity({ name: 'company' })
export class CompanyEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => UserTokensEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  social_reason: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;

  @Column()
  site: string;

  @Column()
  phone: string;

  @Column()
  secundary_phone: string;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  state: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  openedAt: Date;

  @Column()
  number_of_employees: number;

  @Column()
  logo: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
