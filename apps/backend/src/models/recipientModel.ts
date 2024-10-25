import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Recipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  email: string;
}
