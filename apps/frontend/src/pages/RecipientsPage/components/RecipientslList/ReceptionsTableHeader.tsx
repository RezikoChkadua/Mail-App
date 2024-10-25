import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

interface TableHeaderProps {
  onModalOpen(): void;
}

function RecipientsList({ onModalOpen }: TableHeaderProps) {
  return (
    <Box
      width="100%"
      display="flex"
      padding="15px 30px"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Button
        sx={{
          width: "190px",
          height: "55px",
          background: "#5d72cc",
          color: "#fff",
        }}
        onClick={onModalOpen}
      >
        <AddIcon />
        Add Recipient
      </Button>
    </Box>
  );
}

export default RecipientsList;
