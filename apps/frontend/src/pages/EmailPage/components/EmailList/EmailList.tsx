import Box from "@mui/material/Box";
import EmailTable from "./EmailTable/EmailTable";
import { useState } from "react";
import { MessageComposer } from "components";
import TableHeader from "./EmailListHeader";

export default function EmailList() {
  const [isComposerOpen, setIsComposerOpen] = useState<boolean>(false);

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
      <TableHeader toggleIsOpen={() => setIsComposerOpen(!isComposerOpen)} />
      <EmailTable />

      <MessageComposer
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
        }}
      />
    </Box>
  );
}
