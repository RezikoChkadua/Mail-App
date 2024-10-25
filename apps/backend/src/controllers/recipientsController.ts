import { Request, Response } from "express";
import { RecipientService } from "../services/recipientsService";

const recipientService = new RecipientService();

export class RecipientsController {
  async createRecipient(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const recipient = await recipientService.createRecipient(email);
    res.status(201).json(recipient);
  }

  async getRecipients(req: Request, res: Response): Promise<void> {
    const { query } = req;
    const recipient = await recipientService.getRecipients(query);
    res.status(200).json(recipient);
  }

  async getRecipient(req: Request, res: Response): Promise<void> {
    const { params } = req;
    const recipient = await recipientService.getRecipient(Number(params?.id));
    res.status(200).json(recipient);
  }

  async deleteRecipient(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const success = await recipientService.deleteRecipient(id);
      if (!success) {
        res.status(404).json({ message: "Recipient not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete recipient", error });
    }
  }
}
