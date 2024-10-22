import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getAllUsers as fetchAllUsers,
  getCurrentlyUser as fetchCurrentlyUser,
  changeMessageState as postMessageState, changeUserImage,
  addContact as addContactService,
  deleteContact as deleteContactService,
  sendStatus,
  deleteStatusService,
  deleteMessageService
}
  from '../services/apis/userService';
import { User } from '../types/Users/user';
import { MessageDTO } from '../types/Messages/Message';
import { CurrentlyUser } from '../types/Users/CurrentlyUser';
import { MessageState } from '../enums/Messages/MessageState';
import { Status } from '../types/Statuses/Status';

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsers();
      if (response.success) {
        return response.resultObj as User[];
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeMessageState = createAsyncThunk(
  'users/changeMessageState',
  async (userId: number, { rejectWithValue }) => {
    try {
      console.log("userid "+userId)
      if (userId == 0)
        return rejectWithValue("user id is 0");
      const response = await postMessageState(userId);
      if (response.success) {
        return response.message;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCurrentlyUser = createAsyncThunk(
  'users/getCurrentlyUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCurrentlyUser();
      if (response.success) {
        return response.resultObj as CurrentlyUser;
      } else {
        return rejectWithValue(response.Message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const userfileUpload = createAsyncThunk(
  'users/userfileUpload',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await changeUserImage(formData);
      if (response.success) {
        return response.resultObj as string;
      } else {
        return rejectWithValue(response.Message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userStatusUpload = createAsyncThunk(
  'Message/userStatusUpload',
  async ({ file, Status }: { file: File; Status: Status }, { rejectWithValue }) => {
    try {
      var form = new FormData();
      form.append('file', file);
      form.append('status', JSON.stringify(Status));
      await sendStatus(form);
      return Status;
    } catch (error) {
      return rejectWithValue('Message sending failed');
    }
  }
);


export const addContact = createAsyncThunk(
  'users/addContact',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await addContactService(email);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'users/deleteContact',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteContactService(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteStatus = createAsyncThunk(
  'users/deleteStatus',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteStatusService(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'users/deleteMessage',
  async ({ msgId, userId }: { msgId: number, userId: number }, { rejectWithValue }) => {
    try {
      const response = await deleteMessageService(msgId, userId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    friends: [] as User[],
    selectedUserId: 0,
    hasChanges: false,
    currentlyUser: {} as CurrentlyUser,
    focusedUserIds: [] as Number[],
    selectedFriend: {} as User,
    loading: false,
    searchedText: '',
    error: null as string | null
  },
  reducers: {
    setCurrentlyUserProfImage: (state, action: PayloadAction<string>) => {
      state.currentlyUser.profImageUrl = action.payload;
    },
    setSelectedUserId: (state, action: PayloadAction<number>) => {
      if (action.payload != 0) {
        state.selectedUserId = action.payload;
        const user = state.friends.find(friend => friend.id == action.payload.toString());
        if (user?.unreadMessageCount)
          user!.unreadMessageCount = 0;
      } else {
        state.selectedUserId = 0;
      }
    },
    setSearchedText: (state, action: PayloadAction<string>) => {
      state.searchedText = action.payload;
    },
    addMessageToSelectedUser: (state, action: PayloadAction<MessageDTO>) => {
      var user;
      if (action.payload.toUserId?.toString() == state.currentlyUser.id) {
        action.payload.isSender = !action.payload.isSender;
        action.payload.toUserId = state.selectedUserId;
        user = state.friends.find(friend => friend.id == action.payload.toUserId?.toString());
      } else {
        user = state.friends.find(friend => friend.id == action.payload.toUserId?.toString());
      }
      if (user) {

        if (action?.payload?.state != MessageState.SEEN && !action?.payload?.isSender)
          user.unreadMessageCount = user.unreadMessageCount + 1;
        user?.messages.push(action.payload);

      } else
        state.hasChanges = !state.hasChanges;
    },
    changeUserStateToOnline: (state, action: PayloadAction<string>) => {
      const user = state.friends.find(friend => friend.id == action.payload);
      if (user) {
        user.isOnline = true;
        // user.lastActivityDate = new Date().toLocaleTimeString()
        user.messages.forEach(m => {
          if (m.state == MessageState.SENT)
            m.state = MessageState.NOTIFIED
        })
      }
    },
    changeUserStateToOfline: (state, action: PayloadAction<string>) => {
      const user = state.friends.find(friend => friend.id == action.payload);
      if (user) {
        user.isOnline = false;
        user.lastActivityDate = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        state.focusedUserIds = state.focusedUserIds.filter(id => id != parseInt(action.payload));
      }
    },
    changedMessageState: (state, action: PayloadAction<string>) => {
      const user = state.friends.find(friend => friend.id == action.payload);
      console.log("first");
      console.log(JSON.stringify(user));
      if (user) {
        user?.messages.forEach(message => {
          if (message.isSender && message.state != MessageState.DELETED)
            message.state = MessageState.SEEN;
        });
        state.focusedUserIds.push(parseInt(action.payload));
      }

    },
    removeUserOnFocusedUsers: (state, action: PayloadAction<string>) => {
      state.focusedUserIds = state.focusedUserIds.filter(id => id != parseInt(action.payload));
    },
    addFriend: (state, action: PayloadAction<User>) => {
      if (action.payload)
        state.friends.push(action.payload);
    },
    deleteCurrentlyUserStatus: (state, action: PayloadAction<number>) => {
      if (action.payload && state.currentlyUser.statuses)
        state.currentlyUser.statuses = state.currentlyUser.statuses.filter(s => s.id != action.payload);
    },
    setSelectedFriend: (state, action: PayloadAction<User>) => {
      state.selectedFriend = { ...action.payload };
    },

    setHasChnages: (state) => {
      state.hasChanges = !state.hasChanges;
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    changeUserBiografy: (state, action: PayloadAction<string>) => {
      state.currentlyUser.biografy = action.payload;
    },
    deleteUserMessage: (state, action: PayloadAction<number>) => {
      var user = state.friends.filter(u => u.id == state.selectedUserId.toString())[0];
      if (user) {
        var msg = user.messages.filter(m => m.id == action.payload)[0];
        if (msg)
          msg.state = MessageState.DELETED
      }
    },
    addFocusedUser: (state, action: PayloadAction<string>) => {
      state.focusedUserIds.push(parseInt(action.payload));
    },
    onDeleteMessage: (state, action: PayloadAction<{ msgId: string, userId: string }>) => {
      var user = state.friends.filter(u => u.id == action.payload.userId)[0];

      if (user) {
        var msg = user.messages.filter(m => m.id == parseInt(action.payload.msgId))[0];
        if (msg) {
          msg.state = MessageState.DELETED;
        }
      }
    },
    addWathcerToStatusSlice: (state, action: PayloadAction<{ statusId?: number }>) => {
      var user = state.friends.filter(u => u.id == state.selectedFriend.id)[0];
      if (user) {
        var status = user.statuses?.filter(s => s.id == action.payload.statusId)[0];
        if (status) {
          if (status.watchedUserIds?.length == 0)
            status.watchedUserIds += `${(parseInt(state.currentlyUser.id))}`;
          else
            status.watchedUserIds += `,${(parseInt(state.currentlyUser.id))}`;
        }
      }
    },
  },



  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.friends = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })

      //currently user
      .addCase(getCurrentlyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentlyUser.fulfilled, (state, action: PayloadAction<CurrentlyUser>) => {
        state.currentlyUser = action.payload;
        state.loading = false;
      })
      .addCase(getCurrentlyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })


      //change Message state
      .addCase(changeMessageState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeMessageState.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeMessageState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })

      //add to contact
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })

      //delete contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })



  }
});

export const {
  setSelectedUserId,
  onDeleteMessage,
  deleteUserMessage,
  addFocusedUser,
  deleteCurrentlyUserStatus,
  changeUserBiografy,
  setLoadingState,
  setSelectedFriend,
  setCurrentlyUserProfImage,
  setHasChnages,
  addMessageToSelectedUser,
  changeUserStateToOnline,
  changeUserStateToOfline,
  changedMessageState,
  removeUserOnFocusedUsers,
  addFriend,
  addWathcerToStatusSlice,
  setSearchedText
} = userSlice.actions;
export default userSlice.reducer;
