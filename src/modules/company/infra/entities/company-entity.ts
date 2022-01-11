import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity({ name: 'company' })
export class CompanyEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  socialReason: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;

  @Column()
  site: string;

  @Column()
  phone: string;

  @Column()
  secundaryPhone: string;

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
  numberOfEmployees: number;

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
