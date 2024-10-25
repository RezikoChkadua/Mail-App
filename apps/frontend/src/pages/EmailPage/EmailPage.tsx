import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Container } from "./EmailPage.styled";
import { EmailContent, EmailList } from "./components";

function EmailPage() {
  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          background: "#ffffff",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        }}
      >
        <Routes>
          <Route path="/" element={<EmailList />} />
          <Route path="/:id" element={<EmailContent />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default EmailPage;
