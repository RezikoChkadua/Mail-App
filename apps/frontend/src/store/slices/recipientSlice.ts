import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateRecepientForm } from "pages/RecipientsPage/components/RecipientslList/CreateRecipientModal/CreateRecipientModal";
import { RecipientState } from "store/types";
import { Axios } from "utils/Api";
import { PaginationParams } from "utils/types";

const initialState: RecipientState = {
  recipients: null,
  recipient: null,
  loading: false,
  error: null,
};

export const fetchRecipients = createAsyncThunk(
  "fetch-recipients",
  async ({ page = 0, perPage = 0, sort, direction }: PaginationParams) => {
    const response = await Axios.get("/recipients", {
      params: { page, perPage, sort, direction },
    });
    return response.data;
  }
);

export const fetchRecipient = createAsyncThunk(
  "fetch-recipient",
  async (id: string) => {
    const response = await Axios.get(`/recipients/${id}`);
    return response.data;
  }
);

export const createRecipient = createAsyncThunk(
  "create-recipient",
  async (data: CreateRecepientForm, { dispatch }) => {
    await Axios.post("/recipients", data);

    dispatch(fetchRecipients({}));
  }
);

export const deleteRecipient = createAsyncThunk(
  "delete-recipient",
  async (id: number, { dispatch }) => {
    await Axios.delete(`/recipients/${id}`);
    dispatch(fetchRecipients({}));
  }
);

const recepientSlice = createSlice({
  name: "recipient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipients.fulfilled, (state, action) => {
        state.loading = false;
        state.recipients = action.payload;
      })
      .addCase(fetchRecipients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recipients";
      })
      .addCase(fetchRecipient.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRecipient.fulfilled, (state, action) => {
        state.loading = false;
        state.recipient = action.payload;
      })
      .addCase(fetchRecipient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recepient";
      })
      .addCase(createRecipient.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createRecipient.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createRecipient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create recepient";
      })
      .addCase(deleteRecipient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecipient.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteRecipient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete recepient";
      });
  },
});

export default recepientSlice.reducer;
