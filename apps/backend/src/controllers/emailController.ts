import { Request, Response } from "express";
import { EmailService } from "../services/emailService";

const mailService = new EmailService();

export class EmailController {
  async createEmail(req: Request, res: Response): Promise<void> {
    const { recipient, subject, body } = req.body;
    const email = await mailService.createEmail(recipient, subject, body);
    res.status(201).json(email);
  }

  async getEmails(req: Request, res: Response): Promise<void> {
    const { query } = req;

    const email = await mailService.getEmails(query);
    res.status(200).json(email);
  }

  async getEmail(req: Request, res: Response): Promise<void> {
    const { params } = req;

    const email = await mailService.getEmail(Number(params?.id));
    res.status(200).json(email);
  }

  async deleteEmail(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const success = await mailService.deleteEmail(id);
      if (!success) {
        res.status(404).json({ message: "Email not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete email", error });
    }
  }
}
