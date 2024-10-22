import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MessageDTO } from '../types/Messages/Message';
import { sendMessage as PostMessage, sendFile as PostFile, addWathcerToStatusService } from '../services/apis/userService';

export const sendMessage = createAsyncThunk(
  'Message/sendMessage',
  async (Message: MessageDTO, { rejectWithValue }) => {
    try {
      await PostMessage(Message);
      return Message;
    } catch (error) {
      return rejectWithValue('Message sending failed');
    }
  }
);
export const sendFile = createAsyncThunk(
  'Message/sendFile',
  async ({ file, Message }: { file: File; Message: MessageDTO }, { rejectWithValue }) => {
    try {
      var form = new FormData();
      form.append('file', file);
      form.append('Message', JSON.stringify(Message));
      await PostFile(form);
      return Message;
    } catch (error) {
      return rejectWithValue('Message sending failed');
    }
  }
);

export const sendAudioMessage = createAsyncThunk(
  'Message/sendAudioMessage',
  async ({ audioBlob, Message }: { audioBlob: Blob; Message: MessageDTO }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const file = new File([audioBlob], 'voice-message.wav', { type: 'audio/wav' });
      formData.append('file', file);
      formData.append('message', JSON.stringify(Message));
      await PostFile(formData);
      return Message;
    } catch (error) {
      return rejectWithValue('Message sending failed');
    }
  }
);

export const addWathcerToStatus = createAsyncThunk(
  'Message/addWathcerToStatus',
  async ({ statusId, userId }: { statusId?: number, userId: number }, { rejectWithValue }) => {
    try {
      const response = await addWathcerToStatusService(statusId!, userId);
      return response;
    } catch (error) {
      return rejectWithValue('Message sending failed');
    }
  }
);


const MessageSlice = createSlice({
  name: 'Message',
  initialState: {
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});




export default MessageSlice.reducer;
