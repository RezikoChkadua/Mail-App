import { PaginationResponse } from "utils/types";

export interface Attachments {
  id: number;
  filename: string;
  original_name: string;
  size: number;
}

export interface Email {
  id: 103;
  attachments: Attachments[];
  body: string;
  recipient: string;
  subject: string;
}

export interface MailState {
  mails: PaginationResponse<Email[]> | null;
  mail: Email | null;
  loading: boolean;
  error: string | null;
}

export interface Recipient {
  id: number;
  email: string;
}

export interface RecipientState {
  id?: string;
  recipients: PaginationResponse<Recipient[]> | null;
  recipient: Recipient | null;
  loading: boolean;
  error: string | null;
}

export type Order = "asc" | "desc";
