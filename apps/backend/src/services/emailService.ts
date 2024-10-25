import { AppDataSource } from "../db";
import { Email } from "../models/emailModel";
import { PaginationParams, PaginationResponse } from "../types/types";

export class EmailService {
  private emailRepository = AppDataSource.getRepository(Email);

  async createEmail(
    recipient: string,
    subject: string,
    body: string
  ): Promise<Email> {
    const user = this.emailRepository.create({
      recipient,
      subject,
      body,
    });

    return await this.emailRepository.save(user);
  }

  async getEmails({
    page = 0,
    perPage = 0,
    sort,
    direction,
  }: PaginationParams): Promise<PaginationResponse<Email[]>> {
    const [data, total] = await this.emailRepository.findAndCount({
      ...(!!sort && { order: { [sort]: direction } }),
      take: perPage,
      skip: page * perPage,
      relations: ["attachments"],
    });

    return {
      data,
      total,
      page,
      perPage,
    };
  }

  async getEmail(id: number): Promise<Email> {
    const mail = await this.emailRepository.findOne({ where: { id } });

    if (!mail) {
      throw new Error("Email not found");
    }

    return mail;
  }

  async deleteEmail(id: number): Promise<boolean> {
    const result = await this.emailRepository.delete(id);
    if (!result) throw new Error("Email was not found");
    return result.affected !== 0;
  }
}
