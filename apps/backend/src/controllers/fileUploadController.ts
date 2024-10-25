import {
  S3Client,
  GetObjectCommand,
  PutObjectCommandOutput,
  GetObjectCommandInput,
} from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import { s3client } from "../config/multerConfig";
import { Readable } from "typeorm/platform/PlatformTools";

export class FileUploadController {
  uploadFile(req: Request, res: Response): void {
    if (!req?.file) {
      res.status(400).json({
        data: null,
        code: 400,
        message: "No file uploaded",
      });

      return;
    }

    const { filename, mimetype, size } = req.file;

    res.status(200).json({
      data: {
        filename,
        mimetype,
        size,
        url: `/uploads/${filename}`,
      },
      code: 200,
      message: "File uploaded successfully",
    });
  }

  uploadMultipleFiles(req: Request, res: Response): void {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      res.status(400).json({
        data: null,
        code: 400,
        message: "No files uploaded",
      });
    }

    res.status(200).json({
      data: null,
      code: 200,
      message: "Files uploaded successfully",
    });
  }

  async downloadFile(req: Request, res: Response): Promise<void> {
    const { file } = req.params;

    const input: GetObjectCommandInput = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${decodeURI(file)}`,
    };

    const command = new GetObjectCommand(input);
    const response = await s3client.send(command);

    const bodyStream = response.Body as Readable | null;

    if (bodyStream) {
      bodyStream.pipe(res);
    }
  }
}
