import { Button, Paper, Typography } from '@mui/material';
import { BodyContent, Container, Form } from './MessageComposer.styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { AutoComplete, Input } from 'components';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { sendMailValidation } from 'utils/validations';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import { createMail } from 'store/slices/mailSlice';
import { fetchRecipients } from 'store/slices/recipientSlice';
import { handleSendMailErrorMessage } from 'utils/utils';

interface MessageComposerProps {
  isOpen: boolean;
  onClose(): void;
}

export interface MessageComposerFormState {
  recipient: string;
  subject: string;
  body: string;
  files: File[];
}

function MessageComposer({ isOpen, onClose }: MessageComposerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const bodyRef = useRef<HTMLDivElement>(null);

  const { recipients } = useSelector((state: RootState) => state.recepient);

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const formik = useFormik<MessageComposerFormState>({
    initialValues: {
      recipient: '',
      subject: '',
      body: '',
      files: [],
    },
    onSubmit: async (values, { resetForm }) => {
      dispatch(createMail(values));
      onClose();
      setIsSnackbarOpen(true);
      setSnackbarMessage('Email has been successfully sent');
      resetForm();

      if (bodyRef?.current) {
        bodyRef.current.innerText = '';
      }
    },

    validate: sendMailValidation,
  });

  useEffect(() => {
    dispatch(fetchRecipients({}));
  }, []);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  useEffect(() => {
    setIsSnackbarOpen(true);
    setSnackbarMessage(handleSendMailErrorMessage(formik.errors));
  }, [formik.errors]);

  return (
    <Container isOpen={isOpen}>
      <Paper
        sx={{
          width: 600,
          height: 620,
          display: 'flex',
          flexDirection: 'column',
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        }}
        elevation={3}
      >
        <Form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              width: '100%',
              height: '50px',
              padding: '0px 10px',
              backgroundColor: '#f2f2f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography fontSize={'13px'} fontWeight="bold">
              New Message
            </Typography>
            <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
              <CloseIcon />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            padding="0px 10px"
            gap="10px"
            height="100%"
          >
            <AutoComplete
              id="recipient"
              name="recipient"
              options={recipients?.data?.map((i) => i?.email) ?? []}
              onChange={(val: string) => formik.setFieldValue('recipient', val)}
              value={formik.values.recipient}
            />

            <Input
              id="subject"
              name="subject"
              placeholder="Subject"
              onChange={formik.handleChange}
              value={formik.values.subject}
            />

            <Box height="100%">
              <BodyContent
                id="body"
                ref={bodyRef}
                contentEditable
                placeholder="Body"
                onInput={(e: React.FormEvent<HTMLDivElement>) => {
                  formik.setFieldValue('body', e?.currentTarget?.innerText);
                }}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            padding="30px 15px"
            justifyContent="space-between"
          >
            <Button variant="contained" type="submit">
              Send
            </Button>

            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload attachments
              <VisuallyHiddenInput
                id="file"
                name="file"
                type="file"
                multiple
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e?.currentTarget?.files) {
                    formik.setFieldValue('files', e?.currentTarget?.files);
                  }
                }}
              />
            </Button>
          </Box>
        </Form>
      </Paper>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default MessageComposer;
