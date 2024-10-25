import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Email } from "./emailModel";

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  filename: string;

  @Column()
  original_name: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;

  @ManyToOne(() => Email, (email) => email.attachments)
  email: string;
}
