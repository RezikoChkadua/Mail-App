import { AppDataSource } from "../db";
import { Recipient } from "../models/recipientModel";
import { PaginationParams, PaginationResponse } from "../types/types";

export class RecipientService {
  private recipientRepository = AppDataSource.getRepository(Recipient);

  async createRecipient(email: string): Promise<Recipient> {
    const recipient = this.recipientRepository.create({
      email,
    });

    return await this.recipientRepository.save(recipient);
  }

  async getRecipients({
    page = 0,
    perPage = 0,
    sort,
    direction,
  }: PaginationParams): Promise<PaginationResponse<Recipient[]>> {
    const [data, total] = await this.recipientRepository.findAndCount({
      ...(!!sort && { order: { [sort]: direction } }),
      take: perPage,
      skip: page * perPage,
    });

    return {
      data,
      total,
      page,
      perPage,
    };
  }

  async getRecipient(id: number): Promise<Recipient> {
    const mail = await this.recipientRepository.findOne({ where: { id } });

    if (!mail) {
      throw new Error("Recipient not found");
    }

    return mail;
  }

  async deleteRecipient(id: number): Promise<boolean> {
    const result = await this.recipientRepository.delete(id);
    if (!result) throw new Error("Recipient was not found");
    return result.affected !== 0;
  }
}
