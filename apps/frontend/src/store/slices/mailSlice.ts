import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MessageComposerFormState } from 'components/MessageComposer/MessageComposer';
import { MailState } from 'store/types';
import { Axios } from 'utils/Api';
import { PaginationParams } from 'utils/types';

const initialState: MailState = {
  mails: null,
  mail: null,
  loading: false,
  error: null,
};

export const uploadAttachments = createAsyncThunk(
  'upload-attachments',
  async (
    { id, attachments }: { id: string; attachments: File[] },
    { dispatch }
  ) => {
    const formData = new FormData();

    Array.from(attachments).forEach((file: File) => {
      formData.append(`files`, file);
    });

    await Axios.post(`/upload-attachments/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch(fetchMails({}));
  }
);

export const fetchMails = createAsyncThunk(
  'fetch-mails',
  async ({ page = 0, perPage = 0, sort, direction }: PaginationParams) => {
    const response = await Axios.get('/emails', {
      params: { page, perPage, sort, direction },
    });
    return response.data;
  }
);

export const fetchMail = createAsyncThunk('fetch-mail', async (id: string) => {
  const response = await Axios.get(`/emails/${id}`);
  return response.data;
});

export const createMail = createAsyncThunk(
  'create-mail',
  async ({ files, ...restData }: MessageComposerFormState, { dispatch }) => {
    const response = await Axios.post('/emails', restData);
    if (!files.length) {
      dispatch(fetchMails({}));
      return;
    }
    dispatch(uploadAttachments({ id: response?.data?.id, attachments: files }));
    return response.data;
  }
);

export const deleteMail = createAsyncThunk(
  'delete-mail',
  async (id: number, { dispatch }) => {
    await Axios.delete(`/emails/${id}`);
    dispatch(fetchMails({}));
  }
);

const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMails.fulfilled, (state, action) => {
        state.loading = false;
        state.mails = action.payload;
      })
      .addCase(fetchMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch mails';
      })
      .addCase(fetchMail.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMail.fulfilled, (state, action) => {
        state.loading = false;
        state.mail = action.payload;
      })
      .addCase(fetchMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch mail';
      })
      .addCase(createMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create mail';
      })
      .addCase(deleteMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete mail';
      });
  },
});

export default mailSlice.reducer;
