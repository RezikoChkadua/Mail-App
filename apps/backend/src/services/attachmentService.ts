import { AppDataSource } from "../db";
import { Attachment } from "../models/attachmentsModel";

export class AttachmentService {
  private attachmentRepository = AppDataSource.getRepository(Attachment);

  async create(data: Attachment[]): Promise<Attachment | Attachment[]> {
    const attachment = this.attachmentRepository.create(data);
    return await this.attachmentRepository.save(attachment);
  }
}
