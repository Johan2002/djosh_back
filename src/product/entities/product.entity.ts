import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;
  @Column({type: 'varchar', nullable: false })
  Nombre: string;
  @Column({type: 'float', nullable: false })
  Precio: number;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

}
