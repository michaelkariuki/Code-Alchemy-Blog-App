import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { AccountState } from '../Routes/SignupStepForm/AccountSignup';
import { BioState } from '../Routes/SignupStepForm/BioTagsSignup';
import { ProfileState } from '../Routes/SignupStepForm/ProfileSignup';
import config from '../config';


type signupWrapperState = {
    wrapperData: {
        signupSuccess: boolean
        currentStep: number
        isVisible: boolean
    }
}
type SignupState = {
    data: {
        accountData: AccountState 
        profileData: ProfileState 
        bioData: BioState 
    }
}

export type signupResponse = {
    message: {
        title: string
        message: string
        type: string
    },
    info?: string
}

const initialState: SignupState & signupWrapperState = {
    wrapperData: {
        signupSuccess: false,
        currentStep: 1,
        isVisible: true,
    },
    data: {
        accountData: {} as AccountState,
        profileData: {} as ProfileState,
        bioData: {} as BioState
    }
}

export const registerUser = createAsyncThunk<signupResponse, SignupState>(
    "signup/registerUser",
    async (data: SignupState) => {
        try {
            const response = await fetch(config.backendConfig.backendRoot + config.backendConfig.auth("signup"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if(!response.ok) {
                throw new Error("Failed to create profile");
                
            }
            
            return await response.json()
            
        } catch (error) {
            console.log(error)
        }
    }
)

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setAccountData: (state, action: PayloadAction<AccountState>) => {
            state.data.accountData = action.payload
        },
        setProfileData: (state, action: PayloadAction<ProfileState>) => {
            state.data.profileData = action.payload
        },
        setBioData: (state, action: PayloadAction<BioState>) => {
            state.data.bioData = action.payload
        },
        nextStep: (state) => {
            state.wrapperData.currentStep += 1;
        },
        prevStep: (state) => {
            state.wrapperData.currentStep -= 1;
        },
        toggleVisibility: (state) => {
            state.wrapperData.isVisible = !state.wrapperData.isVisible
        },
        toggleSignupSuccess: (state) => {
            state.wrapperData.signupSuccess = !state.wrapperData.signupSuccess
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
                // state.data.accountData = action.payload
                console.log("State", state)
                console.log("Action", action)
            });
        builder.addCase(registerUser.rejected, (state) => {
            console.log("State", state)
        })
    }
});




export const { setAccountData, setProfileData, setBioData, nextStep, prevStep, toggleVisibility, toggleSignupSuccess } = signupSlice.actions;
export default signupSlice.reducer;