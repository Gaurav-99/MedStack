import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import questionService from './questionService';

const initialState = {
    questions: [],
    question: null, // for single view
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get all questions
export const getQuestions = createAsyncThunk(
    'questions/getAll',
    async (query, thunkAPI) => {
        try {
            return await questionService.getQuestions(query);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get single question
export const getQuestion = createAsyncThunk(
    'questions/getOne',
    async (id, thunkAPI) => {
        try {
            return await questionService.getQuestion(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create question
export const createQuestion = createAsyncThunk(
    'questions/create',
    async (questionData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await questionService.createQuestion(questionData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Vote question
export const voteQuestion = createAsyncThunk(
    'questions/vote',
    async ({ questionId, type }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await questionService.voteQuestion(questionId, type, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Add answer
export const addAnswer = createAsyncThunk(
    'questions/addAnswer',
    async ({ questionId, answerData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await questionService.addAnswer(questionId, answerData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuestions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.questions = action.payload.data;
            })
            .addCase(getQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createQuestion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.questions.push(action.payload.data);
            })
            .addCase(createQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getQuestion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQuestion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.question = action.payload.data;
            })
            .addCase(getQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(voteQuestion.fulfilled, (state, action) => {
                // Update the specific question in the list or the single view
                state.question = action.payload.data;
                // If expecting full reload of list or doing optimistic update, handle here.
                // For simplicity, I'm updating the single view question.
            })
            .addCase(addAnswer.fulfilled, (state, action) => {
                // Add answer to current question view
                // The API returns the answer. I might need to refetch question or push to answers if I structured state that way.
                // My getQuestion returns { ...question, answers: [] }.
                // I should push to state.question.answers
                if (state.question && state.question.answers) {
                    // Mock author population or re-fetch. 
                    // Ideally re-fetch question to populate author.
                    // For now, I'll just push the raw answer, might miss populated author.
                    state.question.answers.unshift(action.payload.data);
                }
            });
    },
});

export const { reset } = questionSlice.actions;
export default questionSlice.reducer;
