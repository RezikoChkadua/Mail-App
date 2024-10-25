import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Attachment } from "./attachmentsModel";

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  recipient: string;

  @Column("text")
  subject: string;

  @Column("text")
  body: string;

  @OneToMany(() => Attachment, (attachment) => attachment.email, {
    cascade: true,
  })
  attachments: Attachment[];
}
