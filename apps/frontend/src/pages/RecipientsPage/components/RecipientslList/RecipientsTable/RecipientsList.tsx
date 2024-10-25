import Box from "@mui/material/Box";
import RecipientsTable from "./RecipientsTable";
import ReceptionsTableHeader from "../ReceptionsTableHeader";
import { useState } from "react";
import CreateRecipientModal from "../CreateRecipientModal/CreateRecipientModal";

export default function RecipientList() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "0px",
      }}
    >
      <ReceptionsTableHeader onModalOpen={() => setOpen(true)} />
      <RecipientsTable />
      <CreateRecipientModal isOpen={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
