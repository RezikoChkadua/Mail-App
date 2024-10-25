import { MessageComposerFormState } from "components/MessageComposer/MessageComposer";

export const handleSendMailErrorMessage = (
  errors: Partial<Omit<MessageComposerFormState, "files">>
): string => {
  if (errors.recipient) {
    return errors.recipient;
  }
  if (errors.subject) {
    return errors.subject;
  }
  if (errors.body) {
    return errors.body;
  }

  return "";
};
