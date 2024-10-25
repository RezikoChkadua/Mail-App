import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { createRecipientValidation } from "utils/validations";
import { Input } from "components";
import { Button, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import { createRecipient } from "store/slices/recipientSlice";
import { useState } from "react";
import { Form } from "./CreateRecipientModal.styled";

export interface CreateRecepientForm {
  email: string;
}

interface Props {
  isOpen: boolean;
  onClose(): void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateRecipientModal({ isOpen, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const formik = useFormik<CreateRecepientForm>({
    initialValues: {
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(createRecipient(values));
      onClose();
      setIsSnackbarOpen(true);
      setSnackbarMessage("Recipient has been successfully created");
      resetForm();
    },
    validate: createRecipientValidation,
  });

  return (
    <div>
      <Modal open={isOpen} onClose={onClose} aria-labelledby="recipient-modal">
        <Box sx={style}>
          <Typography id="recipient-modal-title" variant="h6" component="h2">
            Create Recipient
          </Typography>
          <Form onSubmit={formik.handleSubmit}>
            <Input
              fullWidth
              autoFocus
              id="email"
              name="email"
              placeholder="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              errorMessage={formik.errors.email}
            />
            <Box
              marginTop={"40px"}
              display="flex"
              justifyContent="center"
              gap="20px"
            >
              <Button variant="contained" color="success" type="submit">
                Create
              </Button>
              <Button variant="contained" color="error" onClick={onClose}>
                Close
              </Button>
            </Box>
          </Form>
        </Box>
      </Modal>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
}
