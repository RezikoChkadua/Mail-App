import { MessageComposerFormState } from "components/MessageComposer/MessageComposer";
import { Email, Recipient } from "store/types";

export const sendMailValidation = (values: MessageComposerFormState) => {
  const errors: Email | Record<string, string> = {};

  if (!values.recipient) {
    errors.recipient = "Recipient is required";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(values?.recipient)) {
    errors.recipient = "Invalid email address";
  } else if (!values.subject) {
    errors.subject = "Subject is required";
  } else if (!values.body) {
    errors.body = "Body is required";
  }

  return errors;
};

export const createRecipientValidation = (values: Omit<Recipient, "id">) => {
  const errors: Recipient | Record<string, string> = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(values?.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};
