import { Request, Response } from "express";
import { AttachmentService } from "../services/attachmentService";
import { MulterFile } from "../types/types";

const attachmentsService = new AttachmentService();

export class AttachmentController {
  async create(req: Request, res: Response): Promise<void> {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      res.status(400).json({
        data: null,
        code: 400,
        message: "No files uploaded",
      });
    }

    if (!req?.params?.id) {
      throw new Error("Id is required");
    }

    const id = req?.params?.id;

    const uploadedFiles = (req.files as [Express.Multer.File & MulterFile]).map(
      ({ key, originalname, mimetype, size }) => ({
        email: id,
        filename: key,
        original_name: originalname,
        mimetype,
        size,
      })
    );

    await attachmentsService.create(uploadedFiles);

    res.status(200).json({
      data: null,
      code: 200,
      message: "Files uploaded successfully",
    });
  }
}
